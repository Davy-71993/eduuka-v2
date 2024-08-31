"use client"

import React, { useCallback, useRef, useState } from "react"
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { Category, SubCategory } from "@/lib/types"
import { AccordionTrigger } from "@radix-ui/react-accordion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import SlideToLeft from "../animated/SlideToLeft"
import { ScrollArea } from "../ui/scroll-area"


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
        <div className={`rounded-sm bg-primary w-full h-[70vh] relative ${subOpen ? 'rounded-r-none' : ''}`}>
                    <Link href={'/categories'} className="p-2 h-[5vh] flex items-center line-clamp-1 w-full transition-colors border-b text-lg">
                        <p className="px-5 py-1 w-full text-primary-foreground transition-colors line-clamp-1 rounded-sm hover:bg-primary-foreground hover:text-primary">
                            See all Categories
                        </p>
                    </Link>
            <div ref={ panelRef } className={`h-[65vh] w-full py-3 overflow-hidden`}>
                <div className="h-max w-full pt-1">
                    {
                        categories.map((cate, index) => (
                            <SlideToLeft onOpen={ setSubOpen } key={ index } title={ cate.name } className={`${index === categories.length-1 ? 'rounded-b-sm' : ''}`}>
                                {
                                    (cate.sub_categories??[]).length  > 0 &&
                                        <div className="w-full z-50">
                                            <Link href={`/categories/${cate.slug}`} className="p-2 h-[5vh] flex items-center line-clamp-1 w-full transition-colors border-b text-lg">
                                                <p className="px-5 py-1 text-primary-foreground transition-colors line-clamp-1 rounded-sm hover:bg-primary-foreground hover:text-primary">
                                                    See all in { cate.name}
                                                </p> 
                                            </Link>
                                            <ScrollArea className="h-[65vh] py-3 w-full bg-primary">
                                            {
                                                cate.sub_categories?.map((scate, ind)=>(
                                                    <Link href={`/categories/${cate.slug}/${scate.slug}`} key={ ind }>
                                                        <p className="px-5 mx-auto py-1 w-[90%] text-primary-foreground transition-colors line-clamp-1 rounded-sm hover:bg-primary-foreground hover:text-primary">
                                                            { scate.name }
                                                        </p> 
                                                    </Link>
                                                ))
                                            }
                                            </ScrollArea>
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




