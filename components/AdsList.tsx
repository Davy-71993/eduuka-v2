"use client"

import { useFetchAds } from '@/lib/hooks'
import AdCard from './AdCard'
import AdListSkelton from './AdListSkelton '

export default function AdsList({ limit, cat, subCat }: { limit?: number, cat?: string, subCat?: string }) {
  
  const { ads, fetching } = useFetchAds(limit, cat, subCat)

  if(fetching){
    return <AdListSkelton/>
  }

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
      {
        ads.map((ad, index)=>(
          <AdCard key={index} ad={ad} />
        ))
      }
    </div>  
  )
}