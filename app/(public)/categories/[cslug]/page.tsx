import AdCard from '@/components/AdCard'
import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'
import { PriceRange, Rating, Location } from '../../../../components/Fiters'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {  SubCategoryCard } from '@/components/CategoryCards'
import SearchBar from '@/components/SearchBar'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { fetchAds, fetchCategoryByIDOrSlug } from '@/lib/db/api'

type Props = {
  params: any
}

export default async function page({ params }: Props) {

  const slug = params.cslug
  const supabase = createClient(cookies())

  const ads = await fetchAds(supabase)
  const category = await fetchCategoryByIDOrSlug(supabase, slug)
  
  return (
    <Container clasName='pt-5'>
      <SearchBar />
      <div className="flex mt-5 sm:mt-10 sm:space-x-5">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          <Location />
          {/* <SubCategories subCategories={ category?.sub_categories || [] } /> */}
          <PriceRange />
          <Rating />
        </div>
        <div className="w-full md:w-[80%] md:px-5 overflow-hidden">
            <h1 className="text-lg sm:text-xl lg:text-2xl mb-5">Sub Categories in { category?.name }</h1>
            <ScrollArea className="w-full scroll whitespace-nowrap rounded-sm">
              <div className="flex h-full space-x-4 rounded-sm">
                {
                  category?.sub_categories?.map((scat, index)=>(
                    <Link key={ index } href={`/categories/${category.slug}/${scat.slug}`}>
                      <SubCategoryCard subCategory={ scat } />
                    </Link>
                  ))
                }
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            {/* Trending Ads */}
            <h1 className="text-lg sm:text-xl lg:text-2xl mt-5 md:mt-10 mb-2 sm:mb-5">
              <Link className='text-blue-400 hover:text-blue-600 transition-colors' href={`/categories`}>Categories</Link>
              { " > " + category?.name }</h1>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
              {
                ads.slice(0,6).map((ad, index)=>(
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