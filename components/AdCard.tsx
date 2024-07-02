import { Ad } from '@/lib/types'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
          ad.ad_images&&
          <Image src={ ad.ad_images[0].url! } alt='Ad Image' height={ 1000 } width={ 1000 } className='w-full h-auto rounded-t-sm' />
        }
        <div className="p-3 flex flex-col space-y-1 text-lg md:text-2xl">
          <h6>{ ad.name }</h6>
          <h4 className='text-primary font-bold text-xl md:text-3xl'>$ { ad.price }</h4>
        </div>
      </div>
    </Link>
  )
}