"use client"


import AdCard from './AdCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useEffect, useState } from 'react'
import AdListSkelton from './AdListSkelton '
import { useAds, useGeoData } from '@/lib/hooks'
import { setLocation } from '@/lib/actions/business_actions'

export default function AdsList({ c, sc}: { c?: string, sc?: string}) {
  
  const { ads } = useAds(c, sc)
  const geoData = useGeoData()
  const [currency, setCurrency] = useState<string>()

  useEffect(()=>{ setCurrency(geoData?.currency)}, [geoData])

  useEffect(()=>{
    if(currency === geoData?.currency){
      return
    }
    setLocation({...geoData, currency})
  }, [currency, geoData])

  if(!ads){
    return (
      <AdListSkelton />
    )
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl">Filtable Ads.</h1>
        <div className="flex w-fit gap-5">
          <Select value={ currency } onValueChange={ (selectedCurrency)=>{
            setCurrency(selectedCurrency)
          } }>
              <SelectTrigger className="w-fit">
                  <SelectValue placeholder={ currency } />
              </SelectTrigger>
              <SelectContent className='p-5 mr-5'>
                <SelectItem value="UGX">UGX</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="KSH">KSH</SelectItem>
                <SelectItem value="TSH">TSH</SelectItem>
              </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
        {
          ads.map((ad, index)=>(
            <AdCard ad={ ad } currency={ currency } key={ index }/>
          ))
        }
      </div>  
    </>
  )
}