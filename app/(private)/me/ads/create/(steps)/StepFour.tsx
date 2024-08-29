import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { FormGroup } from '../fields'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { AdData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import LoadingDots from '@/components/LoadingDots'
import { AppContext } from '@/context/Appcontext'

type Props = {}

export default function StepFour({}: Props) {
  const { geoData } = useContext(AppContext)
  const router = useRouter()
  const [data, setData] = useState<AdData>()
  const [lnglat, setLnglat] = useState(data?.location)

  useEffect(()=>{
    const item = localStorage.getItem("ad_data")
    if(!item){
      router.push('?cp=1&e=no item')
      return
    }
    setData(JSON.parse(item))
  }, [router])

  const Map = useMemo(() => dynamic(
    () => import('@/components/map/MapDialog'),
    { 
    loading: () => (
        <div className="w-full border-2 h-[70vh] flex justify-center items-center">
            <LoadingDots />
        </div>
    ),
    ssr: false
    }
), [])

  const getCurrentLocation = () => {
    if(!geoData?.location){
      alert("No location data was found.")
      return
    }
    setData({...data, location: `POINT(${geoData?.location?.lon} ${geoData?.location?.lat})`})
  }

  const setLocation = useCallback((lat: number, lon: number) => {
    setLnglat(`POINT(${lon} ${lat})`)
  }, [])

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
        className='h-fit sm:h-fit py-8 px-8 pt-10 flex flex-col gap-5'
        tip='Provide the geo-location for your advert. This is useful for the buys to locate what they want.'>
          {
            data?.location &&
            <p className="text-center text-lg text-primary">
              Location: { data.location }
            </p>
          }
          <Button className='text-lg w-full rounded-sm bg-primary/10 hover:bg-primary/30 text-accent-foreground' onClick={ getCurrentLocation }>Use current Location</Button> 
          <Dialog>
            <DialogTrigger asChild>
              <Button className='text-lg w-full rounded-sm bg-primary/10 hover:bg-primary/30 text-accent-foreground'>Select Location on Map</Button>
            </DialogTrigger>
            <DialogContent className='w-full h-[60vh] flex flex-col gap-3 p-10 overflow-hidden'>
              <Map setter={ setLocation }/>
              <DialogFooter className='h-fit flex justify-between items-center'>
                <DialogClose className='bg-destructive px-5 py-3 rounded-sm text-primary-foreground'>
                  Cancle
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={ ()=>{ setData({...data, location: lnglat}) } }>Save Location</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
      </FormGroup>

      <div className="flex justify-between items-center py-3 max-w-lg mx-auto w-full">
        <Link href="?cp=3"><Button><ArrowBigLeft />Prevous Page</Button></Link>
        <Button onClick={ navigateToNextPage }>Next Page<ArrowBigRight /></Button>
      </div>
    </>
  )
}