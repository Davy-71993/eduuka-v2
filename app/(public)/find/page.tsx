import React from 'react'

import AdsList from '@/components/AdsList'
import Container from '@/components/Container'
import { DesktopCategories, Location } from '@/components/Fiters'
import SearchBar from '@/components/SearchBar'
import { getCategories } from '@/lib/actions/db_actions'
import { HomeFiltersContainer } from '@/components/FilterContainers'

export default async function page() {
  const categories = await getCategories()

  return (
    <Container clasName='pt-5'>
      <SearchBar />
      <div className="flex my-5 sm:my-10 w-full">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          {/* Render filters here */}
          <Location />
          <DesktopCategories categories={ categories } />
          <h1 className="text-2xl">Extra filters.</h1>
          <HomeFiltersContainer />
        </div>
          <div className="w-full md:w-[80%] md:px-5 flex flex-col space-y-5 overflow-hidden">
            <h1 className="text-2xl">Filtered Ads.</h1>
            {/* filtered Ads */}
            {/* Render filtable ads */}
            <AdsList />
          </div>
        </div>
    </Container>
  )
}