"use client"

import { useFetchAds, useGeoData } from '@/lib/hooks'
import AdCard from './AdCard'
import AdListSkelton from './AdListSkelton '
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import Cookies from 'js-cookie'
import { useState } from 'react'

export default function AdsList({ cat, subCat }: { cat?: string, subCat?: string }) {
  
  const geoData = useGeoData()
  const { ads, loading } = useFetchAds(cat, subCat)
  const [currency, setCurrency] = useState<string>(geoData?.currency ?? 'UGX')

  if(loading){
    return <AdListSkelton/>
  }
  
  const updateCurrency = (currency:string) => {
    setCurrency(currency)
    const obj = JSON.parse(Cookies.get('geo')??"{}")
    if(obj.currency === currency) return
    const newobj = {...obj, currency} 
    Cookies.set('geo', JSON.stringify(newobj))
  }


  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl">Filtable Ads.</h1>
        <Select onValueChange={(e)=>{ updateCurrency(e) }} value={ currency }>
            <SelectTrigger className="w-fit">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='p-5 mr-5'>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="UGX">UGX</SelectItem>
              <SelectItem value="KSH">KSH</SelectItem>
              <SelectItem value="TSH">TSH</SelectItem>
            </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
        {
          ads.map((ad, index)=>(
            <AdCard currency={ currency } key={index} ad={ad} />
          ))
        }
      </div>  
    </>
  )
}