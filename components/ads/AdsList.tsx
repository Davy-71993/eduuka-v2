"use client"


import AdCard from './AdCard'
import { useContext, useEffect, useState } from 'react'
import AdListSkelton from './AdListSkelton '
import { useAds } from '@/lib/hooks'
import { AppContext } from '@/context/Appcontext'
import Currency from './Currency'
import { CircleAlert } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

export default function AdsList({ c, sc}: { c?: string, sc?: string}) {
  
  const { ads, loading } = useAds(c, sc)
  const { geoData } = useContext(AppContext)
  const pathName = usePathname()

  const [currency, setCurrency] = useState('USD')

  useEffect(()=>{
    setCurrency(geoData?.currency ?? 'USD')
  }, [geoData])

  if(loading || !ads){
    return (
      <AdListSkelton />
    )
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl">Filtable Ads.</h1>
        <Currency currency={ currency } />
      </div>
      {
        ads && ads.length > 0
        ?
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 w-full">
          {
            ads.map((ad, index)=>(
              <AdCard ad={ ad } currency={ currency } key={ index }/>
            ))
            
          }
        </div>  
        :
        <div className="flex flex-col gap-5 h-[40vh] w-full justify-center items-center text-muted-foreground">
          <CircleAlert size={100} />
          <p className='text-4xl'>No ads found</p>
          <Link href={pathName} >
          <Button className='text-lg px-5 py-3'>Clear all filters</Button>
          </Link>
        </div>
        
      }
    </>
  )
}