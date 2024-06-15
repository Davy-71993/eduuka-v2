
import React from 'react'
import AdsTable from './Table'
import { ads } from '@/lib/dami-api'

type Props = {}

export default function AdPage({}: Props) {
  return (
    <div className='p-5'>
        <AdsTable ads={ ads.slice(0, 5) } />
    </div>
  )
}