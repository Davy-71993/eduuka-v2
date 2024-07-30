"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import LoadingDots from './LoadingDots'
import { MenuItem } from '@/lib/types'
import { fetchMenuItems } from '@/lib/actions/db_actions'
import { displayCurrencyAndPrice } from '@/lib/utils'

type Props = {
    ad_id?: string,
    ad_currency: string,
    requested_currency: string
}

export default function PriceMenu({ ad_id, ad_currency, requested_currency }: Props) {
    const [items, setItems] = useState<MenuItem[]>()

    useEffect(()=>{
        (async()=>{
            if(!ad_id) return;
            const menu_items = await fetchMenuItems(ad_id)
            setItems(menu_items)
        })()
    }, [ad_id])

   
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="bg-primary-foreground border-2 border-primary hover:bg-primary text-primary w-fit hover:text-primary-foreground font-bold text-lg md:text-xl">
                View Prices
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Prices</DropdownMenuLabel>
            {
                !items
                ?
                <Button className='w-full bg-transparent border-none'>
                    <LoadingDots />
                </Button>
                :
                <>
                    {
                        items.map((menu, index)=>(
                            <DropdownMenuItem key={ index }>
                                <div className="flex gap-3">
                                    <p className="text-muted-foreground w-fit p-2">{ menu.item }</p>
                                    <p className="text-muted-foreground w-fit p-2">{ displayCurrencyAndPrice(ad_currency, requested_currency, `${menu.price}`) }</p>
                                </div>
                            </DropdownMenuItem>

                        ))
                    }
                </>
            }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}