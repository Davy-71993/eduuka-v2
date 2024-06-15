
import React from 'react'
import Form from './Form'
import { getCategories } from '@/lib/actions/db_actions'

type Props = {}

export default async function AdCreatePage({}: Props) {
  const categories = await getCategories()
  // console.log(categories)
  return (
      <div className='p-5 flex flex-col space-y-5'>
        <h1 className="bg-secondary text-center p-5 rounded-sm text-3xl text-primary font-bold">Create your Advert.</h1>
        <Form categories={ categories } />
      </div>
  )
}