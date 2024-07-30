import AdsList from "@/components/ads/AdsList"
import Container from "@/components/Container"
import { HomeFiltersContainer } from "@/components/filtering/FilterContainers"
import { DesktopCategories } from "@/components/filtering/Filters"
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

        {/* Filters */}
        <div className="w-[25%] min-w-64 h-fit hidden md:flex flex-col gap-5 mb-10">
          <DesktopCategories categories={ categories } />
          <HomeFiltersContainer />
        </div>
        
        <div className="w-full md:w-[80%] flex flex-col gap-5 md:px-5 overflow-hidden">
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
          <AdsList />
        </div>
      </div>
    </Container>
  )
}
