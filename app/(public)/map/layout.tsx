import React, { ReactNode, Suspense } from 'react'
import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import { HomeFiltersContainer, MapCategoryFilter } from '@/components/filtering/FilterContainers'
import { getCategories } from '@/lib/actions/db_actions'

type Props = {
    children: ReactNode
}

export default async function MapPagesLayout({ children }: Props) {
  const categories = await getCategories()
  return (
    <Container clasName='py-5'>
        <SearchBar />
        <div className="flex py-5 w-full">
            <div className="w-[25%] min-w-64 h-[75vh] hidden md:flex flex-col gap-5 mb-10">
              <HomeFiltersContainer colapsble/>
              <MapCategoryFilter categories={ categories } />
            </div>
            <div className="w-full md:w-[80%] md:px-5 h-full">
              { children }
            </div>
        </div>
    </Container>
  )
}