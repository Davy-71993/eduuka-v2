import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { fetchNearbyAds } from "./actions/db_actions";
import { Ad } from "./types";

export const useSearchQuery = (query?: any, searchParams?: any) => {
  // Initiate the queryString.
  const [queryString, setQuryString] = useState('')
  let obj: any = {}

  // Creat an interable object from the search params.
  for (const [key, value] of searchParams) {
      obj = {...obj, [key]: value}
  }

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
  }, [query, searchParams])

  // Return the generated query string.
  return queryString
}

export const useFetchAds = (limit?: number, cat?: string, subCat?: string) => {
  const searchParams = useSearchParams()
  const params = useParams()
  const [fetching, setFetching] = useTransition()
  const [ads, setAds] = useState<Ad[]>([])
  useEffect(()=>{
      setFetching(async()=>{
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
            if(res.data){
              lat = res.data.lat
              lon = res.data.lon
            }
          } catch (error) {
            console.log("An error ocured, using deault location.")
          }
        }
        
        const ads = await fetchNearbyAds(limit??100, lat, lon, q, mxp, mnp, dist, ordb, cat, subCat)
        setAds(ads)
      })

  }, [searchParams])
  return { ads, fetching }
}