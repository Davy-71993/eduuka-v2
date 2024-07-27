"use client"

import React, { useEffect, useState } from 'react'
import LocationSelector from './LocationSelector'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MapPin, Search } from 'lucide-react'
import Link from 'next/link'
import { useSearchQuery } from '@/lib/hooks'
import { usePathname, useSearchParams } from 'next/navigation'

type Props = {
  includeLocation?: boolean,
  toUrl?: string
}

export default function SearchBar({ includeLocation , toUrl }: Props) {

  const searchParams = useSearchParams()
  const pathName = usePathname()

  const currentPath = usePathname()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [qtObj, setQtObj] = useState<{qt?: string}>()

  useEffect(()=>{
    setQtObj({qt: searchTerm}) 
  }, [searchTerm])

  const searchQuery = useSearchQuery(qtObj, searchParams)

  return (
    <div className='flex w-full max-w-[600px] border border-primary rounded-sm mx-auto bg-primary-foreground'>
      {
        pathName !== '/map' &&
        <Link id='link' href="/map">
          <Button className='rounded-none font-normal rounded-l-sm bg-primary-foreground text-primary hover:text-primary-foreground text-xs sm:text-lg p-2 sm:h-full'><MapPin /> <span className='ml-2'>View in Map</span></Button>
        </Link>
      }
      <Input value={ searchTerm } type='text' 
        onKeyDownCapture={ (e) => {
          if(e.key === 'Enter'){
            document.getElementById('link')?.click()
          }
        } }
        onChange={ (e)=>{ setSearchTerm(e.target.value) } }
        className={`rounded-none ${includeLocation ? 'border-l rounded-l-sm sm:rounded-none' : 'rounded-l-sm'} border-r border-primary-foreground sm:text-lg`} placeholder='Type here to search'/>
      <Link id='link' href={ `${toUrl ?? currentPath }${ searchQuery }` }>
        <Button className='rounded-none font-normal rounded-r-sm bg-primary-foreground text-primary hover:text-primary-foreground text-xs sm:text-lg p-2 sm:h-full'><Search /> <span className='ml-2'>Search</span></Button>
      </Link>
    </div>
  )
}