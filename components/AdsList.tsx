import React from 'react'
import AdCard from './AdCard'
import { fetchAds } from '@/lib/actions/db_actions'

type Props = {}

export default async function AdsList({}: Props) {
  
  try {
      const ads = await fetchAds()
      
      return (
        <>
            <h1 className="text-2xl mt-8 mb-3">Trending Ads</h1>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
                {
                  ads.map((ad, index)=>(
                    <AdCard key={index} ad={ad} />
                  ))
                }
              </div>  
        </>
      )
    } catch (error) {
      return <> Error fetching ads </>
    }
}