
import React from 'react'
import StoresTable from './Table'
import { fetchStores } from '@/lib/actions/db_actions'

type Props = {}

export default async function AdPage({}: Props) {
  const stores = await fetchStores()
  return (
    <div className='p-5'>
        <StoresTable stores={ stores } />
    </div>
  )
}