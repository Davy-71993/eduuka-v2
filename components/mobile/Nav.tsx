"use client"

import React from 'react'
import { Menu, Plus, User } from 'lucide-react'
import { 
    NavigationMenu, 
    NavigationMenuContent, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
    NavigationMenuTrigger,
} from '../ui/navigation-menu'
import Link from 'next/link'
import { Button } from '../ui/button'
import { MobileCategories, Location, PriceRange, Rating } from '../Fiters'
import { categories } from '@/lib/dami-api'
import { usePathname } from 'next/navigation'
import { DASHBOARD_LINKS } from '@/lib/defaults'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { MobileLinkItem } from '@/app/(private)/me/LinkItem'
import { ScrollArea } from '../ui/scroll-area'

type Props = {
    authenticated: boolean,
    userData?: any
}

export default function Nav({ authenticated, userData }: Props) {

    const pathname = usePathname()


  return (
    <NavigationMenu className='w-full'>
        <NavigationMenuList className='w-full'>
            <NavigationMenuItem>
                <NavigationMenuTrigger className='hover:bg-primary-foreground hover:text-primary border-2 border-primary-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 sm:text-2xl font-bold'>
                    <User/>
                </NavigationMenuTrigger>
                <NavigationMenuContent className='flex flex-col min-w-[18rem] self-center'>
                    {
                        authenticated ?

                            <div className='w-full '>
                                <Link href={'/me'}>
                                    <h2 className='border-b p-2 text-center text-primary'>My Account</h2>
                                </Link>
                            </div>

                        :
                            <>
                            <NavigationMenuLink asChild className='w-full my-1 p-2 rounded-md text-center bg-secondary'>
                                <Link href={'/signin'}>Signin</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild className='w-full my-1 p-2 rounded-md text-center bg-secondary'>
                                <Link href={'/signup'}>Signup</Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild className='w-full my-1 p-2 rounded-md text-center bg-primary text-secondary'>
                                <Link href={'/me/ads/create'} className='w-full flex items-center justify-center space-x-3'><Plus/><span>Post Ad</span></Link>
                            </NavigationMenuLink>
                            </>

                    }
                </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem className='md:hidden w-full'>
                <NavigationMenuTrigger className='hover:bg-background hover:text-primary border-2 border-background rounded-full h-10 w-10 sm:h-12 sm:w-12 sm:text-2xl font-bold'>
                    <Menu/>
                </NavigationMenuTrigger>
                <NavigationMenuContent className='flex flex-col min-w-[18.5rem] h-fit max-h-[80vh] w-full'>
                    {
                        pathname.startsWith('/me')?(
                            <>
                            <div className="flex flex-col space-y-1 p-3">
                                {
                                    DASHBOARD_LINKS.map((link, index)=>(
                                        <NavigationMenuLink key={index} >
                                            <MobileLinkItem href={link.url} name={link.display_name} Icon={link.icon}/>
                                        </NavigationMenuLink>
                                                
                                    ))
                                }
                            </div>
                            </>
                        ):(
                            <ScrollArea className='h-[80vh]'>
                                <h1 className="text-center text-xl border-b p-2">Filter ads by:</h1>
                                <div className='flex h-max flex-col space-y-3 p-3'>
                                    <MobileCategories categories={categories} />
                                    <Location />
                                    <PriceRange />
                                    <Rating />
                                </div>
                            </ScrollArea>
                        )
                    }
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}