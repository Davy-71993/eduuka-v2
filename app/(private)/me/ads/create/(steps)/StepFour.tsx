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
  const [error, setError] = useState<{ address?: string, location?: string}>()

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
    if(!geoData?.location?.lon || !geoData?.location?.lat){
      // setError({...error, location: 'Oops! your device could not get your location. Please open the map and drag and drop the location pin to select your location manually'})
      setError({...error, location: "You don't have any location set, try the map."})
      return
    }
    setData({...data, location: `POINT(${geoData.location?.lon} ${geoData.location?.lat})`})
    setError({...error, location: undefined})
  }

  const selectLocation = ()=>{ 
    setData({...data, location: lnglat})
    setError({...error, location: undefined}) 
  }

  const setLocation = useCallback((lat: number, lon: number) => {
    setLnglat(`POINT(${lon} ${lat})`)
  }, [])

  const editAddress = (e: any)=>{ 
    setData({...data, address: e?.target?.value })
    if(!e?.target?.value || e.target.value.length  === 0){
      setError({...error, address: 'Please provide a valid physical address' })
    }else{
      setError({...error, address: undefined })
    }
  }

  const handleValidation = () => {
    let err: any = {}
    if(!data?.address){
      err.address = 'Please provide a valid physical address'
    }
 
    if(!data?.location){
      err.location = 'Please provide a valid geo location'
    }
    return err
  }

  const navigateToNextPage = () => {
    const error = handleValidation()
    if(error?.address || error?.location){
      setError(error)
      return
    }
    localStorage.setItem('ad_data', JSON.stringify(data))
    router.push('?cp=5')
  }

  return (
    <>
      <FormGroup 
        className='h-fit sm:h-fit pt-4' 
        required label='Physical Address' 
        tip='Please provide the physic address of your advert so that the buyers can find it. Provide all relevant information to direct the buyers.'>
        {
          error?.address &&
          <p className="text-xl text-destructive w-full text-center">{ error?.address }</p>
        }
        <Textarea 
          value={ data?.address ?? "" } 
          autoFocus
          onChange={ editAddress }  
          className='h-[7.5rem] bg-secondary resize-none text-lg rounded-sm overflow-hidden' />
      </FormGroup>
      <FormGroup 
        label='Geo-Location' 
        className='h-fit sm:h-fit py-8 px-8 pt-10 flex flex-col gap-5'
        tip='Provide the geo-location for your advert. This is useful for the buys to locate what they want.'>
        {
          error?.location &&
          <p className="text-xl text-destructive w-full text-center">{ error?.location }</p>
        }
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
                <Button onClick={ selectLocation }>Save Location</Button>
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