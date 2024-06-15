
import React from 'react'
import StoresTable from './Table'
import { stores } from '@/lib/dami-api'

type Props = {}

export default function AdPage({}: Props) {
  return (
    <div className='p-5'>
        <StoresTable stores={ stores } />
    </div>
  )
}