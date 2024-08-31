
/**
 * The home or landing page.
 * It shows the main features of the app at a glance.
 * -> Search bar
 * -> List of categories and sub-categories
 * -> List of popular stores
 * -> List of popular dealers
 * -> List of trending ads.
 */

import AdsList from "@/components/ads/AdsList"
import Container from "@/components/Container"
import { HomeFiltersContainer } from "@/components/filtering/FilterContainers"
import { DesktopCategories } from "@/components/filtering/Filters"
import SearchBar from "@/components/SearchBar"
import StoreCard from "@/components/StoreCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { fetchStores, getCategories } from "@/lib/actions/db_actions"
import Link from "next/link"
import { Metadata } from 'next';
import FloatingComponent from "@/components/animated/FloatingComponent"


export const metadata: Metadata = {
  title: "Home",
  description:
  "An online market place",
};

export default async function Home() {
  const categories = await getCategories()
  const stores = await fetchStores()
 
  return (
    <Container clasName="">
      <div className="fixed w-full max-w-[90rem] z-[60] bg-background -mt-5 pb-3 pt-5">
        <SearchBar includeLocation />
      </div>
      <div className="flex py-16 w-full">
        {/* Filters */}
        <div className="w-[25%] min-w-64 relative hidden md:block">
          <FloatingComponent>
            <div className="flex flex-col gap-5">
              <HomeFiltersContainer colapsble/>
              <DesktopCategories categories={ categories } />
            </div>
          </FloatingComponent>
        </div>
        
        <div className="w-full md:w-[80%] flex flex-col gap-5 md:px-5 overflow-hidden">
          {/* Display popular stores in a horizontal scroll */}
          {
            stores.length > 0 &&
            <>
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
            </>
          }
          {/* Recomended ads ordered by distance from the user. */}
          <AdsList  />
        </div>
      </div>
    </Container>
  )
}
