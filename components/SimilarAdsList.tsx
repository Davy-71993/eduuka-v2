"use client"

import { Ad } from '@/lib/types'
import React, { useEffect, useState } from 'react'
import AdCard from './AdCard'
import { getSimilarAds } from '@/lib/actions/db_actions'
import Cookies from 'js-cookie'

type Props = {
    ad: Ad
}

export default function SImilarAdsList({ ad }: Props) {
    const [ads, setAds] = useState<Ad[]>([])
    const [currency, setCurrency] = useState<string>("USD")

    useEffect(()=>{
        const c = JSON.parse(Cookies.get('geo')??"{}").currency
        if(c){
          setCurrency(c)
        }
        (async()=>{
            const similarAds = await getSimilarAds(ad?.location.coordinates[1], ad?.location.coordinates[0], ad?.id, ad?.category_id, ad?.sub_category_id!)
            setAds(similarAds)
        })()

    }, [ad])
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {
        ads.slice(0,6).map((ad, index)=>(
            <AdCard currency={ currency } key={index} ad={ad} />
        ))
        }
    </div>
  )
}