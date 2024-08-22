"use client"

import { useCallback, useState } from 'react'
import { Distance, OrderBy, PriceRange } from './Filters'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { useSearch } from '@/lib/hooks'
import Link from 'next/link'

type Props = {}

export  const  HomeFiltersContainer = ({}: Props) => {
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  const [filters, setFilters] = useState<any>()
  const queryString = useSearch(filters)
  const openClose = useCallback(()=>{
    if(pathName === '/' || pathName === '/find'){
      setOpen(!open)
    }
  }, [open, pathName])
  return (
    <div className='w-full relative'>
      <Button onClick={ openClose } size={'lg'} className='font-bold text-xl w-full justify-between'>
        <span>Extra Filters</span>
        <ChevronDown size={25} className={`${open ? '-rotate-180' : ''} transition-transform`} />
      </Button>
      <div className={`flex flex-col gap-5 w-full shadow-lg py-5 absolute top-14 left-0 z-50 rounded-sm bg-secondary ${pathName === '/' || pathName === '/find' ? (open ? '' : 'hidden') : ''}`}>
        <PriceRange setter={ setFilters } />
        <OrderBy setter={ setFilters } />
        <Distance setter={ setFilters } />
        <Link href={`${pathName}${queryString}`} className='block w-full max-w-[90%] mx-auto'>
        <Button className='w-full text-xl'>Apply Filters</Button>
        </Link>
      </div>
    </div>
  )
}