"use client"

import React from "react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Category, SubCategory } from "@/lib/types"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronDown, Star } from "lucide-react"
import LocationSelector from "@/components/LocationSelector"
import { ScrollArea } from "./ui/scroll-area"
import Link from "next/link"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu"


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

export const PriceRange = () => (
    <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
        <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
            <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Price Range</span><ChevronDown/></AccordionTrigger>
            <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center'>
               <Input placeholder="Min" className="px-2 h-fit py-2"/><p>-to-</p> <Input placeholder="Max" className="px-2 h-fit py-2"/>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const Rating = () => (
    <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
        <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
            <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm"><span>Ad Ratings</span><ChevronDown/></AccordionTrigger>
            <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center'>
                <div className="flex w-full rounded-sm text-yellow-500 transition-colors duration-100 p-3 hover:bg-background justify-start items-center">
                    <div className="w-fit flex">
                        <Star /><Star /><Star /><Star /><Star />
                    </div>
                    <div className="w-full text-right">
                        <p className="self-end">5</p>
                    </div>
                </div>
                <div className="flex w-full rounded-sm text-yellow-500 transition-colors duration-100 p-3 hover:bg-background justify-start items-center">
                    <div className="w-fit flex">
                        <Star /><Star /><Star /><Star />
                    </div>
                    <div className="w-full text-right">
                        <p className="self-end">4 and above</p>
                    </div>
                </div>
                <div className="flex w-full rounded-sm text-yellow-500 transition-colors duration-100 p-3 hover:bg-background justify-start items-center">
                    <div className="w-fit flex">
                        <Star /><Star /><Star />
                    </div>
                    <div className="w-full text-right">
                        <p className="self-end">3 and above</p>
                    </div>
                </div>
                <div className="flex w-full rounded-sm text-yellow-500 transition-colors duration-100 p-3 hover:bg-background justify-start items-center">
                    <div className="w-fit flex">
                        <Star/><Star />
                    </div>
                    <div className="w-full text-right">
                        <p className="self-end"> 2 and above</p>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
)

export const Location = () =>(
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

