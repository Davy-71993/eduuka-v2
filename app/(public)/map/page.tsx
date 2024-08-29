"use client"


import LoadingDots from '@/components/LoadingDots'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useAds } from '@/lib/hooks'

export default function Home() {
    const { ads, loading } = useAds()
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapView'),
        { 
        loading: () => (
            <div className="w-full rounded-sm border-2 h-[75vh] flex justify-center items-center">
                <LoadingDots />
            </div>
        ),
        ssr: false
        }
    ), [])

    return(
        <Map ads={ ads } loading={loading} />
    )
}