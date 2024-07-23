"use client"

import { useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { Distance, OrderBy, PriceRange, Rating } from './Fiters'
import { Button } from './ui/button'
import Link from 'next/link'
import { toNumber } from '@/lib/utils'
import { useSearchQuery } from '@/lib/hooks'

type Props = {}

export  const  HomeFiltersContainer = ({}: Props) => {
  const searchParams = useSearchParams()

  const [filters, setFilters ] = useState<any>({})
  const [error, setError ] = useState<string>()

  const queryString = useSearchQuery(filters, searchParams)

  const setRange = useCallback((range?: { min?: string, max?: string}) => {
    // If the range is not given, no error and no mxp and no mnp
    if(!range){
      setFilters({...filters, mxp: undefined, mnp: undefined })
      setError(undefined)
      return
    }
    // If the range is given, there are two cases
    // 1. Both min and max prices are given.
    //    => Check and and confirm that the min price is less than the max price.
    //    => In case the min price is greater or equal to the max price, then raise an error.
    if(range.min && range.max){
      if(toNumber(range.min) >= toNumber(range.max)){
        console.log("min greater than max")
        setError('The min-price must be less than the max-price')
        setFilters({...filters, mxp: undefined, mnp: undefined})
        return
      }
      setFilters({...filters, mxp: range.max, mnp: range.min})
      setError(undefined)
      return
    }
    // 2. Only one of the max or min price is given.
    //    => Just set what is given and leave the other as an empty string.
    // Note: We should always remember to clear the error once any of the conditions are certisfied.
    setFilters({...filters, mxp: range?.max, mnp: range?.min })
    setError(undefined)
    return
  }, [filters])

  return (
    <div className='flex flex-col gap-5'>
        <PriceRange setter={ (range) => { setRange(range) } } error={ error } />
        {/* <Rating setter={(num)=>{ setFilters({...filters, mar: num})}}/> */}
        <OrderBy setter={ (val)=> { setFilters({...filters, ordb: val})} } />
        <Distance setter={ (val)=> { setFilters({...filters, mxd: val})} } />
        <Link href={ queryString }>
          <Button className='w-full border-2 bg-transparent border-primary text-primary font-bold hover:text-primary-foreground'>
            Apply Filters
          </Button>
        </Link>
    </div>
  )
}