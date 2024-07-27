"use client"

import Container from '@/components/Container'
import { HomeFiltersContainer } from '@/components/FilterContainers'
import LoadingDots from '@/components/LoadingDots'
import SearchBar from '@/components/SearchBar'
import { getCategories } from '@/lib/actions/db_actions'
import { Category } from '@/lib/types'
import dynamic from 'next/dynamic'
import { Suspense, useEffect, useMemo, useState } from 'react'
import CategoryFilter from './CategoryFilter'

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([])
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/MapView'),
        { 
        loading: () => (
            <div className="w-full border-2 h-[70vh] flex justify-center items-center">
                <LoadingDots />
            </div>
        ),
        ssr: false
        }
    ), [])

    useEffect(()=>{
        (async()=>{
            
            const cate = await getCategories()
            setCategories(cate)
        })()
    }, [Map])

    return(
        <Suspense fallback={<></>}>
            <Container clasName='py-5'>
                <SearchBar />
                <div className="flex py-5 w-full">
                    <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col gap-5 mb-10">
                        <h1 className="text-2xl">Filters.</h1>
                        <CategoryFilter categories={ categories } />
                        <HomeFiltersContainer />
                    </div>
                    <div className="w-full md:w-[80%] flex flex-col gap-5 md:px-5">
                        <Map />
                    </div>
                </div>
            </Container>
        </Suspense>
    )
}