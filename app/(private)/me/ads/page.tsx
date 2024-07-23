
import React from 'react'
import AdsTable from './Table'
import { getUserAds } from '@/lib/actions/db_actions'

export default async function AdPage() {
  const ads = await getUserAds()
  return (
    <div className='p-5'>
        <AdsTable ads={ ads.slice(0, 5) } />
    </div>
  )
}