import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FormGroup, FormRadioGroup, FormSelect, MenuPriceItem, Tip } from '../fields'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { AdData, MenuItem } from '@/lib/types'
import { numberOrUndefine, toNumber } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AppContext } from '@/context/Appcontext'

type Props = {}

export default function StepThree({}: Props) {

  const router = useRouter()
  const { geoData } = useContext(AppContext)
  // Form data initially set by data from the localstrage
  const [data, setData] = useState<AdData>()
  const [menuItem, setMenuItem] = useState<MenuItem>()

  // To keep track of errrors from the price and price range
  const [error, setError] = useState<any>()

  // Just to make sure we always have a proper price.
  const validatePrices = ()=>{
    if(!data?.pricing_scheme){
      return {...error, scheme: "You must select a pricing scheme of the ad."}
    }
    if(data?.pricing_scheme === "price range"){
      if(toNumber(data?.min_price)  >=  toNumber(data?.max_price)){
        return {...error, scheme: undefined,  priceRange: 'The min price should not be zero (0.0) but sould be less than the max price'} 
      }else{
        return {...error, scheme: undefined, priceRange: undefined}
      }
    }else if(data?.pricing_scheme === "fixed price" || data?.pricing_scheme === "periodic price"){
      if(!data?.price || toNumber(data?.price) === 0){
        return {...error, scheme: undefined, price: "You must provide a price greater than zero (0.0)"}
      }else{
        return {...error, scheme: undefined, price: undefined}
      }

    }else if(data.pricing_scheme === 'price menu'){
      if(!data.menu_items || data.menu_items.length === 0){
        return {...error, menu_items: 'You must provide atleast one menu item'}
      }else{
        return { ...error, menu_items: undefined }
      }
    }
  }
  
  // Get data from the localstarge and set the initial state
  useEffect(()=>{
    const item = localStorage.getItem('ad_data')
    if(!item){
      router.push('/me/ads/create?cp=1&e=no saved data')
      return 
    }
    setData({...JSON.parse(item), default_currency: geoData?.currency })
  }, [geoData, router])

  /**
   * Handle navigation to next page.
   */
  const navigateToNextPage = () => {
    const error = validatePrices()
    console.log(error)
    if(error.price || error.priceRange || error.menu_items || error.scheme){
      setError(error)
      return
    }
    
    localStorage.setItem('ad_data', JSON.stringify(data))
    router.push('?cp=4')
  }

  const addMenuItem = () => {
    if(menuItem?.item && menuItem.price){
      setData({...data, menu_items: [...data?.menu_items??[], menuItem], price: undefined})
      setError({...error, menu_items: undefined})
    }
  }

  const removeMenuItem = (item: MenuItem) => {
    setData({...data, menu_items: data?.menu_items?.filter((it) => it !== item)})
    if(!data?.menu_items || data.menu_items.length === 0){
      setError({...error, menu_items: 'menu error'})
    }
  }

  return (
    <>
      <FormSelect label='Currency' 
        options={[
          {name: 'USD', value: 'USD'}, 
          {name: 'UGX', value: 'UGX'}, 
          {name: 'KSH', value: 'KSH'},
          {name: 'TSH', value: 'TSH'}]}
          setter={(e)=>{ setData({...data, default_currency: e })}}
          value={data?.default_currency ?? 'UGX'}
          required
          tip='Select the currency for your billing. Whenever you change your currency, please double 
          check your price to confirm that it is correct in accordance with the new currency you selected.' />
        
      <FormGroup 
        label='Set a Pricing Scheme' 
        className={`h-fit sm:h-fit p-5 ${ error?.scheme && 'border-destructive'}`} 
        tip='Select the most appropriate pricing scheme for your product or service'>
        <RadioGroup 
          value={ data?.pricing_scheme ?? '' } 
          onValueChange={ (e)=>{ setError({...error, scheme: undefined}); setData({...data, pricing_scheme: e})} } 
          className='flex flex-col gap-4 h-fit px-8'>
          {
            error?.scheme &&
            <p className="text-lg text-center text-destructive w-full">{ error.scheme}</p>
          }
          {
            [ "fixed price", "periodic price", "price range", "price menu"].map((radio, index) =>(
              <div key={index} className="flex items-center text-xl hover:text-primary transition-colors gap-4">
                <RadioGroupItem value={ radio } id={`r-${index}`} className='text-xl w-6 h-6'/>
                <Label htmlFor={`r-${index}`} className='capitalize text-xl'>{ radio }</Label>
              </div>
            ))
          }
        </RadioGroup>
      </FormGroup>

      {/* Case pricing scheme is fixed. */}
      {
        data?.pricing_scheme === "fixed price" &&
        <FormGroup 
          label='Price' 
          required 
          className={`${ error?.price && 'border-destructive' } h-fit sm:h-fit`}
          tip='Enter a fixed price. This price can still be negotiable depending on settings in the details field.'>
          {
            error?.price &&
            <p className="text-destructive pt-5 px-8">{ error.price }</p>
          }
          <Input 
            type='number'
            autoFocus
            className='w-full bg-secondary h-12 text-lg px-8' 
            value={ data.price ?? '' } 
            onChange={(e)=>{ setData({...data, price: numberOrUndefine(e.target.value)}) }}
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
              onChange={(e)=>{ setData({...data, min_price: numberOrUndefine(e.target.value)}) }} />
            <h1>to</h1>
            <Input 
              type='number'
              className={`w-full px-4 bg-secondary border-2 ${ error?.priceRange && 'border-red-600'}`} 
              value={ data.max_price?? '' } 
              placeholder='Max Price'
              onChange={(e)=>{ setData({...data, max_price: numberOrUndefine(e.target.value)}) }} />
          </div>
        </FormGroup>
      }

      {/* Case pricing scheme is periodic */}
      {
        data?.pricing_scheme === "periodic price" &&
        <>
          <FormGroup label='Select your Pricing Period' className={`h-fit sm:h-fit p-5 pt-10`}>
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
              className={`${ error?.price && 'border-destructive'} h-fit sm:h-fit`}>
              {
                error?.price &&
                <p className="text-destructive pt-5 px-8">{ error.price }</p>
              }
              <Input 
                type='number'
                autoFocus
                className='w-full h-12 text-lg px-8 bg-secondary' 
                value={ data.price ?? '' } 
                onChange={(e)=>{ setData({...data, price: numberOrUndefine(e.target.value)}) }} />
            </FormGroup>
          }
        </>
      }

      {/* Case pricing scheme is price menu */}
      {
        data?.pricing_scheme === 'price menu' &&
        <FormGroup 
          label='Price Menu' 
          className={`p-5 h-fit sm:h-fit flex flex-col gap-3 items-center ${error?.menu_items && 'border-destructive'}`} 
          tip='Add the menu items. Each menu item must have a price'>
            {
              data.menu_items?.length
              ? data.menu_items?.map((item, index) => (
                  <MenuPriceItem item={ item } key={ index } default_currency={ data.default_currency! } onclose={(e)=>{ removeMenuItem(e) }}  />
                ))
              : (
                <div className="h-24 w-full flex justify-center items-center">
                  <p className={`${ error?.menu_items ? 'text-destructive' : 'text-muted-foreground'} text-center w-2/3`}>
                  You {" don't "} have any menu items click the button bellow to add.
                  </p>
                </div>
              )
            }
            <Dialog>
              <DialogTrigger className='w-full text-muted max-w-60 bg-primary hover:bg-primary/90 transition-colors mx-auto text-lg rounded-sm text-center py-2 px-5'>
                Add Menu Item
              </DialogTrigger>
              <DialogContent className='p-5'>
                <h1 className="text-xl text-muted-foreground text-center p-5">Create a menu item</h1>
                <div className="w-full max-w-lg mx-auto mt-5 relative border-2 border-primary rounded-sm p-3">
                    <Label className='px-3 absolute left-5 sm:text-lg -top-2 max-w-[70%] line-clamp-1 sm:-top-4 text-accent-foreground/50 bg-background'>
                        Menu Item:
                    </Label>
                    <Input 
                        className='text-lg' 
                        value={ menuItem?.item ?? '' } 
                        onChange={(e)=>{ setMenuItem({...menuItem, item: e.target.value}) }} />
                    <Tip tip="Give a briefe description of the menu item" className='absolute -top-5 right-1 bg-background' />
                </div>
                <div className="w-full max-w-lg mx-auto mt-5 relative border-2 border-primary rounded-sm p-3">
                    <Label className='px-3 absolute left-5 sm:text-lg -top-2 max-w-[70%] line-clamp-1 sm:-top-4 text-accent-foreground/50 bg-background'>
                        Menu Price:
                    </Label>
                    <Input 
                        className='text-lg' 
                        type='number'
                        value={ menuItem?.price ?? '' } 
                        onChange={(e)=>{ setMenuItem({...menuItem, price: e.target.value}) }} />
                    <Tip tip="Give a price to your item mentioned above" className='absolute -top-5 right-1 bg-background' />
                </div>
                <div className="max-w-lg mx-auto w-full flex justify-between items-center py-5">
                  <DialogClose className='px-5 py-2 text-lg text-primary-foreground rounded-sm bg-destructive sm:min-w-60'>Cancle</DialogClose>
                  <DialogClose onClick={ addMenuItem } className='px-5 py-2 text-lg text-primary-foreground rounded-sm bg-primary sm:min-w-60'>Save</DialogClose>
                </div>
              </DialogContent>
            </Dialog>
        </FormGroup>
      }

      <div className="flex justify-between items-center py-3 max-w-lg mx-auto w-full">
        <Link href="?cp=2"><Button><ArrowBigLeft />Prevous Page</Button></Link>
        <Button onClick={ navigateToNextPage }>Next Page<ArrowBigRight /></Button>
      </div>
    </>
  )
}