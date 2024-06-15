
/**
 * The home or landing page.
 * It shows the main features of the app at a glance.
 * -> Search bar
 * -> List of categories and sub-categories
 * -> List of popular stores
 * -> List of popular dealers
 * -> List of trending ads.
 */

import AdCard from "@/components/AdCard"
import Container from "@/components/Container"
import { DesktopCategories, PriceRange, Rating } from "@/components/Fiters"
import SearchBar from "@/components/SearchBar"
import StoreCard from "@/components/StoreCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {  stores } from "@/lib/dami-api"
import { fetchCategories } from "@/lib/db/api"
import { fetchAllWithoutFilters } from "@/lib/db/utils"
import { Ad, Category } from "@/lib/types"
import Link from "next/link"

export default async function Home() {
  const categories = await fetchCategories()
  const ads: Ad[] = [] // Fetch ads from db
  return (
    <Container clasName="pt-5">
      <SearchBar includeLocation />
      <div className="flex py-5 w-full">
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col space-y-5 mb-10">
          <h1 className="text-2xl">Extra filters.</h1>
          <DesktopCategories categories={ categories } />
          <PriceRange />
          <Rating />
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
          <h1 className="text-2xl mt-8 mb-3">Trending Ads</h1>
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
