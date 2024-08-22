"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Home, LogOut, Menu, Plus, User } from 'lucide-react'
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
import { usePathname } from 'next/navigation'
import { DASHBOARD_LINKS } from '@/lib/defaults'
import { MobileLinkItem } from '@/app/(private)/me/LinkItem'
import { Category } from '@/lib/types'
import { AppContext } from '@/context/Appcontext'
import MobileFilters from './MobileFilters'

type Props = {
    categories: Category[]
}

export default function Nav({ categories }: Props) {

    const pathname = usePathname()
    const { supabase, me, setState } = useContext(AppContext)
    const [authenticated, setAuthenticated] = useState<boolean>(false)

    useEffect(()=>{
        setAuthenticated(!!me)
    }, [me])

    const logout = async() => {
        if(!supabase){
            console.log("No supabase client initiated")
            return
        }
        const { error } = await supabase.auth.signOut()
        if(!error){
            setState({key: 'me', value: null})
            return
        }
        console.log(error)
    }

  return (
    <NavigationMenu className='w-full'>
        <NavigationMenuList className='w-full'>
            <NavigationMenuItem>
                <NavigationMenuTrigger className='hover:bg-primary-foreground hover:text-primary border-2 border-primary-foreground rounded-full h-10 w-10 sm:h-12 sm:w-12 sm:text-2xl font-bold'>
                    <User/>
                </NavigationMenuTrigger>
                <NavigationMenuContent className='flex flex-col w-full self-center p-5'>
                    {
                        authenticated ?
                            <>
                                <NavigationMenuLink asChild className='w-full'>
                                    <Link href={'/me'}>
                                        <h2 className='border-b p-2 text-center text-primary mb-3'>My Account</h2>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild className='w-full'>
                                    <Link href={'/me'}>
                                        <h2 className='p-2 text-primary hover:bg-primary/10 rounded-sm text-lg flex space-x-5 w-full px-5 transition-colors items-center'><Home /><span>Dashboard</span></h2>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild className='w-full'>
                                    <Link href={'/me/ads/create'}>
                                        <h2 className='p-2 text-primary hover:bg-primary/10 rounded-sm text-lg flex space-x-5 w-full px-5 transition-colors items-center'><Plus /><span>Post Ad</span></h2>
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild className='w-full'>
                                        <Button onClick={ logout } className='p-2 text-primary-foreground bg-red-500 hover:bg-red-600 rounded-sm text-lg flex space-x-5 justify-center w-full px-5 mt-5 transition-colors items-center'>
                                            <LogOut /><span>Logout</span>
                                        </Button>
                                </NavigationMenuLink>
                            </>

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
                <NavigationMenuContent className='flex flex-col h-fit max-h-[80vh] w-[90vw] max-w-96'>
                    {
                        pathname.startsWith('/me')?(
                            <>
                            <div className="flex flex-col gap-1 p-3">
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
                            <MobileFilters categories={ categories } />
                        )
                    }
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
  )
}