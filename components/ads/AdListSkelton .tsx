import React from 'react'
import AdCardSkelton from './AdCardSkelton'

type Props = {}

export default function AdListSkelton ({}: Props) {
    const skeltons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <div className='grid gap-4 grid-cols-2 lg:grid-cols-3 w-full'>
        {
            skeltons.map((skelton) => (
                <AdCardSkelton key={skelton}/>
            ))
        }
    </div>
  )
}