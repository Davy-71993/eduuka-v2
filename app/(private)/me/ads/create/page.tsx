
import React from 'react'
import { getCategories } from '@/lib/actions/db_actions'
import AdForm from './AdForm'

export default async function AdCreatePage() {

  const categories = await getCategories('name, id, sub_categories(id, name, extra_fields)')
  
  return (
      <div className='pt-2 md:pl-5 flex flex-col space-y-3'>
        <h1 className="bg-secondary text-center py-1 sm:py-3 rounded-sm text-lg sm:text-3xl text-primary font-bold">Create your Advert.</h1>
        <div className="rounded-sm w-full h-full">
          <AdForm categories={ categories } />
        </div>
      </div>
  )
}