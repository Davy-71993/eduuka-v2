"use client"

import { useCallback, useState } from 'react'
import { Distance, OrderBy, PriceRange } from './Filters'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

type Props = {}

export  const  HomeFiltersContainer = ({}: Props) => {
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
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
      <div className={`flex flex-col gap-5 w-full absolute top-14 left-0 z-50 rounded-sm bg-secondary ${pathName === '/' || pathName === '/find' ? (open ? '' : 'hidden') : ''}`}>
        <PriceRange  />
        <OrderBy />
        <Distance  />
      </div>
    </div>
  )
}