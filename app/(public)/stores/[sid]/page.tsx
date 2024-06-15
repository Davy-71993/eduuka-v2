import AdCard from '@/components/AdCard'
import Container from '@/components/Container'
import FadingLine from '@/components/FadingLine'
import { DesktopCategories, PriceRange, Rating } from '@/components/Fiters'
import SearchBar from '@/components/SearchBar'
import { ads, categories, stores } from '@/lib/dami-api'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    params: any
}

export default function StorePage({ params }: Props) {
    const storeID = params['sid']
    console.log(storeID)
    const store = stores.find((s) => s.id === storeID)
  return (
    <Container clasName='pt-5'>
        <SearchBar includeLocation />
        <div className="flex py-5 w-full">
            <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
                <div className="bg-accent-foreground/15 rounded-sm p-5">
                    <Image alt='Store image' height={1000} width={1000} src={ store?.image ?? ''} className='w-full h-auto rounded-sm' />
                    <h1 className="text-2xl py-3 text-primary">{ store?.name }</h1>
                    <p className="text-lg">{ store?.description }</p>
                    <Link href={`/stores/${store?.id}/details`} className='text-blue-500 hover:text-blue-600'>See store details {">>"}</Link>
                </div>
                <DesktopCategories categories={ categories } />
                <PriceRange />
                <Rating />
            </div>
            <div className="w-full md:w-[80%] flex flex-col space-y-5 md:px-5 overflow-hidden">
                <h1 className="text-2xl">Ads from { store?.name }</h1>
                <div className="grid gap-4 mb-5 pb-5 grid-cols-2 lg:grid-cols-3 w-full">
                    {
                        ads.slice(0,6).map((ad, index)=>(
                        <AdCard key={index} ad={ad} />
                        ))
                    }
                </div>
                <div className="">
                    <h1 className="text-2xl mb-2">Similar Ads to those from { store?.name }</h1>
                    <FadingLine />
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
                        {
                            ads.slice(0,6).map((ad, index)=>(
                            <AdCard key={index} ad={ad} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}