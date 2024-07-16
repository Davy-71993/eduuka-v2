
import Container from '@/components/Container'
import Link from 'next/link'
import React from 'react'
import { Location } from '@/components/Fiters'
import SearchBar from '@/components/SearchBar'
import AdsList from '@/components/AdsList'
import { getSubCategory } from '@/lib/actions/db_actions'
import { HomeFiltersContainer } from '@/components/FilterContainers'

type Props = {
  params: any
}

export default async function page({ params }: Props) {
  const scslug = params.scslug
  const subCategory = await getSubCategory(scslug)
  const category = subCategory.categories

  return (
    <Container clasName='pt-5'>
      <SearchBar />
      <div className="flex mt-5 sm:mt-10 sm:space-x-5">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          <Location />
          <h1 className="text-2xl">Extra filters.</h1>
          <HomeFiltersContainer />
        </div>
        <div className="w-full md:w-[80%] md:px-5 overflow-hidden">
            <h1 className="text-lg sm:text-xl lg:text-2xl mb-5">
              <Link className='text-blue-400 hover:text-blue-600 transition-colors' href={`/categories`}>Categories</Link>
              { " > " }
              <Link className='text-blue-400 hover:text-blue-600 transition-colors' href={`/categories/${ category?.slug }`}>{  category?.name }</Link> 
              { " > " + subCategory?.name }</h1>
            
            {/* Render ads for a specific sub category. */}
            <AdsList subCat={ subCategory.id } />

            {/* Link to the find page */}
            <div className="w-full flex justify-end py-5">
              <Link href={'/find'} className="p-2 sm:p-3 bg-primary hover:bg-primary/80 transition-opacity rounded-sm text-primary-foreground font-bold text-sm sm:text-xl">Continue To All Ads {" >>"}</Link>
            </div>
          </div>
      </div>
    </Container>
  )
}