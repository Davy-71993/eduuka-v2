import AdCard from '@/components/AdCard'
import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'
import { PriceRange, Rating, Location } from '@/components/Fiters'
import SearchBar from '@/components/SearchBar'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { SubCategory } from '@/lib/types'
import { fetchAds } from '@/lib/db/api'

type Props = {
  params: any
}

export default async function page({ params }: Props) {
  const scslug = params.scslug
  const supabase = createClient(cookies())
  const { data } = await supabase.from('sub_categories').select('name, categories(slug, name)').eq('slug', scslug).single()
  const subCategory = data as unknown as SubCategory
  const category = subCategory.categories

  const ads = await fetchAds(supabase)

  return (
    <Container clasName='pt-5'>
      <SearchBar />
      <div className="flex mt-5 sm:mt-10 sm:space-x-5">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          <Location />
          <PriceRange />
          <Rating />
        </div>
        <div className="w-full md:w-[80%] md:px-5 overflow-hidden">

            {/* Trending Ads */}
            <h1 className="text-lg sm:text-xl lg:text-2xl mb-5">
              <Link className='text-blue-400 hover:text-blue-600 transition-colors' href={`/categories`}>Categories</Link>
              { " > " }
              <Link className='text-blue-400 hover:text-blue-600 transition-colors' href={`/categories/${ category?.slug }`}>{  category?.name }</Link> 
              { " > " + subCategory?.name }</h1>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
              {
                ads.map((ad, index)=>(
                  <AdCard key={index} ad={ad} />
                ))
              }
            </div>

            {/* Link to the find page */}
            <div className="w-full flex justify-end py-5">
              <Link href={'/find'} className="p-2 sm:p-3 bg-primary hover:bg-primary/80 transition-opacity rounded-sm text-primary-foreground font-bold text-sm sm:text-xl">Continue To All Ads {" >>"}</Link>
            </div>
          </div>
      </div>
    </Container>
  )
}