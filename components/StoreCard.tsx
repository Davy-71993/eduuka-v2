import { Store } from '@/lib/types'
import Image from 'next/image'
import React from 'react'

type Props = {
  store: Store,
  width?: string
}

export default function StoreCard({ store,  width="w-full" }: Props) {
  return (
    <div className={`${width} overflow-hidden h-full bg-secondary flex flex-col justify-between rounded-md shadow`}>
      <Image src={ store.image || '' } alt='Category Image' height={ 1000 } width={ 1000 } className='w-full h-auto rounded-t-sm' />
      <div className="p-2 sm:p-5 text-center sm:text-xl">
        <h2 className='overflow-hidden'>{ store.name }</h2>
        <p className="font-thin text-sm sm:text-base">{ store.ads?.length + ' '} Ads</p>
      </div>
    </div>
  )
}