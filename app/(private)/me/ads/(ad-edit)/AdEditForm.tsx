"use client"

import { Ad, AdData, Category, MenuItem, SubCategory } from '@/lib/types'
import React, { useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react'
import { FormGroup, FormSelect, RenderExtraFields } from '../create/fields'
import { getCategories, updateAds } from '@/lib/actions/db_actions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import AdImageEdit from './AdImageEdit'
import { CloudUpload, PlusCircle, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AppContext } from '@/context/Appcontext'
import { CDN_URL } from '@/lib/defaults'
import LoadingDots from '@/components/LoadingDots'
import Pricing from './Pricing'
import { toNumber } from '@/lib/utils'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import dynamic from 'next/dynamic'
import FadingLine from '@/components/FadingLine'
import { Label } from '@/components/ui/label'
import Spinner from '@/components/animated/Spinner'
import { useRouter } from 'next/navigation'

type Props = {
  ad: Ad
}

export default function AdEditForm({ ad }: Props) {
  // console.log(ad)
  const [updatedAd, setUpdatedAd] = useState<AdData>(ad)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>()
  const [priceError, setPriceError] = useState<any>()
  // const [locationError, setLocationError] = useState<{ address?: string, location?: string}>()
  const [lnglat, setLnglat] = useState(updatedAd?.location)
  const [dataErrors, setDataErrors] = useState<string[]>([])
  // const [deatils, setDetails] = useState('')

  const [deleting, startDeleting] = useTransition()
  const [uploading, startUploading] = useTransition()
  const [updating, startUpdating] = useTransition()

  const { supabase, geoData } = useContext(AppContext)
  const router = useRouter()

  useEffect(()=>{
    (async()=>{
      const cates = await getCategories('id, name, sub_categories(id, name, extra_fields)')
      setCategories(cates)
    })()
  }, [])

  useEffect(()=>{
    const cate_id = ad.category_id
    const subcate_id = ad.sub_category_id

    if(cate_id){
      const cate = categories.find(c => toNumber(c.id) === cate_id)
      setSelectedCategory(cate)
      setSelectedSubCategory(cate?.sub_categories?.find(sc => sc.id === subcate_id))
    }

    if(!cate_id && subcate_id){
      const cate = categories.find(c => {
        const scs = c.sub_categories?.map(sc => sc.id)
        if(scs?.includes(subcate_id)){
          return c
        }
      })
      setSelectedCategory(cate)
      if(!cate) return
      const subcate = cate?.sub_categories?.find(sc => sc.id === subcate_id)
      setSelectedSubCategory(subcate)
      setUpdatedAd({...updatedAd, category_id: toNumber(cate.id), sub_category_id: subcate?.id})
    }
  }, [ad, categories])

  const handleImageDeletion = useCallback((selector?: string, file?:boolean) => {
    startDeleting(async()=>{
      if(file){
        const leftImages = updatedAd.ad_images?.filter(img => img.url !== selector)
        setUpdatedAd({...updatedAd, ad_images: leftImages})
        return
      }
      if(!supabase){
        console.log("Supabase is not initialized")
        return
      }
      const fileName = selector?.split('/').pop()
      console.log(fileName)
      const { error, data } = await supabase
        .from('ad_images')
        .update({
          deleted_at: new Date(),
          url: selector
        })
        .eq('url', selector)

        if(error){
          console.log({ error, data })
          return
        }
      const leftImages = updatedAd.ad_images?.filter(img => img.url !== selector)
      setUpdatedAd({...updatedAd, ad_images: leftImages})
    })
  }, [updatedAd, supabase])

  const handleNewFiles = useCallback((e: any) =>{
    startUploading(()=>{
    const files = [...e.target.files]
    console.log('new files selected')
    files.forEach(async(f) => {
      if(!f || !supabase){
        console.log("the file is not valid")
        return
      }

        const { data, error } = await supabase.storage.from('ads').upload(`/${updatedAd.id}/${f.name}`, f, {
          upsert: true,

        })
  
        if(error){
          console.log(`Image upload for image failed. `, error.message)
          return
        }
        const new_ad_image_res = await supabase
          .from('ad_images')
          .insert({url: `${CDN_URL}/ads/${data.path}`, ad_id: updatedAd.id })
          .select('url, deleted_at')
          if(new_ad_image_res.data){
            const ad_image = new_ad_image_res.data[0]

            setUpdatedAd((prev)=>{
              prev.ad_images?.unshift(ad_image)
              return { ...prev }
            })
          }
          
        })
      
    })
  }, [updatedAd, supabase])

  const handleSelectCategory = (e: string)=>{ 
    setUpdatedAd({...updatedAd, category_id: toNumber(e)})
    setSelectedCategory(categories.find(c => c.id === e)) 
  }

  const handleSelectSubCategory = (e: string)=>{ 
    setUpdatedAd({...updatedAd, sub_category_id: e}) 
    setSelectedSubCategory(selectedCategory?.sub_categories?.find(sc=> sc.id === e))
  }

  // Just to make sure we always have a proper price.
  const validatePrices = ()=>{
    if(!updatedAd?.pricing_scheme){
      return {...priceError, scheme: "You must select a pricing scheme of the updatedAd."}
    }
    if(updatedAd?.pricing_scheme === "price range"){
      if(toNumber(updatedAd?.min_price)  >=  toNumber(updatedAd?.max_price)){
        return {...priceError, scheme: undefined,  priceRange: 'The min price should not be zero (0.0) but sould be less than the max price'} 
      }else{
        return {...priceError, scheme: undefined, priceRange: undefined}
      }
    }else if(updatedAd?.pricing_scheme === "fixed price" || updatedAd?.pricing_scheme === "periodic price"){
      if(!updatedAd?.price || toNumber(updatedAd?.price) === 0){
        return {...priceError, scheme: undefined, price: "You must provide a price greater than zero (0.0)"}
      }else{
        return {...priceError, scheme: undefined, price: undefined}
      }

    }else if(updatedAd.pricing_scheme === 'price menu'){
      if(!updatedAd.menu_items || updatedAd.menu_items.length === 0){
        return {...priceError, scheme: undefined, menu_items: 'You must provide atleast one menu item'}
      }else{
        return { ...priceError, scheme: undefined, menu_items: undefined }
      }
    }
  }

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
      return
    }
    setUpdatedAd({...updatedAd, location: `POINT(${geoData.location?.lon} ${geoData.location?.lat})`})
  }

  const selectLocation = ()=>{ 
    setUpdatedAd({...updatedAd, location: lnglat})
  }

  const setLocation = useCallback((lat: number, lon: number) => {
    setLnglat(`POINT(${lon} ${lat})`)
  }, [])

  const handleValidation = () => {
    const pe = validatePrices()
    let errors: string[] = []

    if(!updatedAd?.ad_images || updatedAd.ad_images.length < 2){
      errors = [...errors, 'Please upload at least two images to describe your product or service.']
    }

    if(!updatedAd.category_id){
      errors = [...errors, 'Please select a category for your ad']
    }

    if(!updatedAd.sub_category_id){
      errors = [...errors, 'Please select a subcategory for your ad']
    }

    if(!updatedAd.name){
      errors = [...errors, 'Please give a name to your ad']
    }

    if(!updatedAd.description){
      errors = [...errors, 'Please give a description to your ad']
    }

    if(pe.priceRange){
      errors = [...errors, pe.priceRange]
    }

    if(pe.price){
      errors = [...errors, pe.price]
    }

    if(pe.menu_items){
      errors = [...errors, pe.menu_items]
    }

    if(pe.scheme){
      errors = [...errors, pe.scheme]
    }

    if(!updatedAd?.address){
      errors = [...errors, 'Please provide a valid address to your product or service.']
    }

    if(!updatedAd?.location){
      errors = [...errors, 'Please provide a valid loction of your ad. You can either use your device location or choose a location on the map']
    }

    return errors
  }

  const handleUpdate = () => {
    // console.log(updatedAd)
    const errors = handleValidation()

    if(errors.length > 0){
      setDataErrors(errors)
      return
    }
    setDataErrors([])
    startUpdating(async()=>{
      
      const { ad_images, menu_items, categories, sub_categories, profiles, ...rest } = updatedAd
      
      const update = await updateAds([rest])
      if(typeof update === 'string'){
        setDataErrors([...dataErrors, update])
        return
      }

      router.push(`/me/ads?aid=${updatedAd.id}`)
    })
  }

  // useEffect(()=>{ console.log(selectedSubCategory?.extra_fields)}, [selectedSubCategory])

  return (
    <div className='w-full flex flex-col gap-5 bg-secondary px-5'>
      <div  
        className={`w-full relative`}>
        
        {
          updatedAd.ad_images?.length === 0
          ?
          <>
            
            {
              uploading ?
              <div className="h-full min-h-[20vh] w-[30vh] bg-primary/40 absolute top-0 gap-3 left-0 z-40 flex justify-center items-center">
                <Spinner text='Uploading' />
              </div>
              :
              <div className='w-full h-full flex flex-col gap-3 py-5 justify-center items-center'>
                <p className="text-destructive">You must upload at least two images to describe your ad</p>
                <Button onClick={()=>{ document.getElementById('file-selector')?.click()}} 
                  className='bg-muted-foreground flex space-x-3 font-bold hover:bg-muted-foreground/80'>
                  <CloudUpload /><span>Upload Images</span>
                </Button>
                <Input type='file' accept='image/*' id='file-selector' className='hidden' onChange={ handleNewFiles } multiple/>
              </div>
            }
    
          </>
          :
          <ScrollArea className='w-full  relative border-2'>
            <div className="flex gap-5 w-fit h-[30vh]">
              {
                uploading &&
                <div className="h-full min-h-[20vh] w-[30vh] bg-primary/40 gap-3 z-40 flex justify-center items-center">
                  <Spinner text='Uploading' />
                </div>
              }
              {
                updatedAd.ad_images?.map((img: any, index) =>(
                  <div key={ index } >
                    {
                      !img['deleted_at'] &&
                      <AdImageEdit imageUrl={ img.url } onDelete={()=>{ handleImageDeletion(img.url, img['new']) }}/>
                    }
                  </div>
                ))
              }
            </div>
            <Button 
              onClick={()=>{ document.getElementById('file-selector')?.click()}} 
              className='w-12 h-12 z-40 elva rounded-full justify-center items-center p-1 absolute bottom-1 right-1'><PlusCircle size={150}/></Button>
            <Input type='file' accept='image/*' id='file-selector' className='hidden' onChange={ handleNewFiles } multiple/>
            <ScrollBar orientation='horizontal'/>
          </ScrollArea>
        }
      </div>
      <FadingLine />

      <div className="flex flex-col sm:flex-row gap-5 w-full">
        <div className="w-full">
          <FormSelect 
            label='Select your Advert Category'
            value={ selectedCategory?.id ?? '' } 
            setter={ handleSelectCategory } 
            options={ categories.map((cat: Category)=>({ name: cat.name ?? '', value: cat.id ?? '' }))} 
            tip='Start with selecting the category that is applicable to your product or service.'
            className='min-w-full'
            required
          />
        </div>
        <div className="w-full">
          <FormSelect 
            label={ `Select Sub-category from ${ selectedCategory?.name }` }
            value={ updatedAd?.sub_category_id ?? '' } 
            setter={ handleSelectSubCategory } 
            options={ selectedCategory?.sub_categories?.map((cat: SubCategory)=>({ name: cat.name ?? '', value: cat.id ?? '' }))?? []} 
            required
            className='min-w-full'
            tip='Select the sub category of your product or service. This should in the context of the category you selected above'
          />
        </div>
      </div>
      <FadingLine />

      <div className="flex flex-col gap-5">
        <FormGroup label="Name or Title" required className='min-w-full'>
            <Input 
              className='w-full absolute bg-secondary left-0 bottom-0 h-12 sm:text-lg px-8' 
              value={ updatedAd.name } 
              onChange={(e)=>{ setUpdatedAd({...updatedAd, name: e.target.value})}} />
        </FormGroup>
        <FormGroup className='h-28 sm:h-32 min-w-full' label='Describe your Product'>
          <Textarea 
              value={ updatedAd.description } 
              onChange={(e)=>{ setUpdatedAd({...updatedAd, description: e.target.value}) }}  
              className='h-24 sm:h-28 absolute bg-secondary left-0 bottom-0 px-8 resize-none sm:text-lg rounded-sm overflow-hidden' />
        </FormGroup>
        <RenderExtraFields 
          fields={ selectedSubCategory?.extra_fields ?? ''} 
          initialData={ updatedAd.ad_details ?? ''}
          setter={ (e)=>{setUpdatedAd({...updatedAd, ad_details: e })} } 
          className="min-w-full" />
      </div>
      <FadingLine />

      <div className="w-full">
        {
          priceError &&
          <p className="text-destructive w-full text-center">
            { priceError.priceRange }
          </p>
        }
        <Pricing 
          ad={updatedAd} 
          onChange={ setUpdatedAd } 
          error={ priceError } 
          setError={ setPriceError } />

      </div>
      <FadingLine />

      <div className="flex w-full flex-col md:flex-row gap-5">
        <div className="w-full">
          <FormGroup 
            className='h-fit sm:h-fit pt-4 min-w-full' 
            required label='Physical Address' 
            tip='Please provide the physic address of your advert so that the buyers can find it. Provide all relevant information to direct the buyers.'>
            
            <Textarea 
              value={ updatedAd?.address ?? "" } 
              onChange={ (text)=>{ setUpdatedAd({...updatedAd, address: text.target.value}) } }  
              className='h-[7.5rem] bg-secondary resize-none sm:text-lg rounded-sm overflow-hidden' />
          </FormGroup>
        </div>
        <div className="w-full">
          <FormGroup 
            label='Geo-Location' 
            className='h-fit sm:h-fit py-8 px-8 flex flex-col gap-5 min-w-full'
            tip='Provide the geo-location for your advert. This is useful for the buys to locate what they want.'>
            {
              updatedAd?.location &&
              <p className="text-center sm:text-lg text-primary">
                Location: { `${updatedAd.location}` }
              </p>
            }
            <Button className='sm:text-lg w-full px-2 rounded-sm bg-primary/10 hover:bg-primary/30 text-accent-foreground' onClick={ getCurrentLocation }>
              <p className="w-full line-clamp-1 overflow-hidden">Use current Location</p>
            </Button> 
            <Dialog>
              <DialogTrigger asChild>
                <Button className='sm:text-lg w-full px-2 rounded-sm bg-primary/10 hover:bg-primary/30 text-accent-foreground'>
                  <p className="w-full line-clamp-1 overflow-hidden">Select Location on Map</p>
                </Button>
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
        </div>
      </div>
      <FadingLine />

      {
        dataErrors.length > 0 &&
        <div className="px-5">
          <Label className='text-destructive sm:text-lg pb-3'>Errors occured while trying to update your ad, Please address them and try again.</Label>
          
          <ol className=" list-decimal px-5">
            {
              dataErrors.map((error, index) => (
                <li key={ index } className="text-destructive">
                  { error }
                </li>
              ))
            }
          </ol>
        </div>
      }

      <div className="w-full flex justify-end py-5">
        <Button 
          variant={ updating ? 'outline' : 'default'} 
          onClick={ handleUpdate } 
          className={`w-full max-w-80 text-xl gap-5 ${ updating && 'border-primary border-2'}`}>
          {
            updating
            ?
            <>
            <Spinner size='md' variant='primary' text='Updating' />
            </>
            :
            <>
              <Upload/>
              <span>Save Changes</span>
            </>
          }
        </Button>
      </div>

    </div>
  )
}

