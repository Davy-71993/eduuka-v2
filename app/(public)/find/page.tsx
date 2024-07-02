import AdCard from '@/components/AdCard'
import Container from '@/components/Container'
import { DesktopCategories, Location, PriceRange, Rating } from '@/components/Fiters'
import SearchBar from '@/components/SearchBar'
import { fetchAds, fetchCategories } from '@/lib/db/api'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {}

export default async function page({}: Props) {

  const supabase = createClient(cookies())
  const categories = await fetchCategories(supabase)
  const ads = await fetchAds(supabase)

  return (
    <Container clasName='pt-5'>
      <SearchBar />
      <div className="flex my-5 sm:my-10 w-full">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          <h1 className="text-2xl">Extra filters.</h1>
          <Location />
          <DesktopCategories categories={ categories } />
          <PriceRange />
          <Rating />
        </div>
          <div className="w-full md:w-[80%] md:px-5 flex flex-col space-y-5 overflow-hidden">
            <h1 className="text-2xl">Filtered Ads.</h1>
            {/* filtered Ads */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
              {
                ads.map((ad, index)=>(
                  <AdCard key={index} ad={ad} />
                ))
              }
            </div>
          </div>
        </div>
    </Container>
  )
}