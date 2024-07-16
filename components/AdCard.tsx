import { Ad } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import AdImage from './ImageWithFallbackUrl'
import { LocateFixed } from 'lucide-react'
import { prettyDistance } from '@/lib/utils'

type Props = {
    ad: Ad
}

export default function AdCard({ ad }: Props) {
  if(!ad){
    return null
  }
  return (
    <Link href={`/find/${ad.id}`}>
      <div className='w-full min-w-40 h-full bg-secondary dark:hover:bg-card transition-colors flex flex-col justify-between rounded-md shadow'>
        {
          ad.image&&
          <AdImage src={ ad.image } className='w-full h-auto rounded-t-sm' />
        }
        <div className="p-3 flex flex-col space-y-1 text-lg md:text-2xl">
          <h6>{ ad.name }</h6>
          <h4 className='text-primary font-bold text-xl md:text-3xl'>$ { ad.price }</h4>
          <div className="flex w-full space-x-3 items-center">
            <LocateFixed />
            <p className="text-muted-foreground text-sm line-clamp-1">{ prettyDistance(ad.dist_meters) }</p>
          </div>
        </div>
      </div>
    </Link>
  )
}