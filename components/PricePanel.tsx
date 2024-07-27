"use client"

import { Ad } from '@/lib/types'
import { displayCurrencyAndPrice } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { useGeoData } from '@/lib/hooks'
import PriceTag from './PriceTag'
import ActionButtons from './ActionButtons'

type Props = {
    ad: Ad
}

export default function PricePanel({ ad }: Props) {
    const [currency, setCurrency] = useState<string>()
    const geoData = useGeoData()

    useEffect(()=>{
        setCurrency(geoData?.currency)
    }, [geoData])
  return (
    <div className="bg-secondary w-full">
        <p className="line-clamp-2 text-xl font-bold p-3 text-center">{ ad?.name }</p>
        { 
            ad.pricing_scheme !== "price menu"
            ?
            <div className="flex flex-col gap-4">
                <PriceTag className="px-6 pb-5" currency={ currency! } data={ad}/>
                <ActionButtons phone={ ad.profiles?.phone } ad_seller={ ad.seller_id } />
            </div>
            :
            <div className='flex flex-col w-full flex-1'>
                <h1 className='p-2 px-6 text-lg md:text-2xl font-bold border-b-2'>Prices</h1>
                {
                    ad.menu_items?.map((menu, index)=>(
                        <div key={index} className='flex w-full transition-colors justify-between text-lg py-2 px-6 hover:bg-primary hover:text-primary-foreground'>
                            <span className=''>{ menu.item}</span>
                            <span className=''>{ displayCurrencyAndPrice(ad.default_currency!, currency!, menu.price!)}</span>
                        </div>
                    ))
                }
            </div>
        }

    </div>
  )
}