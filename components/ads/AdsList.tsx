"use client"


import AdCard from './AdCard'
import { useContext, useEffect, useState } from 'react'
import AdListSkelton from './AdListSkelton '
import { useAds } from '@/lib/hooks'
import { AppContext } from '@/context/Appcontext'
import Currency from './Currency'

export default function AdsList({ c, sc}: { c?: string, sc?: string}) {
  
  const { ads } = useAds(c, sc)
  const { geoData } = useContext(AppContext)

  const [currency, setCurrency] = useState('USD')

  useEffect(()=>{
    setCurrency(geoData?.currency ?? 'USD')
  }, [geoData])

  if(!ads){
    return (
      <AdListSkelton />
    )
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl">Filtable Ads.</h1>
        <Currency currency={ currency } />
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