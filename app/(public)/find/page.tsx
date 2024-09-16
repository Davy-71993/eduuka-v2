import AdsList from "@/components/ads/AdsList"
import FloatingComponent from "@/components/animated/FloatingComponent"
import Container from "@/components/Container"
import { HomeFiltersContainer } from "@/components/filtering/FilterContainers"
import { DesktopCategories } from "@/components/filtering/Filters"
import SearchBar from "@/components/SearchBar"
import StoreCard from "@/components/StoreCard"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { fetchStores, getCategories } from "@/lib/actions/db_actions"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Find",
  description:
  "Find geate deals, items and services. all in one place",
};

export default async function FindPage() {
  const categories = await getCategories()
  const stores = await fetchStores()
  
  return (
    <Container clasName="">
      <div className="fixed bg-background w-full z-[60] left-0 flex justify-center -mt-5 pb-3 pt-5">
        <Container>
          <SearchBar includeLocation />
        </Container>
      </div>
      <div className="flex py-16 w-full">
        {/* Filters */}
        <div className="w-[25%] relative hidden md:flex">
          <FloatingComponent>
            <div className="flex flex-col gap-5">
              <HomeFiltersContainer colapsble/>
              <DesktopCategories categories={ categories } />
            </div>
          </FloatingComponent>
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
