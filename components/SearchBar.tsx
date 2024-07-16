"use client"

import React, { useState } from 'react'
import LocationSelector from './LocationSelector'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { useSearchQuery } from '@/lib/hooks'
import { useSearchParams } from 'next/navigation'

type Props = {
  includeLocation?: boolean,
  toUrl?: string
}

export default function SearchBar({ includeLocation , toUrl }: Props) {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const searchQuery = useSearchQuery({qt: searchTerm}, searchParams)
  return (
    <div className='flex w-full max-w-[600px] border border-primary rounded-sm mx-auto bg-primary-foreground'>
      {
        includeLocation &&
        <LocationSelector className='hidden font-normal sm:flex bg-primary-foreground w-fit pr-0 text-primary hover:text-primary-foreground rounded-none rounded-l-sm text-sm sm:text-lg sm:h-full' />
      }
      <Input value={ searchTerm } type='text' 
        onChange={ (e)=>{ setSearchTerm(e.target.value) } }
        className={`rounded-none ${includeLocation ? 'border-l rounded-l-sm sm:rounded-none' : 'rounded-l-sm'} border-r border-primary-foreground sm:text-lg`} placeholder='Type here to search'/>
      <Link href={ searchQuery }>
        <Button className='rounded-none font-normal rounded-r-sm bg-primary-foreground text-primary hover:text-primary-foreground text-xs sm:text-lg p-2 sm:h-full'><Search /> <span className='ml-2'>Search</span></Button>
      </Link>
    </div>
  )
}