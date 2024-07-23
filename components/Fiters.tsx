"use client"

import React, { useEffect, useState } from "react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Category, SubCategory } from "@/lib/types"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import { Check, ChevronDown, Star } from "lucide-react"
import LocationSelector from "@/components/LocationSelector"
import { ScrollArea } from "./ui/scroll-area"
import Link from "next/link"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { Button } from "./ui/button"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { toNumber } from "@/lib/utils"


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

export const PriceRange = ({ setter, error }: { setter?: (range?: {min?: string, max?: string}) => void, error?: string }) => {
    const [ range, setRange ] = useState<{min?: string, max?: string}>()
    useEffect(()=>{ setter && setter(range)}, [range])
    return (
        <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
            <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
                <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Price Range</span><ChevronDown/></AccordionTrigger>
                <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center'>
                    {
                        error &&
                        <p className="text-red-500">{ error }</p>
                    }
                    <Input 
                        placeholder="Min" 
                        type="number"
                        value={ range?.min ?? '' } 
                        onChange={ (e) => { setRange({...range, min: e.target.value})} }
                        className="px-2 h-fit py-2"/>
                    <p>-to-</p> 
                    <Input 
                        placeholder="Max" 
                        type="number"
                        className="px-2 h-fit py-2"
                        onChange={ (e) => { setRange({...range, max: e.target.value})} }
                        value={ range?.max ?? '' } />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export const Rating = ({ setter }: { setter?: (val?: number)=> void }) => {
    const [minRating, setMinRating] = useState<number>()
    useEffect(()=>{ setter && setter(minRating)}, [minRating])
    return (
        <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
            <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
                <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Ad Ratings</span><ChevronDown/></AccordionTrigger>
                <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center'>
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
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
                    <LocationSelector />
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
                                        <Link className="w-full hover:text-blue-500 p-2 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm" href={`/categories/${cat.slug}`}>All { cat.name }</Link>
                                    </NavigationMenuLink>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                        <NavigationMenuLink>
                            <Link className="w-full hover:text-blue-500 text-xl py-2 px-5 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm" href="/categories">All Categories</Link>
                        </NavigationMenuLink>
                    </Accordion>
                </ScrollArea>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const DesktopCategories = ({categories}:{ categories: Category[]}) => (
    <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary h-fit max-h-full rounded-sm">
        <AccordionItem value="categories" className='w-full flex flex-col border-none border-t px-2 h-full'>
            <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm">
                <span>Categories</span> <ChevronDown/>
            </AccordionTrigger>
            <AccordionContent className="flex-1">
                <Accordion collapsible type='single' className='w-full border-none pr-4'>
                    {categories.map((cat, i) => (
                        <AccordionItem value={ ''+i+1 } key={ i+1 } className='w-full px-3 transition-colors hover:bg-background border-none rounded-sm'>
                            <AccordionTrigger className="w-full text-xl p-2 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm">{ cat.name }</AccordionTrigger>
                            <AccordionContent className='flex flex-col text-left'>
                                {
                                    cat.sub_categories?.map((scat, sci)=>(
                                        <Link key={sci} className='flex p-2 rounded-sm hover:bg-secondary text-left transition-all' href={`/categories/${cat.slug}/${scat.slug}`}>
                                            { scat.name }
                                        </Link>
                                    ))
                                }
                                <Link className="w-full hover:text-blue-500 p-2 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm" href={`/categories/${cat.slug}`}>All { cat.name }</Link>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                    <Link className="w-full hover:text-blue-500 text-xl py-2 px-5 justify-between items-center text-left line-clamp-1 hover:bg-background transition-all rounded-sm" href="/categories">All Categories</Link>
                </Accordion>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const OrderBy = ({ setter }: { setter: (val: string)=> void }) => {
    const [val, setVal] = useState('dist_meters')
    const handleSetter = (e: string) => {
        setVal(e)
    }
    useEffect(()=>{
        setter(val)
    }, [val])
    return (
        <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
            <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
                <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Order By</span><ChevronDown/></AccordionTrigger>
                <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center w-full'>
                    <RadioGroup value={ val } onValueChange={(e)=>{ handleSetter(e) }} className='flex flex-col gap-5 w-full h-fit px-8'>
                        <div className="flex items-center space-x-2 text-xl w-full">
                            <RadioGroupItem value="dist_meters" id={`r-dist_meters`} />
                            <Label htmlFor={`r-dist_meters`} className=" text-xl">Distance</Label>
                        </div>
                        <div className="flex items-center space-x-2 text-xl w-full">
                            <RadioGroupItem value="price" id={`r-price`} />
                            <Label htmlFor={`r-price`} className=" text-xl">Price</Label>
                        </div>
                    </RadioGroup>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export const Distance = ({ setter }: { setter: (e?: string)=> void }) => {
    const [val, setVal] = useState<string>()
    const [error, setError] = useState(false);
    
    useEffect(()=>{  
        if(toNumber(val) >= 500){
            setError(false)
            setter(val)
            return
        }
        setError(true)
        setVal(undefined)
        setter(undefined)
    }, [val])
    return (
        <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
            <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
                <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Max Distance</span><ChevronDown/></AccordionTrigger>
                <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center w-full'>
                    <p className="text-lg text-muted-foreground px-3">
                        Please enter the distance in meters only.
                    </p>
                    <Input 
                        type="number" 
                        value={ val }
                        onChange={ (e)=>{setVal(e.target.value)} }
                        placeholder="Enter the distance here" 
                        className={`w-full border text-xl ${ error && 'border-red-500'}`} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

