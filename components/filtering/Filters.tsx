"use client"

import React, { useCallback, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Category, SubCategory } from "@/lib/types"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import SlideToLeft from "../animated/SlideToLeft"


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


export const DesktopCategories = ({categories}:{ categories: Category[]}) => {
    const [subOpen, setSubOpen] = useState(false)
    const [scrollPosition, setScrollPosition] = useState<"top" | "bottom">('top')
    const [subScrollPosition, setSubScrollPosition] = useState<"top" | "bottom">('top')
    const panelRef = useRef<HTMLDivElement>(null)
    const subPanelRef = useRef<HTMLDivElement>(null)
    const handleScroll = useCallback(()=>{
        if(!panelRef.current){
            return
        }
        if(scrollPosition === 'top'){
            panelRef.current.scrollTo({
                behavior: "smooth",
                top: window.innerHeight*(65/100)
            })
            setScrollPosition('bottom')
        }else{
            panelRef.current.scrollTo({
                behavior: "smooth",
                top: 0
            })
            setScrollPosition('top')
        }
    }, [scrollPosition])
    const handleSubScroll = useCallback(()=>{
        if(!subPanelRef.current){
            return
        }
        if(subScrollPosition === 'top'){
            subPanelRef.current.scrollTo({
                behavior: "smooth",
                top: window.innerHeight*(65/100)
            })
            setSubScrollPosition('bottom')
        }else{
            subPanelRef.current.scrollTo({
                behavior: "smooth",
                top: 0
            })
            setSubScrollPosition('top')
        }
    }, [subScrollPosition])
    return(
        <div className="rounded-sm w-full h-[65vh] relative">
            <div ref={ panelRef } className={`h-[65vh] w-full overflow-hidden rounded-sm bg-primary/95 ${subOpen ? 'rounded-r-none' : ''}`}>
                <div className="h-max">
                    <Link href={'/categories'} className="px-5 rounded-t-sm py-1 text-muted line-clamp-1 w-full hover:bg-primary transition-colors border-b text-lg">See all Categories</Link>
                    {
                        categories.map((cate, index) => (
                            <SlideToLeft onOpen={ setSubOpen } key={ index } title={ cate.name } className={index === categories.length-1 ? 'rounded-b-sm' : ''}>
                                {
                                    (cate.sub_categories??[]).length  > 0 &&
                                    <div ref={subPanelRef} className="w-full max-w-60 relative overflow-hidden z-50">
                                        <Link href={`/categories/${cate.slug}`}>
                                            <p className="px-5 py-1 line-clamp-1 text-muted w-full border-b hover:bg-primary transition-colors text-lg">
                                                See all in { cate.name}
                                            </p> 
                                        </Link>
                                        {
                                            cate.sub_categories?.map((scate, ind)=>(
                                                <Link href={`/categories/${cate.slug}/${scate.slug}`} key={ ind } >
                                                    <p className={`text-muted px-5 w-full hover:bg-primary transition-colors py-1 min-w-60 line-clamp-1`}>
                                                        { scate.name }
                                                    </p> 
                                                </Link>
                                            ))
                                        }
                                        {
                                            cate.slug === 'services' &&
                                            <Button 
                                                className={`absolute rounded-none px-5 text-teal-300 hover:text-teal-200 ${ subScrollPosition === 'top' ? 'bottom-0 rounded-b-sm' : 'top-0 rounded-t-sm' } justify-between left-0 w-full bg-primary text-base font-thin`}
                                                onClick={ handleSubScroll }
                                            >
                                                <span>
                                                    {
                                                        subScrollPosition === 'top' 
                                                        ? `More ${cate.name}`
                                                        : "Back to Top"
                                                    }
                                                </span>
                                                    {
                                                        subScrollPosition === 'top' 
                                                        ? <ChevronDown /> 
                                                        : <ChevronUp />
                                                    }
                                                
                                            </Button>
                                        }
                                    </div>
                                }
                            </SlideToLeft>
                        ))
                    }
                </div>
            </div>
            <Button 
                className={`absolute rounded-none px-5 text-teal-300 hover:text-teal-200 ${ scrollPosition === 'top' ? 'bottom-0 rounded-b-sm' : 'top-0 rounded-t-sm' } justify-between left-0 w-full bg-primary text-base font-thin`}
                onClick={ handleScroll }
            >
                <span>
                    {
                        scrollPosition === 'top' 
                        ? "More Categories"
                        : "Back to Top"
                    }
                </span>
                    {
                        scrollPosition === 'top' 
                        ? <ChevronDown /> 
                        : <ChevronUp />
                    }
                
            </Button>
        </div>
       
    )
} 




