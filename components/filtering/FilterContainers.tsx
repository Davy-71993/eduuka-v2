"use client"

import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import { useFilters } from '@/lib/hooks'
import Link from 'next/link'
import { ScrollArea } from '../ui/scroll-area'
import { Category, SubCategory } from '@/lib/types'
import { useCallback, useContext, useEffect, useState } from 'react'
import { toQueryString, toNumber } from '@/lib/utils'
import { FormGroup } from '@/app/(private)/me/ads/create/fields'
import { Input } from '../ui/input'
import { FiAlertTriangle } from "react-icons/fi";
import { AppContext } from '@/context/Appcontext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { NavigationMenuLink } from '../ui/navigation-menu'

type Props = {
  colapsble?: boolean,
  toUrl?: string
}

export  const  HomeFiltersContainer = ({ colapsble=false, toUrl }: Props) => {

  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<any>()
  const [error, setError] = useState<{price?: string, dist?: string}>()
  const [range, setRange] = useState<{mnp?: string, mxp?: string}>()
  const [currency, setCurrency] = useState<string>()
  const [units, setUnits] = useState<"Meters" | "Kilometers" | "Miles">('Meters')
  const [val, setVal] = useState<string>()
  const [orderBy, setOrderBy] = useState('')
  
  const pathName = usePathname()
  const params = useFilters()
  const router = useRouter()
  const { geoData } = useContext(AppContext)

  const toMeters = (v: number, u: "Meters" | "Kilometers" | "Miles") => {
    switch (u) {
        case 'Meters':
        return v;
    case 'Kilometers':
        return v*1000;
    case 'Miles':
        return v*1600;
    default:
        return v;
    }
  }

  useEffect(()=>{
    const u = localStorage.getItem('units')
    setUnits(u ? u as "Meters" | "Kilometers" | "Miles" : "Meters")
  }, [])

  useEffect(()=>{
    setCurrency(geoData?.currency)
  }, [geoData])

  useEffect(()=>{
    setRange({
      mnp: params.mnp,
      mxp: params.mxp
    })
    setOrderBy(params.ordby)
    setFilters(params)
  }, [params])

  useEffect(()=>{
    setFilters((prevFilters: any)=>({...prevFilters, ...range, dist: toMeters(toNumber(val), units)}))
  }, [range, val, units])

  const openClose = useCallback(()=>{
    setOpen(!open)
  }, [open])

  const applyPriceFilters = () => {
    router.push(`${ toUrl ?? pathName }${toQueryString({ ...params, mxp: range?.mxp, mnp: range?.mnp })}`)
  }

  const applyDistanceFilters = () => {
    if(!val || val.trim().length === 0){
      setError({...error, dist: `Please enter valid distance in ${units}`})
      return router.push(`${pathName}${toQueryString({...params, dist: undefined})}`)
    }
    let numMeters = toMeters(toNumber(val), units)
    if(numMeters < 500){
      switch (units) {
        case "Kilometers":
          setError({...error, dist: "The distnace in Kilometers must be at least 0.5Km"})
          break;
        case "Meters":
          setError({...error, dist: "The distnace in Meters must be at least 500M"})
          break;
        case "Miles":
          setError({...error, dist: "The distnace in Miles must be at least 0.5miles"})
          break;
        default:
          setError({...error, dist: "Unkown units"});
      }
      return router.push(`${pathName}${toQueryString({ ...params, dist: undefined })}`)
    }
    router.push(`${pathName}${toQueryString({ ...params, dist: toMeters(toNumber(val), units) })}`)
  }



  return (
    <div className='w-full relative'>
      <Button onClick={ openClose } size={'lg'} className={`font-bold text-xl w-full justify-between ${!colapsble && 'hidden'}`}>
        <span>Extra Filters</span>
        <ChevronDown size={25} className={`${open ? '-rotate-180' : ''} transition-transform`} />
      </Button>
      <div className={`flex flex-col gap-5 px-3 w-full min-h-[70vh] h-full shadow-lg py-5 ${ colapsble && 'absolute top-14 left-0 z-50' } rounded-sm bg-primary ${ colapsble ? (open ? '' : 'hidden') : ''}`}>
        <FormGroup 
          label="Price Range" 
          className="h-fit sm:h-fit p-5 bg-primary border-secondary"
          labelClasses='bg-primary text-secondary'>
          {
            error?.price && 
            <p className="text-yellow-300 font-bold py-2 flex justify-start items-start gap-2"><FiAlertTriangle size={40} /> <span>{error.price}</span></p>
          }
          <Input 
            placeholder={`Min Price (${currency})`} 
            type="number"
            value={ range?.mnp ?? '' } 
            onChange={ (e) => { 
              const value = e.target.value
              if(range?.mxp && toNumber(value) > toNumber(range?.mxp)){
                setError({...error, price: "The min price can not be greater than the max price"})
              }else{
                setError({...error, price: undefined})
              }
              setRange({...range, mnp: value})
            } }
            onKeyDownCapture={(e)=>{
              if(e.key === "Enter"){
                applyPriceFilters()
              }
            }}
            className="px-2 h-fit py-1 w-full text-lg rounded"/>
          <p className="px-2 h-fit py-1 w-full text-lg text-center text-secondary">to</p> 
          <Input 
            placeholder={`Max Price (${currency})`} 
            type="number"
            className="px-2 h-fit py-1 rounded w-full text-lg"
            onChange={ (e) => { 
              const value = e.target.value
              if(range?.mnp && toNumber(value) < toNumber(range?.mnp)){
                setError({...error, price: "The max price can not be less than the min price"})
              }else{
                setError({...error, price: undefined})
              }
              setRange({...range, mnp: value})
              setRange({...range, mxp: e.target.value})
            }}
            onKeyDownCapture={(e)=>{
              if(e.key === "Enter"){
                applyPriceFilters()
              }
            }}
            value={ range?.mxp ?? '' }
            />
        </FormGroup>
        <FormGroup 
          label={`Distance in ${units}`} 
          className="h-fit sm:h-fit p-5 bg-primary border-secondary"
          labelClasses='bg-primary text-secondary'>
          {
            error?.dist && 
            <p className="text-yellow-300 font-bold py-2 flex justify-start items-start gap-2">
              <FiAlertTriangle size={40} /> <span>{error.dist}</span>
            </p>
          }
          <div className={`w-full flex text-xl rounded overflow-hidden ${ error && 'border-red-500'}`}>
            <Select 
              onValueChange={(u)=>{
                setUnits(u as "Meters" | "Kilometers" | "Miles")
                localStorage.setItem('units', u)
              }}>
              <SelectTrigger className="w-full rounded-none border-none text-lg">
                  <SelectValue placeholder={units}/>
              </SelectTrigger>
              <SelectContent className="w-full z-[10000]">
                <SelectItem value="Meters" >Meters</SelectItem>
                <SelectItem value="Kilometers" >Kilometers</SelectItem>
                <SelectItem value="Miles" >Miles</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              type="number" 
              value={ val ?? ''}
              onChange={ (e)=>{
                const value= e.target.value
                setVal(value)
                if(toMeters(toNumber(value), units) > 500){
                  setError({...error, dist: undefined})
                }
              } }
              onKeyDownCapture={ (e) => {
                if(e.key === "Enter"){
                  applyDistanceFilters()
                }
              }}
              placeholder="Distance here" 
              className={`w-full rounded-none text-lg px-2`} />
          </div>
        </FormGroup>
        <FormGroup 
          label="Order By" 
          className="h-fit sm:h-fit py-5 bg-primary border-secondary" 
          labelClasses='bg-primary text-secondary'>
          <RadioGroup value={ orderBy } onValueChange={(e)=>{ 
              setOrderBy(e)
              setFilters((prevFilters: any)=>({...prevFilters, ordby: e}))
              router.push(`${toUrl ?? pathName}${toQueryString({...filters, ordby: e})}`)
            }} className='flex flex-col gap-5 w-full h-fit px-8'>
            <div className="flex items-center space-x-2 text-xl w-full text-secondary ">
              <RadioGroupItem value="dist_meters" id={`r-dist_meters`} className='text-secondary cursor-pointer text-2xl border-secondary border-2'/>
              <Label htmlFor={`r-dist_meters`} className=" text-xl cursor-pointer">Distance</Label>
            </div>
            <div className="flex items-center space-x-2 text-xl w-full text-secondary ">
              <RadioGroupItem value="price" id={`r-price`} className='text-secondary cursor-pointer text-2xl border-secondary border-2'/>
              <Label htmlFor={`r-price`} className=" text-xl cursor-pointer">Price</Label>
            </div>
          </RadioGroup>
        </FormGroup>
        <Link href={`${toUrl ?? pathName}${toQueryString({...filters})}`} className='py-5'>
          <Button className='rounded w-full text-xl bg-secondary hover:bg-background text-primary'>Apply Filters</Button>
        </Link>
      </div>
    </div>
  )
}

export const MapCategoryFilter = ({ categories, mobile }: { categories: Category[], mobile?:boolean }) => {
  
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [subCategories, setSubCategories] = useState<SubCategory[]>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>()

  const params = useFilters()
  
  useEffect(()=>{
    const cat = params.cid
    const cate = categories.find(c => toNumber(c.id) === toNumber(cat))
    setSelectedCategory(cate)
    if(cate){
      const scate = cate.sub_categories?.find(sc => toNumber(sc.id) === toNumber(params.scid))
      setSelectedSubCategory(scate)
      setSubCategories(cate.sub_categories)
    }else{
      setSubCategories(undefined)
    }
  }, [params, categories])

  return (
    <div className="flex flex-col h-full bg-primary w-full rounded-sm overflow-hidden">
      <p className='w-full px-5 py-2 text-muted text-2xl line-clamp-1'>Filter by Category</p>
      <ScrollArea className='h-[70vh] w-full'>
          <div className='h-max w-full'>
            <div className="flex flex-col h-full w-full pb-5 px-3">
            {
              !selectedCategory 
              ?
              categories.map((category, index) => (
                <Link key={ index } href={`/map${ toQueryString({...params, cid: category.id}) }`}>
                  <Button
                    className='w-full rounded px-2 py-1 text-lg text-muted hover:bg-background hover:text-primary justify-start'>{ category.name }</Button>
                </Link>
              ))
              :
              <div className="flex flex-col gap-1 w-full">
                <div className="flex bg-background/95 rounded w-full items-center text-primary overflow-hidden">
                  <Link href={`/map`} className='w-fit hover:bg-background h-full py-1 px-3'>
                      <ChevronLeft size={28} />
                  </Link>
                  {
                    mobile 
                    ?(
                      <NavigationMenuLink asChild>
                        <Link  
                          href={`/map${toQueryString({...params, cid: selectedCategory.id, scid: undefined})}`}
                          className='w-full line-clamp-1 py-1 px-3 text-primary text-left hover:bg-background'
                        >
                          { selectedCategory.name }
                        </Link>
                      </NavigationMenuLink>
                    )
                    :(
                      <Link  
                        href={`/map${toQueryString({...params, cid: selectedCategory.id, scid: undefined})}`}
                        className='w-full line-clamp-1 py-1 px-3 text-primary text-left hover:bg-background'
                      >
                        { selectedCategory.name }
                      </Link>
                    )
                  }
                  
                </div>
                {
                  subCategories?.map((subCategory, index) => (
                    <SubCategoryLink 
                      key={index}
                      mobile={mobile} 
                      name={ subCategory.name! } 
                      selected={selectedSubCategory === subCategory}
                      to={`/map${toQueryString({...params, cid: selectedCategory.id, scid: subCategory.id})}`}/>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

const SubCategoryLink = ({mobile, to, name, selected}: {mobile?:boolean, to:string, name: string, selected?:boolean}) => {
  if(mobile){
    return(
      <NavigationMenuLink asChild>
        <Link href={to}>
          <p 
            className={`w-full line-clamp-1 rounded px-2 py-1 text-lg text-muted hover:bg-background hover:text-primary ${ selected && 'bg-background text-primary'}`}>
            { name }
          </p>
        </Link>
      </NavigationMenuLink>
    )
  }
  return (
    <Link href={to}>
      <p 
        className={`w-full line-clamp-1 rounded px-2 py-1 text-lg text-muted hover:bg-background hover:text-primary ${ selected && 'bg-background text-primary'}`}>
        { name }
      </p>
    </Link>
  )
}
