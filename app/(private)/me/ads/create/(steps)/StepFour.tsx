import React, { useEffect, useState } from 'react'
import { FormGroup } from '../fields'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { AdData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

type Props = {}

export default function StepFour({}: Props) {
  const router = useRouter()
  const [data, setData] = useState<AdData>()

  useEffect(()=>{
    const item = localStorage.getItem("ad_data")
    if(!item){
      router.push('?cp=1&e=no item')
      return
    }
    setData(JSON.parse(item))
  }, [])

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position)=>{
      if(position.coords.latitude && position.coords.longitude){
          setData({...data, location: `${position.coords.latitude},${position.coords.longitude}`})
      }
    })
  }

  const navigateToNextPage = () => {
    localStorage.setItem('ad_data', JSON.stringify(data))
    router.push('?cp=5')
  }

  return (
    <>
      <FormGroup 
        className='h-fit sm:h-fit pt-4' 
        required label='Product Address' 
        tip='Please provide the physic address of your advert so that the buyers can find it. Provide all relevant information to direct the buyers.'>
        <Textarea 
          value={ data?.address ?? "" } 
          autoFocus
          onChange={(e)=>{ setData({...data, address: e.target.value })}}  
          className='h-[7.5rem] bg-secondary resize-none text-lg rounded-sm overflow-hidden' />
      </FormGroup>
      <FormGroup 
        label='Geo-Location' 
        className='h-fit py-8 pt-10 flex flex-col gap-5 sm:flex-row px-5 sm:justify-between sm:items-center'
        tip='Provide the geo-location for your advert. This is useful for the buys to locate what they want.'>
          <Button className='text-lg w-full rounded-sm bg-primary/10 hover:bg-primary/30 text-accent-foreground' onClick={ getCurrentLocation }>Use current Location</Button> 
          <Button className='text-lg w-full rounded-sm bg-primary/10 hover:bg-primary/30 text-accent-foreground'>Select Location on Map</Button>
      </FormGroup>

      <div className="flex justify-between items-center py-3 max-w-lg mx-auto w-full">
        <Link href="?cp=3"><Button><ArrowBigLeft />Prevous Page</Button></Link>
        <Button onClick={ navigateToNextPage }>Next Page<ArrowBigRight /></Button>
      </div>
    </>
  )
}