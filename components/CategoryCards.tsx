import { Category, SubCategory } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

export function CategoryCard({ category }: { category: Category }) {
  return (
    <div className='w-full h-full bg-secondary flex flex-col justify-between rounded-md shadow'>
      <Image src={ category.image } alt='Category Image' height={ 1000 } width={ 1000 } className='w-full h-auto rounded-t-sm' />
      <div className="p-2 sm:p-5 text-center sm:text-xl">
        <h2>{ category.name }</h2>
        {/* This should indicate the number of ads in thos category */}
        <p className="font-thin text-sm sm:text-base">{ category.sub_categories.length + ' '} Subcategories</p>
      </div>
    </div>
  )
}

export function SubCategoryCard({ subCategory }: { subCategory: SubCategory }) {
  return (
    <div className='w-32 sm:w-56 overflow-hidden h-full bg-secondary flex flex-col justify-between rounded-md shadow'>
      <Image src={ subCategory.image } alt='Category Image' height={ 1000 } width={ 1000 } className='w-full h-auto rounded-t-sm' />
      <div className="p-2 sm:p-5 text-center sm:text-xl">
        <h2 className='overflow-hidden'>{ subCategory.name }</h2>
        <p className="font-thin text-sm sm:text-base">{ subCategory.ads?.length + ' '} Ads</p>
      </div>
    </div>
  )
}