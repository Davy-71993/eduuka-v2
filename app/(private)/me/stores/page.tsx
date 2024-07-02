
import React from 'react'
import StoresTable from './Table'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { fetchStores } from '@/lib/db/api'

type Props = {}

export default async function AdPage({}: Props) {
  const supabase = createClient(cookies())
  const stores = await fetchStores(supabase)
  return (
    <div className='p-5'>
        <StoresTable stores={ stores } />
    </div>
  )
}