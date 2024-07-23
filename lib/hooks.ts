import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchNearbyAds } from "./actions/db_actions";
import { Ad, GeoData } from "./types";
import { setLocation } from "./actions/business_actions";

/**
 * A function that generates the query string depending on the desired filters and
 * the existing searcParams.
 * In future a better way should be deviced and this searchParams eleminated from the function parameters
 * 
 * @param query The object containing the requested filters
 * @param searchParams The searhParams form next/navigation. 
 * @returns A prepared query string depending on the requested filters and the exiting searchParams 
 */
export const useSearchQuery = (query?: any, searchParams?: any) => {
  // Initiate the queryString.
  const [queryString, setQuryString] = useState('')
  // let obj: any = {}

  const obj = useMemo(()=>{
    let b:any = {}
      // Creat an interable object from the search params.
      for (const [key, value] of searchParams) {
          b = {...b, [key]: value}
      }

      return b

  }, [searchParams])


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
export const useFetchAds = (cat?: string, subCat?: string) => {
  const searchParams = useSearchParams()
  const [fetching, setFetching] = useState(false)
  const [ads, setAds] = useState<Ad[]>([])
  useEffect(()=>{
    setFetching(true);
    (async()=>{
      const q = searchParams.get('qt') as string | undefined 
      const mxp = searchParams.get('mxp') as string | undefined
      const mnp = searchParams.get('mnp') as string | undefined
      const dist = searchParams.get('mxd') as string | undefined
      const ordb = searchParams.get('ordb') as string | undefined
      let lat = 0.321, lon = 32.5714;

      const geo_cookie = Cookies.get('geo')
      if(geo_cookie){
        console.log("Using saved Location")
        const geoCookieObj = JSON.parse(geo_cookie)
        lat = geoCookieObj.lat
        lon = geoCookieObj.lon
      }else{
        console.log("Fetching new Location")
        try {
          const res = await axios.get('http://ip-api.com/json?fields=country,countryCode,currency,region,regionName,city,query,lat,lon')
          setLocation(res.data)
          if(res.data){
            lat = res.data.lat
            lon = res.data.lon
          }
        } catch (error) {
          console.log("An error ocured, using deault location.")
        }
      }
      
      const ads = await fetchNearbyAds(lat, lon, q, mxp, mnp, dist, ordb, cat, subCat)
      setAds(ads)
      setFetching(false)
    })()


  }, [searchParams, cat, subCat])

  return { ads, fetching }
}

export const useGeoData = () => {
  const [geoData, setGeoData] = useState<GeoData>()
  
  useEffect(()=>{
    const geo = Cookies.get('geo')
    if(geo){
      console.log("Using save location")
      setGeoData(JSON.parse(geo))
      return
    }
    (async()=>{
      console.log("Fetching new Location")
      try {
        const res = await axios.get('http://ip-api.com/json?fields=country,countryCode,currency,region,regionName,city,query,lat,lon')
        setGeoData(res.data)
      } catch (error) {
        console.log("An error ocured while fetching your location, using deault location.")
      }
    })()
  }, [])

  return geoData
}