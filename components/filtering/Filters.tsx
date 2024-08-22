"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Category, SubCategory } from "@/lib/types"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import { Check, ChevronDown, CircleAlert, Star } from "lucide-react"
import Link from "next/link"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { toNumber } from "@/lib/utils"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import SlideToLeft from "../animated/SlideToLeft"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { FormGroup } from "@/app/(private)/me/ads/create/fields"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useSearch } from "@/lib/hooks"
import { usePathname, useRouter, useSearchParams } from "next/navigation"


export const SubCategories = ({ subCategories }: { subCategories: SubCategory[]}) =>(
    <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
        <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
            <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Sub-categories</span><ChevronDown/></AccordionTrigger>
            <AccordionContent className='flex flex-col'>
                {
                    subCategories.map((subCategory, index)=>(
                        <p key={index}  className='flex p-2 rounded-sm hover:bg-background transition-all'>{ subCategory.name }</p>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const PriceRange = ({
    setter
}:{
    setter: (state: any)=>void
}) => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [ range, setRange ] = useState<{mnp?: string, mxp?: string}>()
    const [error, setError] = useState<string>()

    const queryString = useSearch(range)

    useEffect(()=>{
        setter(range)
    }, [range, setter])

    useEffect(()=>{
        const mnp = searchParams.get('mnp') as string | undefined
        const mxp = searchParams.get('mxp') as string | undefined

        const oldrange = { mnp, mxp }
        setRange(oldrange)
    }, [searchParams])

    const filterByRange = () => {
        if(error){
            return
        }
        router.push(`${pathname}${queryString}`)
    }
    return (
        <FormGroup label="Price Range" className="h-fit sm:h-fit p-5 max-w-[90%]">
            {
                error && 
                <p className=" text-destructive">{error}</p>
            }
            <Input 
                placeholder="Min" 
                type="number"
                value={ range?.mnp ?? '' } 
                onChange={ (e) => { 
                    const value = e.target.value
                    if(range?.mxp && toNumber(value) > toNumber(range?.mxp)){
                        setError("The min price can not be greater than the max price")
                    }else{
                        setError(undefined)
                    }
                    setRange({...range, mnp: value})
                } }
                onKeyDownCapture={(e)=>{
                    if(e.key === "Enter"){
                        filterByRange()
                    }
                }}
                className="px-2 h-fit py-3 w-full text-lg"/>
            <p className="px-2 h-fit py-3 w-full text-lg">to</p> 
            <Input 
                placeholder="Max" 
                type="number"
                className="px-2 h-fit py-3 w-full text-lg"
                onChange={ (e) => { 
                    const value = e.target.value
                    if(range?.mnp && toNumber(value) < toNumber(range?.mnp)){
                        setError("The max price can not be less than the min price")
                    }else{
                        setError(undefined)
                    }
                    setRange({...range, mnp: value})
                    setRange({...range, mxp: e.target.value})
                }}
                onKeyDownCapture={(e)=>{
                    if(e.key === "Enter"){
                        filterByRange()
                    }
                }}
                value={ range?.mxp ?? '' } />
        </FormGroup>
    )
}

export const Rating = () => {
    const [minRating, setMinRating] = useState<number>()
    return (
        <FormGroup label="Rating">
            <Button onClick={()=>{setMinRating(5)}} 
            className="bg-primary-foreground border-2 border-yellow-500 hover:border-yellow-600 flex w-full text-yellow-500 hover:text-yellow-600 transition-colors p-3 hover:bg-yellow-100 justify-between items-center">
                <div className="w-fit flex">
                    <Star /><Star /><Star /><Star /><Star />
                </div>
                <div className="w-fit">
                    <p className="self-end">5</p>
                </div>
                {
                    minRating === 5 &&
                    <Check />
                }
            </Button>
            <Button onClick={()=>{setMinRating(4)}} className="bg-primary-foreground border-2 border-yellow-500 hover:border-yellow-600 flex w-full text-yellow-500 hover:text-yellow-600 transition-colors p-3 hover:bg-yellow-100 justify-between items-center">
                <div className="w-fit flex">
                    <Star /><Star /><Star /><Star />
                </div>
                <div className="w-fit">
                    <p className="self-end">4 and above</p>
                </div>
                {
                    minRating === 4 &&
                    <Check />
                }
            </Button>
            <Button onClick={()=>{setMinRating(3)}} className="bg-primary-foreground border-2 border-yellow-500 hover:border-yellow-600 flex w-full text-yellow-500 hover:text-yellow-600 transition-colors p-3 hover:bg-yellow-100 justify-between items-center">
                <div className="w-fit flex">
                    <Star /><Star /><Star />
                </div>
                <div className="w-fit">
                    <p className="self-end">3 and above</p>
                </div>
                {
                    minRating === 3 &&
                    <Check />
                }
            </Button>
            <Button onClick={()=>{setMinRating(2)}} className="bg-primary-foreground border-2 border-yellow-500 hover:border-yellow-600 flex w-full text-yellow-500 hover:text-yellow-600 transition-colors p-3 hover:bg-yellow-100 justify-between items-center">
                <div className="w-fit flex">
                    <Star/><Star />
                </div>
                <div className="w-fit">
                    <p className="self-end"> 2 and above</p>
                </div>
                {
                    minRating === 2 &&
                    <Check />
                }
            </Button>
            <Button onClick={()=>{setMinRating(undefined)}} className="bg-primary-foreground border-2 border-yellow-500 hover:border-yellow-600 flex w-full text-yellow-500 hover:text-yellow-600 transition-colors p-3 hover:bg-yellow-100 justify-between items-center">Clear Rating</Button>
        </FormGroup>
                
    )
}

export const Location = () =>{
    return (
        <div className="w-full py-2 border-none bg-secondary rounded-sm">
            <div className='w-full border-none border-t px-2'>
                <div className="w-full text-xl">
                    <div className="flex justify-between items-center p-2">
                        <span>Location</span>
                    </div>
                </div>
            </div>
        </div>

    )
}

export const MobileCategories = ({categories}:{ categories: Category[]}) => (
    <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary h-fit max-h-full rounded-sm">
        <AccordionItem value="categories" className='w-full flex flex-col border-none border-t px-2 h-full'>
            <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm">
                <span>Categories</span> <ChevronDown/>
            </AccordionTrigger>
            <AccordionContent className="flex-1">
                <ScrollArea scrollHideDelay={3} className="w-full h-[20rem]">
                    <Accordion collapsible type='single' className='w-full border-none pr-4'>
                        {categories.map((cat, i) => (
                            <AccordionItem value={ ''+i+1 } key={ i+1 } className='w-full px-3 transition-colors hover:bg-background border-none rounded-sm'>
                                <AccordionTrigger className="w-full text-xl p-2 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm">{ cat.name }</AccordionTrigger>
                                <AccordionContent className='flex flex-col text-left'>
                                    {
                                        cat.sub_categories?.map((scat, sci)=>(
                                            <Link key={sci} className='flex p-2 rounded-sm hover:bg-secondary text-left transition-all' href={`/categories/${cat.slug}/${scat.slug}`}>
                                                <NavigationMenuLink>
                                                    { scat.name }
                                                </NavigationMenuLink>
                                            </Link>
                                        ))
                                    }
                                    <NavigationMenuLink>
                                        <Link className="w-full hover:text-prbg-primary/95hover:bg-primary/95 p-2 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm" href={`/categories/${cat.slug}`}>All { cat.name }</Link>
                                    </NavigationMenuLink>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        <NavigationMenuLink>
                            <Link className="w-full hover:text-prbg-primary/95hover:bg-primary/95 text-xl py-2 px-5 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm" href="/categories">All Categories</Link>
                        </NavigationMenuLink>
                    </Accordion>
                </ScrollArea>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const DesktopCategories = ({categories}:{ categories: Category[]}) => (
    <div className="rounded-sm w-full">
        <Link href={'/categories'} className="px-5 rounded-t-sm py-1 bg-primary hover:bg-primary/95 text-muted line-clamp-1 w-full block border-b text-lg">See all Categories</Link>
        {
            categories.map((cate, index) => (
                <SlideToLeft key={ index } title={ cate.name } className={index === categories.length-1 ? 'rounded-b-sm' : ''}>
                    {
                        (cate.sub_categories??[]).length  > 0 &&
                        <div className="w-full max-w-60 rounded-sm z-50 bg-background">
                            <Link href={`/categories/${cate.slug}`}>
                                <p className="px-5 py-1 line-clamp-1 bg-primary hover:bg-primary/95 text-muted rounded-t-sm w-full block border-b text-lg">
                                    See all in { cate.name}
                                </p> 
                            </Link>
                                {
                                    cate.sub_categories?.map((scate, ind)=>(
                                        <Link href={`/categories/${cate.slug}/${scate.slug}`} key={ ind } >
                                            <p className={`bg-primary text-muted px-5 w-full py-1 min-w-60 hover:bg-primary/95 line-clamp-1 ${ ind === (cate.sub_categories??[]).length-1 ? 'rounded-b-sm' : ''}`}>
                                                { scate.name }
                                            </p> 
                                        </Link>
                                    ))
                                }
                        </div>
                    }
                </SlideToLeft>
            ))
        }
    </div>
   
)

export const OrderBy = ({
    setter
}:{
    setter: (state: any)=>void
}) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    
    const [val, setVal] = useState<string>()
    const queryString = useSearch({ordby: val})

    useEffect(()=>{
        setter({ordby: val})
    }, [val, setter])
    
    useEffect(()=>{
        router.push(`${pathname}${queryString}`)
    }, [queryString, pathname, router])

    useEffect(()=>{
        const value = searchParams.get('ordby')
        if(!value){
            setVal(undefined)
            return
        }
        setVal(value)
    }, [searchParams])
    return (
        <FormGroup label="Order By" className="h-fit sm:h-fit py-5 max-w-[90%]" >
            <RadioGroup value={ val } onValueChange={(e)=>{ setVal(e) }} className='flex flex-col gap-5 w-full h-fit px-8'>
                <div className="flex items-center space-x-2 text-xl w-full">
                    <RadioGroupItem value="dist_meters" id={`r-dist_meters`} />
                    <Label htmlFor={`r-dist_meters`} className=" text-xl">Distance</Label>
                </div>
                <div className="flex items-center space-x-2 text-xl w-full">
                    <RadioGroupItem value="price" id={`r-price`} />
                    <Label htmlFor={`r-price`} className=" text-xl">Price</Label>
                </div>
            </RadioGroup>
        </FormGroup>
    )
}

export const Distance = ({
    setter
}:{
    setter: (state: any)=>void
}) => {
    const [val, setVal] = useState<string>()
    const [units, setUnits] = useState<"Meters" | "Kilometers" | "Miles">("Meters")
    const [error, setError] = useState<string>()

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(()=>{
        const u = localStorage.getItem('units')
        setUnits(u ? u as "Meters" | "Kilometers" | "Miles" : "Meters")
    }, [])

    const fromMeters = useMemo(() => {
        const value = searchParams.get('dist')
        if(!value){
            return undefined
        }

        switch (units) {
            case "Kilometers":
                return (toNumber(value)/1000).toString()

            case "Miles":
                return (toNumber(value)/1600).toString()
        
            default:
                return value;
        }
        
    }, [searchParams, units])
    
    useEffect(()=>{ 
        setVal(fromMeters)
    }, [fromMeters])
    
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
        setter({dist: toMeters(toNumber(val), units)})
    }, [val, units, setter])
    
    const queryString = useSearch({dist: toMeters(toNumber(val), units)})
                    
    useEffect(()=>{
        if(error && toMeters(toNumber(val), units) >= 500){
            setError(undefined)
        }
    }, [val, units, error])
        
    const filterbyDistance = () => {
        if(!val || val.trim().length === 0){
            setError(`Please enter valid distance in ${units}`)
            return router.push(`${pathname}${queryString}`)
        }
        let numMeters = toMeters(toNumber(val), units)
        if(numMeters < 500){
            switch (units) {
                case "Kilometers":
                    setError("The distnace in Kilometers must be at least 0.5Km")
                    break;
                case "Meters":
                    setError("The distnace in Meters must be at least 500M")
                    break;
                case "Miles":
                    setError("The distnace in Miles must be at least 0.5miles")
                    break;
                default:
                    setError("Unkown units");
            }
            return router.push(`${pathname}${queryString}`)
        }
        router.push(`${pathname}${queryString}`)
        
    }
    
    return (
        <FormGroup label={`Distance in ${units}`} className="h-fit sm:h-fit p-5 max-w-[90%]">
            {
                error &&
                <p className=" text-destructive flex gap-3 items-start justify-start py-2">
                    <CircleAlert />
                    <span className="self-center">{ error }</span>
                </p>
            }
            <div className={`w-full flex text-xl ${ error && 'border-red-500'}`}>
                <Select onValueChange={(u)=>{
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
                    } }
                    onKeyDownCapture={ (e) => {
                        if(e.key === "Enter"){
                            filterbyDistance()
                        }
                    }}
                    placeholder="Distance here" 
                    className={`w-full rounded-none text-lg px-2`} />
            </div>
        </FormGroup>
    )
}

