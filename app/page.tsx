
/**
 * The home or landing page.
 * It shows the main features of the app at a glance.
 * -> Search bar
 * -> List of categories and sub-categories
 * -> List of popular stores
 * -> List of popular dealers
 * -> List of trending ads.
 */

import AdsList from "@/components/AdsList"
import Container from "@/components/Container"
import { HomeFiltersContainer } from "@/components/FilterContainers"
import { DesktopCategories } from "@/components/Fiters"
import SearchBar from "@/components/SearchBar"
import StoreCard from "@/components/StoreCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { fetchStores, getCategories } from "@/lib/actions/db_actions"
import Link from "next/link"

export default async function Home() {
  const categories = await getCategories()
  const stores = await fetchStores()
  return (
    <Container clasName="pt-5">
      <SearchBar includeLocation />
      <div className="flex py-5 w-full">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          <h1 className="text-2xl">Extra filters.</h1>
          <DesktopCategories categories={ categories } />
          <HomeFiltersContainer />
        </div>
        <div className="w-full md:w-[80%] flex flex-col space-y-5 md:px-5 overflow-hidden">
          <Link href="/stores"><h1 className="text-2xl hover:text-blue-500 transition-colors">Popular Stores { ">>" }</h1></Link>
          <ScrollArea className="w-full scroll whitespace-nowrap rounded-sm">
            <div className="flex h-full space-x-4 rounded-sm">
              {
                stores.map((store, index)=>(
                  <Link key={ index } href={`/stores/${store.id}`}>
                    <StoreCard width="w-32 sm:w-56" store={ store } />
                  </Link>
                ))
              }
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Trending Ads */}
          
          <AdsList />
          {/* Link to the find page */}
          <div className="w-full flex justify-end py-5">
            <Link href={'/find'} className="p-2 sm:p-3 bg-primary hover:bg-primary/80 transition-opacity rounded-sm text-primary-foreground font-bold text-sm sm:text-xl">Continue To All Ads {" >>"}</Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
