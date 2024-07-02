
import React from 'react'
import AdsTable from './Table'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { fetchAds } from '@/lib/db/api'

export default async function AdPage() {
  const supabase = createClient(cookies())
  const ads = await fetchAds(supabase)
  return (
    <div className='p-5'>
        <AdsTable ads={ ads.slice(0, 5) } />
    </div>
  )
}