import React, { useEffect, useState } from 'react'
import { FormGroup, FormRadioGroup } from '../fields'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { AdData } from '@/lib/types'

type Props = {}

export default function StepThree({}: Props) {

  const router = useRouter()
  const priceOrUndefined = (price: string) => Number.isNaN(parseFloat(price)) ? undefined : parseFloat(price)
  const priceOrZero = (price: number | undefined) => price ? price : 0

  
  // Form data initially set by data from the localstrage
  const [data, setData] = useState<AdData>()
  
  // Get data from the localstarge and set the initial state
  useEffect(()=>{
    const item = localStorage.getItem('ad_data')
    if(!item){
      router.push('/me/ads/create?cp=1&e=no saved data')
      return 
    }
    setData(JSON.parse(item))
    validatePrices()
  }, [])

  // Run validations evrytime the price scheme changes
  useEffect(()=>{
    validatePrices()
  }, [ data ])
  
  // To keep track of errrors from the price and price range
  const [error, setError] = useState<{price?: string, priceRange?: string}>()

  // Just to make sure we always have a proper price.
  const validatePrices = ()=>{
    if(data?.pricing_scheme === "price range"){
      priceOrZero(data?.min_price)  >=  priceOrZero(data?.max_price)
       ?setError({priceRange: 'The min price should not be zero (0.0) but sould be less than the max price'}) 
       :setError({priceRange: undefined});
    }else if(data?.pricing_scheme === "fixed price" || data?.pricing_scheme === "periodic price"){
      (!data?.price || priceOrZero(data?.price) === 0)
        ? setError({price: "You must provide a price greater than zero (0.0)"})
        : setError({price: undefined});
    }else{
      setError(undefined)
    }
     
  }

  /**
   * Handle navigation to next page.
   */
  const navigateToNextPage = () => {
    if(error?.price || error?.priceRange){
      console.log(error)
      alert("Please check your form to eliminate the errors and try again.")
      return
    }
    localStorage.setItem('ad_data', JSON.stringify(data))
    router.push('?cp=4')
  }

  return (
    <>
      <FormGroup label='Set a Pricing Scheme' className='h-fit'>
        <FormRadioGroup 
          radios={[ "fixed price", "periodic price", "price range"]}
          setter={ (e)=>{ setData({...data, pricing_scheme: e}) } }
          value={ data?.pricing_scheme ?? '' }
        />
      </FormGroup>

      {/* Case pricing scheme is fixed. */}
      {
        data?.pricing_scheme === "fixed price" &&
        <FormGroup 
          label='Price' 
          required 
          className={`${ error?.price && 'border-red-600'} h-fit sm:h-fit`}
          tip='Enter a fixed price. This price can still be negotiable depending on settings in the details field.'>
          {
            error?.price &&
            <p className="text-red-500 pt-5 px-8">{ error.price }</p>
          }
          <Input 
            type='number'
            autoFocus
            className='w-full bg-secondary h-12 text-lg px-8' 
            value={ data.price?? '' } 
            onChange={(e)=>{ setData({...data, price: priceOrUndefined(e.target.value)}) }}
            placeholder='Price here' />
            
        </FormGroup>
      }

      {/* Case pricing scheme is range */}
      {
        data?.pricing_scheme === "price range" &&
        <FormGroup 
          label='Price Range' 
          required 
          tip='Please provide the minimum and maximum price. Just make sure the max-price is hihger than the min-price' 
          className=' h-fit sm:h-fit'>
            {
              error?.priceRange &&
              <p className="text-red-500 pt-5 px-8">{ error.priceRange }</p>
            }
          <div className="flex h-full p-3 justify-between px-8 space-x-2 items-center text-lg ">
            <Input 
              type='number'
              className='w-full px-4 bg-secondary border-2' 
              value={ data.min_price?? '' } 
              autoFocus
              placeholder='Min Price'
              onChange={(e)=>{ setData({...data, min_price: priceOrUndefined(e.target.value)}) }} />
            <h1>to</h1>
            <Input 
              type='number'
              className={`w-full px-4 bg-secondary border-2 ${ error?.priceRange && 'border-red-600'}`} 
              value={ data.max_price?? '' } 
              placeholder='Max Price'
              onChange={(e)=>{ setData({...data, max_price: priceOrUndefined(e.target.value)}) }} />
          </div>
        </FormGroup>
      }

      {/* Case pricing scheme is periodic */}
      {
        data?.pricing_scheme === "periodic price" &&
        <>
          <FormGroup label='Select your Pricing Period' className='h-fit sm:h-fit p-5 pt-10'>
            <FormRadioGroup
              radios={["daily", "monthly", "yearly"]}
              setter={ (period)=>{ setData({...data, pricing_period: period})} }
              value={ data.pricing_period?? '' } 
              includeCustomField
            />
          </FormGroup>
          
          {
            data.pricing_period && data.pricing_period !== '' &&
            <FormGroup label={`Enter your ${data.pricing_period} Price`}
              className={`${ error?.price && 'border-red-600'} h-fit sm:h-fit`}>
              {
                error?.price &&
                <p className="text-red-500 pt-5 px-8">{ error.price }</p>
              }
              <Input 
                type='number'
                autoFocus
                className='w-full h-12 text-lg px-8 bg-secondary' 
                value={ data.price ?? '' } 
                onChange={(e)=>{ setData({...data, price: priceOrUndefined(e.target.value)}) }} />
            </FormGroup>
          }
        </>
      }

      <div className="flex justify-between items-center py-3 max-w-lg mx-auto w-full">
        <Link href="?cp=2"><Button><ArrowBigLeft />Prevous Page</Button></Link>
        <Button onClick={ navigateToNextPage }>Next Page<ArrowBigRight /></Button>
      </div>
    </>
  )
}