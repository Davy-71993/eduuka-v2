import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState, useTransition } from "react";
import { fetchNearbyAds } from "./actions/db_actions";
import { Ad } from "./types";
import { AppContext } from "@/context/Appcontext";

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
 * @param cid The category id. Only required on /categories/[cslug] to filter specific category ads
 * @param scid The sub-category id. Only required on /categories/[cslug]/[scslug] to filter specific 
 *               sub-category ads
 * @returns Loading state or ads list.
 */
export const useAds = (cid?: string, scid?: string) => {
  const { geoData } = useContext(AppContext)
  const filters = useFilters()

  const [ads, setAds] = useState<Ad[]>()
  const [loading, startLoading] = useTransition()

  useEffect(()=>{
    startLoading(async()=>{
      if(!geoData?.location) return
      let filterBody = filters
      if(cid){
        filterBody = { ...filterBody, cid }
      }
      if(scid){
        filterBody = { ...filterBody, scid}
      }
      console.log("Start fetching ads")
      const ads = await fetchNearbyAds(geoData.location.lat, geoData.location.lon, filterBody)
      console.log("Done fetching ads")
      setAds(ads)
    })
  }, [cid, scid, geoData?.location, filters])

  return { ads, loading }
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
