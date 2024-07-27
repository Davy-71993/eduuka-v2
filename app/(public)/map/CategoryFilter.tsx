import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useSearchQuery } from '@/lib/hooks'
import { Category } from '@/lib/types'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
    categories: Category[]
}

export default function CategoryFilter({ categories }: Props) {

    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [cateId, setCateId] = useState('')
    const [sCateId, setSCateId] = useState('')
    
    const query = useSearchQuery({c: cateId, sc: sCateId}, searchParams)

    useEffect(()=>{ 
        router.push(`/map${query}`)
    }, [cateId, sCateId, query])

    return (
        <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary h-fit max-h-full rounded-sm">
            <AccordionItem value="categories" className='w-full flex flex-col border-none border-t px-2 h-full'>
                <AccordionTrigger className="w-full text-xl p-2 flex justify-between items-center hover:bg-background transition-all rounded-sm">
                    <span>Categories</span>
                </AccordionTrigger>
                <AccordionContent className="flex-1">
                    <Accordion collapsible type='single' className='w-full border-none pr-4'>
                        {categories.map((cat, i) => (
                            <AccordionItem value={ ''+i+1 } key={ i+1 } className='w-full px-3 py-2 transition-colors hover:bg-background border-none rounded-sm'>
                                <AccordionTrigger 
                                    onClick={()=>{ setCateId(cat.id ?? ''); setSCateId('')}}
                                    className="w-full text-xl p-2 justify-between items-center text-left line-clamp-1 hover:bg-secondary transition-all rounded-sm flex">
                                    { cat.name }
                                </AccordionTrigger>
                                <AccordionContent className='flex flex-col text-left'>
                                    {
                                        cat.sub_categories?.map((scat, sci)=>(
                                            <Button 
                                                key={ sci } 
                                                onClick={()=>{ setSCateId(scat?.id ?? '') }}
                                                className='bg-transparent text-foreground justify-start hover:text-background transition-colors'>{ scat.name }</Button>
                                        ))
                                    }
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}