import React, { useContext, useEffect, useState, useTransition } from 'react'
import { FormGroup, FormRadioGroup, FormSelect, MenuPriceItem, Tip } from '@/app/(private)/me/ads/create/fields'
import { Input } from '@/components/ui/input'
import { AdData, MenuItem } from '@/lib/types'
import { numberOrUndefine, toNumber } from '@/lib/utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { AppContext } from '@/context/Appcontext'
import Spinner from '@/components/animated/Spinner'

type Props = {
    ad: AdData,
    onChange: (ad: AdData) => void
    error?: any
    setError: (er: any) => void
}

export default function Pricing({ ad, onChange, error, setError }: Props) {

  // Form ad initially set by ad from the localstrage
  const [menuItem, setMenuItem] = useState<MenuItem>()
  const [idUnderDelete, setIdUnderDelete] = useState<string>()
  
  const [deleting, startDeleting] = useTransition()
  const [uploading, startUploading] = useTransition()
  const { supabase } = useContext(AppContext)

  const addMenuItem = () => {
    if(menuItem?.item && menuItem.price){
        startUploading(async()=>{
            if(!supabase) return 
            const upload = await supabase
            .from('menu_items')
            .insert({
                ...menuItem,
                ad_id: ad.id
            })
            .select('id, item, price')
            .single()
            if(upload.data){
                onChange({...ad, menu_items: [...ad?.menu_items??[], upload.data], price: undefined})
                setError({...error, menu_items: undefined})
            }    
        })
    }
  }

  const removeMenuItem = (item: MenuItem) => {
    startDeleting(async()=>{
        setIdUnderDelete(item.id)
        if(!supabase) return 
        const del = await supabase
        .from('menu_items')
        .delete()
        .eq('id', item.id)

        if(del.error){
            console.log(`Failed to delete menu item. ${ del.error }`)
            setError({...error, menu_items: `Failed to delete menu item. ${ del.error }`})
            return
        }

        setError({...error, menu_items: undefined})
        onChange({...ad, menu_items: ad?.menu_items?.filter((it) => it !== item)})
    })
  }

  return (
    <div className='w-full flex flex-col md:flex-row gap-5'>
        <div className="w-full flex flex-col gap-5">
            <FormSelect label='Currency' 

                options={[
                {name: 'USD', value: 'USD'}, 
                {name: 'UGX', value: 'UGX'}, 
                {name: 'KSH', value: 'KSH'},
                {name: 'TSH', value: 'TSH'}
                ]}
                setter={(e)=>{ onChange({...ad, default_currency: e })}}
                value={ad?.default_currency ?? 'UGX'}
                className='w-full min-w-full'
                required
                tip='Select the currency for your billing. Whenever you change your currency, please double 
                check your price to confirm that it is correct in accordance with the new currency you selected.' />
                
            <FormGroup 
                label='Set a Pricing Scheme' 
                className={`h-fit sm:h-fit p-5 ${ error?.scheme && 'border-destructive'} min-w-full`} 
                tip='Select the most appropriate pricing scheme for your product or service'>
                <RadioGroup 
                value={ ad?.pricing_scheme ?? '' } 
                onValueChange={ (e)=>{ setError({...error, scheme: undefined}); onChange({...ad, pricing_scheme: e})} } 
                className='flex flex-col gap-4 h-fit px-8'>
                {
                    error?.scheme &&
                    <p className="text-lg text-center text-destructive w-full">{ error.scheme}</p>
                }
                {
                    [ "fixed price", "periodic price", "price range", "price menu"].map((radio, index) =>(
                    <div key={index} className="flex items-center hover:text-primary transition-colors gap-4">
                        <RadioGroupItem value={ radio } id={`r-${index}`} className='w-4 h-4 sm:w-6 sm:h-6 sm:border-2'/>
                        <Label htmlFor={`r-${index}`} className='capitalize sm:text-lg'>{ radio }</Label>
                    </div>
                    ))
                }
                </RadioGroup>
            </FormGroup>
        </div>

        <div className="w-full">
            {/* Case pricing scheme is fixed. */}
            {
                ad?.pricing_scheme === "fixed price" &&
                <FormGroup 
                label='Price' 
                required 
                className={`${ error?.price && 'border-destructive' } h-fit sm:h-fit min-w-full`}
                tip='Enter a fixed price. This price can still be negotiable depending on settings in the details field.'>
                {
                    error?.price &&
                    <p className="text-destructive pt-5 px-8">{ error.price }</p>
                }
                <Input 
                    type='number'
                    className='w-full bg-secondary h-12 text-lg px-8' 
                    value={ ad.price ?? '' } 
                    onChange={(e)=>{ onChange({...ad, price: numberOrUndefine(e.target.value)}) }}
                    placeholder='Price here' />
                    
                </FormGroup>
            }

            {/* Case pricing scheme is range */}
            {
                ad?.pricing_scheme === "price range" &&
                <FormGroup 
                    label='Price Range' 
                    required 
                    tip='Please provide the minimum and maximum price. Just make sure the max-price is hihger than the min-price' 
                    className=' h-fit sm:h-fit min-w-full py-5'>
                    {
                    error?.priceRange &&
                    <p className="text-red-500 pt-5 px-8">{ error.priceRange }</p>
                    }
                    <div className="flex flex-col gap-3 h-full justify-between px-8 space-x-2 items-center text-lg ">
                        <div className="w-full flex items-center gap-2">
                            <Label className='w-1/4 min-w-fit max-w-16'>From:</Label>
                            <Input 
                                type='number'
                                className='w-full px-4 bg-secondary border-b-2 rounded-none' 
                                value={ ad.min_price?? '' } 
                                autoFocus
                                placeholder='Min Price'
                                onChange={(e)=>{ onChange({...ad, min_price: numberOrUndefine(e.target.value)}) }} />
                        </div>
                        <div className="w-full flex items-center gap-2">
                            <Label className='w-1/4 min-w-fit max-w-16'>To:</Label>
                            <Input 
                                type='number'
                                className={`w-full px-4 bg-secondary rounded-none border-b-2 ${ error?.priceRange && 'border-red-600'}`} 
                                value={ ad.max_price?? '' } 
                                placeholder='Max Price'
                                onChange={(e)=>{ onChange({...ad, max_price: numberOrUndefine(e.target.value)}) }} />
                        </div>
                    </div>
                </FormGroup>
            }

            {/* Case pricing scheme is periodic */}
            {
                ad?.pricing_scheme === "periodic price" &&
                <>
                <FormGroup label='Select your Pricing Period' className={`h-fit sm:h-fit p-5 pt-10 min-w-full`}>
                    <FormRadioGroup
                    radios={["daily", "monthly", "yearly"]}
                    setter={ (period)=>{ onChange({...ad, pricing_period: period})} }
                    value={ ad.pricing_period?? '' } 
                    includeCustomField
                    />
                </FormGroup>
                
                {
                    ad.pricing_period && ad.pricing_period !== '' &&
                    <FormGroup label={`Enter your ${ad.pricing_period} Price`}
                    className={`${ error?.price && 'border-destructive'} h-fit sm:h-fit min-w-full`}>
                    {
                        error?.price &&
                        <p className="text-destructive pt-5 px-8">{ error.price }</p>
                    }
                    <Input 
                        type='number'

                        className='w-full h-12 text-lg px-8 bg-secondary' 
                        value={ ad.price ?? '' } 
                        onChange={(e)=>{ onChange({...ad, price: numberOrUndefine(e.target.value)}) }} />
                    </FormGroup>
                }
                </>
            }

            {/* Case pricing scheme is price menu */}
            {
                ad?.pricing_scheme === 'price menu' &&
                <FormGroup 
                label='Price Menu' 
                className={`p-5 h-fit sm:h-fit min-w-full flex flex-col gap-3 items-center ${error?.menu_items && 'border-destructive'}`} 
                tip='Add the menu items. Each menu item must have a price'>
                    {
                    ad.menu_items?.length
                    ? (
                        <>
                        {

                            ad.menu_items?.map((item, index) => 
                                (    
                                    <MenuPriceItem 
                                        item={ item } 
                                        deleting={ item.id === idUnderDelete }
                                        key={ index } 
                                        default_currency={ ad.default_currency! } 
                                        onclose={(e)=>{ removeMenuItem(e) }}  />
                                ))
                        }
                        {
                            uploading &&
                            <div className="bg-primary/40 animate-pulse w-full p-5 rounded-sm">
                                <Spinner variant='primary' size='md'/>
                            </div>
                        }
                        </>
                    )
                    : (
                        <>
                            <div className="h-24 w-full flex justify-center items-center">
                                <p className={`${ error?.menu_items ? 'text-destructive' : 'text-muted-foreground'} text-center w-2/3`}>
                                You {" don't "} have any menu items click the button bellow to add.
                                </p>
                            </div>
                        </>
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
        </div>
    </div>
  )
}