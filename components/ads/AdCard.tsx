import { Ad } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import { LocateFixed } from 'lucide-react'
import { prettyDistance } from '@/lib/utils'
import { AspectRatio } from '../ui/aspect-ratio'
import ImageWithFallbackUrl from '../ImageWithFallbackUrl'
import PriceTag from '../pricing/PriceTag'

type Props = {
    ad: Ad,
    currency?: string
}

export default function AdCard({ ad, currency }: Props) {
  return (
    <Link href={`/find/${ad.id}`}>
      <div className='w-full min-w-40 h-full bg-secondary dark:hover:bg-card transition-colors flex flex-col justify-between rounded-md shadow'>
        <AspectRatio ratio={1/1}>
            {
              ad.image&&
              <ImageWithFallbackUrl src={ ad.image } className='w-full h-auto rounded-t-sm object-fill overflow-hidden' />
            }
        </AspectRatio>
        <div className="p-3 flex flex-col line-clamp-2 gap-1">
          <h6 className='text-base md:text-lg'>{ ad.name }</h6>
          {
            currency &&
            <PriceTag data={ ad } currency={ currency } />
          }
          <div className="flex w-full space-x-3 items-center">
            <LocateFixed />
            <p className="text-muted-foreground text-sm line-clamp-1">{ prettyDistance(ad.dist_meters) }</p>
          </div>
        </div>
      </div>
    </Link>
  )
}