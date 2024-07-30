import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchNearbyAds } from "./actions/db_actions";
import { Ad, GeoData } from "./types";
import { setLocation } from "./actions/business_actions";
import { SUPPORTED_CURRANCIES } from "./defaults";

/**
 * A function that generates the query string depending on the desired filters and
 * the existing searcParams.
 * In future a better way should be deviced and this searchParams eleminated from the function parameters
 * 
 * @param query The object containing the requested filters
 * @param searchParams The searhParams form next/navigation. 
 * @returns A prepared query string depending on the requested filters and the exiting searchParams 
 */
export const useSearch = (query?: any) => {
  // Initiate the queryString.
  const [queryString, setQuryString] = useState('')
  let obj = useFilters()


  // For every time the query is changed
  useEffect(()=>{
    // For every item in the submited query, we check if it's already in the search params.
    // If so then just update it.
    // Else set a new item in the search params object.
    for (const item in query) {
      if (Object.prototype.hasOwnProperty.call(query, item)) {
        const element = query[item];
        obj[item] = element
      }
    }

    // Initialize the queryString with a ?
    let str = '?'
    // For evey item in th updated search params object,
    // update the queryString
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if(obj[key]){
                str+=`${key}=${obj[key]}&`;
            }
        }
    }
    
    // We ensure we have removed the last character in the string
    // From the above definitions, it's either ? or &
    str = str.slice(0, str.length-1)
    
    // Now set the queryString state property.
    setQuryString(str)
  }, [query, obj])

  // Return the generated query string.
  return queryString
}

/**
 * A function that handles fetching ads based on distance from the client from the data base
 * 
 * @param cat The category id. Only required on /categories/[cslug] to filter specific category ads
 * @param subCat The sub-category id. Only required on /categories/[cslug]/[scslug] to filter specific 
 *               sub-category ads
 * @returns Loading state or ads list.
 */
export const useAds = (cat?: string, subCat?: string) => {
  const geo = useGeoData()
  const filters = useFilters()

  const [ads, setAds] = useState<Ad[]>()
  const [loading, startLoading] = useTransition()

  useEffect(()=>{
    startLoading(async()=>{
      if(!geo) return
      let filterBody = filters
      if(cat){
        filterBody = { ...filterBody, cat }
      }
      if(subCat){
        filterBody = { ...filterBody, subCat}
      }
      const ads = await fetchNearbyAds(geo?.location?.lat, geo?.location?.lon, filterBody)
      setAds(ads)
    })
  }, [cat, subCat, geo, filters])

  return { ads, loading }
}

export const useGeoData = () => {
  const [geoData, setGeoData] = useState<GeoData>()
  useEffect(()=>{
    const geo = Cookies.get('geo')
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (result) => {
          const { latitude, longitude, accuracy } = result.coords
          const location = {lat: latitude, lon: longitude, accuracy}
          if(geo){
            console.log("Using save location")
            const data = JSON.parse(geo)
            setGeoData({...data, location})
            return
          }
          (async()=>{
            console.log("Fetching new Location")
            try {
              const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}`)
              const data = res.data
              const { address, display_name } = data
              const locationData: GeoData = {
                ...address,
                address: display_name,
                currency: SUPPORTED_CURRANCIES[address.country_code] ?? 'UGX',
                location
              }
              setGeoData(locationData)
            } catch (error) {
              console.log("An error ocured while goe-reverse coding")
              const data: GeoData = {
                city: '',
                country: '',
                currency: 'UGX',
                region: '',
                location: {accuracy: 0, lat: 0, lon: 0}
              }
              setGeoData(data)
            }
          })()
          return
        },
        (error) => {
          console.log("Navigtor error: ", error.message)
          if(geo){
            console.log("Using save location")
            // To-do
            // Later use this geo.location lat and lon to fetch the details from openstreatmap. 
            setGeoData(JSON.parse(geo))
            return
          }
          const data: GeoData = {
            city: '',
            country: '',
            currency: 'UGX',
            region: '',
            location: {accuracy: 0, lat: 0, lon: 0}
          }
          setGeoData(data)
        }
      )
      return
    }
    console.log("Unsupported browser")
    if(geo){
      console.log("Using save location")
      setGeoData(JSON.parse(geo))
      return
    }
    const data: GeoData = {
      city: '',
      country: '',
      currency: 'UGX',
      region: '',
      location: {accuracy: 0, lat: 0, lon: 0}
    }
    setGeoData(data)
  }, [])

  useEffect(()=>{
    setLocation(geoData)
  }, [geoData])

  return geoData
}

export const useFilters = () => {
  const searchParams: any = useSearchParams()
  return useMemo(()=>{
    let b:any = {}
      // Creat an interable object from the search params.
      for (const [key, value] of searchParams) {
          b = {...b, [key]: value}
      }
      return b
  }, [searchParams])
}