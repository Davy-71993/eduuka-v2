
import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {  SubCategoryCard } from '@/components/CategoryCards'
import SearchBar from '@/components/SearchBar'
import { getCategoryByIDOrSlug } from '@/lib/actions/db_actions'
import { HomeFiltersContainer } from '@/components/filtering/FilterContainers'
import AdsList from '@/components/ads/AdsList'


export async function generateMetadata({ params: { cslug } }: { params: any}) {
  const category  = await getCategoryByIDOrSlug(cslug, 'name');
  return {
    title: category?.name,
    description: "uDuuka item Category.",
    alternates: {
      canonical: `/categories/${category?.slug}`,
    },
    openGraph: {
      title: category.name,
      description: "category.description"
    },
  };
}

type Props = {
  params: any,
  searchParams: any
}

export default async function page({ params }: Props) {

  const slug = params.cslug
  const category = await getCategoryByIDOrSlug(slug)
  
  return (
    <Container clasName='pt-5'>
      <SearchBar />
      <div className="flex mt-5 sm:mt-10 sm:gap-5">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          {/* Render the filter panel here. */}
          <HomeFiltersContainer />
        </div>
        <div className="w-full md:w-[80%] md:px-5 overflow-hidden">
            <h1 className="text-lg sm:text-xl lg:text-2xl mb-5">Sub Categories in { category?.name }</h1>
            <ScrollArea className="w-full scroll whitespace-nowrap rounded-sm">
              <div className="flex h-full gap-4 rounded-sm">
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
              { " > " + category?.name }
            </h1>
            {/* Render ads for specific category */}
            <AdsList c={category.id} />
            {/* Link to the find page */}
            <div className="w-full flex justify-end py-5">
              <Link href={'/find'} className="p-2 sm:p-3 bg-primary hover:bg-primary/80 transition-opacity rounded-sm text-primary-foreground font-bold text-sm sm:text-xl">Continue To All Ads {" >>"}</Link>
            </div>
          </div>
      </div>
    </Container>
  )
}
