import { CategoryCard } from '@/components/CategoryCards'
import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import { getCategories } from '@/lib/actions/db_actions'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default async function page({}: Props) {
  const categories = await getCategories()
  return (
    <Container clasName='pt-5'>
      <SearchBar includeLocation/>
      <div className='grid gap-2 sm:gap-5 grid-cols-2 mt-5 sm:mt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {
          categories.map((category, index) => (
            <Link key={ index } href={`/categories/${category.slug}`}>
              <CategoryCard category={category}/>
            </Link>
          ))
        }
      </div>
    </Container>
  )
}