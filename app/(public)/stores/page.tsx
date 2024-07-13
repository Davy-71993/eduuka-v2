
import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import StoreCard from '@/components/StoreCard'
import { fetchStores } from '@/lib/actions/db_actions'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default async function StoresPage({}: Props) {
  const stores = await fetchStores()
  return (
    <Container clasName='pt-5'>
      <SearchBar includeLocation/>
      <div className='grid gap-2 sm:gap-5 grid-cols-2 mt-5 sm:mt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {
          stores.map((store, index) => (
            <Link key={ index } href={`/stores/${store.id}`}>
              <StoreCard store={store}/>
            </Link>
          ))
        }
      </div>
    </Container>
  )
}