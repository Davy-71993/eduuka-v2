import React from 'react'
import { Skeleton } from './ui/skeleton'
import { Image } from 'lucide-react'

type Props = {}

export default function AdCardSkelton({}: Props) {
  return (
    <div className='h-fit w-full border rounded-sm overflow-hidden'>
        <Skeleton className='h-40 w-full rounded-none flex justify-center items-center text-muted-foreground/30' >
            <Image size={100} />
        </Skeleton>
        <div className="p-2 flex flex-col gap-2">
            <Skeleton className='h-6 w-full rounded'/>
            <Skeleton className='h-5 w-3/4 rounded'/>
            <Skeleton className='h-4 w-1/2 rounded'/>
        </div>
    </div>
  )
}