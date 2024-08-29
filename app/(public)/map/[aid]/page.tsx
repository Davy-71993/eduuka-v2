"use client"


import LoadingDots from '@/components/LoadingDots'
import { getAdByID } from '@/lib/actions/db_actions'
import { Ad } from '@/lib/types'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { useParams } from 'next/navigation'

export default function AdMapPage() {
    const aid = useParams()['aid'] as string
    const [ad, setAd] = useState<Ad>()
    const [loading, startLoading] = useTransition()

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapView'),
        { 
        loading: () => (
            <div className="w-full rounded-sm border-2 h-[70vh] flex justify-center items-center">
                <LoadingDots />
            </div>
        ),
        ssr: false
        }
    ), [])

    useEffect(()=>{
        startLoading(async()=>{
            const ad = await getAdByID(aid)
            if(ad){
                const { location } = ad
                const preparedAd = {
                    ...ad,
                    lat: location.coordinates[1],
                    long: location.coordinates[0]
                }
                setAd(preparedAd)
            }
        })
    }, [Map, aid])

    return(
        <Map ad={ad} loading={ loading } />
    )
}