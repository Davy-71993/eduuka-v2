import React from 'react'
import LocationSelector from './LocationSelector'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

type Props = {
  includeLocation?: boolean
}

export default function SearchBar({ includeLocation }: Props) {
  return (
    <div className='flex w-full max-w-[600px] border border-primary rounded-sm mx-auto bg-primary-foreground'>
      {
        includeLocation &&
        <LocationSelector className='hidden font-normal sm:flex bg-primary-foreground w-fit pr-0 text-primary hover:text-primary-foreground rounded-none rounded-l-sm text-sm sm:text-lg sm:h-full' />
      }
      <Input type='text' className={`rounded-none ${includeLocation ? 'border-l rounded-l-sm sm:rounded-none' : 'rounded-l-sm'} border-r border-primary-foreground sm:text-lg`} placeholder='Type here to search'/>
      <Button className='rounded-none font-normal rounded-r-sm bg-primary-foreground text-primary hover:text-primary-foreground text-xs sm:text-lg p-2 sm:h-full'><Search /> <span className='ml-2'>Search</span></Button>
    </div>
  )
}