"use client"

import React, { ReactNode, useEffect, useState } from 'react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Container from '@/components/Container'
import Image from 'next/image'
import { Barcode, Bell, CreditCard, Home, Send, Settings, Store, Trash, User, Weight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { DASHBOARD_LINKS } from '@/lib/defaults'
import LinkItem from './LinkItem'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
  

type Props = {
    children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
    const pathname = usePathname()
    const title = DASHBOARD_LINKS.find(link => link.url === pathname)?.title
    const setPanelSize = (size: number, changeSize: number) => {
        const panel = document.querySelector('.nav-panel')
        const hiddables = document.querySelectorAll('.hiddable')
        if(size < changeSize){
            panel?.classList.add('max-w-20')
            hiddables.forEach((elem) => {
                elem.classList.remove('md:flex')
                elem.classList.add('hidden')
                const parent = elem.parentElement 
                parent?.classList.add('mx-auto')
            })
        }
        if(size >= changeSize){
            panel?.classList.remove('max-w-20')
            hiddables.forEach((elem) => {
                elem.classList.add('md:flex')
                elem.classList.remove('hidden')
                const parent = elem.parentElement 
                parent?.classList.remove('mx-auto')
            })
        }
    }
    const getPanelWidth = () => {
        const nav_panel_width = document.querySelector('.nav-panel')?.clientWidth || 0
        const page_panel_width = document.querySelector('.page-panel')?.clientWidth || 0
        
        return { nav_panel_width, page_panel_width }
    }
    
    const handleResize = (e: number) => {
        const { nav_panel_width, page_panel_width } = getPanelWidth()
        const width = e*(nav_panel_width + page_panel_width)/100
        setPanelSize(width, 215)
    }

    const [dateTime, setDateTime] = useState<{date: string, time: string}>()

    useEffect(()=>{
        setTimeout(()=>{
            setDateTime({
                date: new Date().toDateString(),
                time: new Date().toLocaleTimeString()
            })
        }, 1000)
    }, [dateTime])

    /**
     * Try to figure out how we can implement 
     * the resize behaviour on resize and scroll
     */
    useEffect(()=>{
        // const { nav_panel_width, page_panel_width } = getPanelWidth()
        
        // window.onresize = ()=> {
        //     const width = (nav_panel_width + page_panel_width)*20/100
        //     console.log(width, nav_panel_width, page_panel_width)
        //     // setPanelSize(width, 215)
        // } 
            
    }, [])
  return (
    <Container clasName=''>
        <ResizablePanelGroup direction="horizontal" className='min-h-[86vh] border border-primary'>
            <ResizablePanel onResize={ handleResize } minSize={5} defaultSize={25} maxSize={30}
                className='bg-primary nav-panel text-primary-foreground hidden md:block min-w-20 min-h-[90vh]'>
                <div className="w-full h-full">
                    <div className="p-3 border-b-2 h-fit flex flex-col items-center">
                        <Image src={'/profile.jpg'} alt='Profile Image' height={100} width={ 100 } 
                            className='w-full h-auto rounded-full max-w-16 mx-auto'/>
                        
                        <h1 className="w-fit text-xl font-bold hiddable line-clamp-1 overflow-hidden">Egessa David</h1>
                        <p className="w-fit hiddable overflow-hidden">davy.kyute@gmail.com</p>
                    </div>
                    <div className="flex flex-col space-y-1 p-3">
                        {
                            DASHBOARD_LINKS.map((link, index)=>(
                                <TooltipProvider key={index}>
                                    <Tooltip delayDuration={2}>
                                        <TooltipTrigger>
                                            <LinkItem key={index} href={link.url} name={link.display_name} Icon={link.icon}/>
                                        </TooltipTrigger>
                                        <TooltipContent align='end' side='bottom'>
                                            <p>{ link.title }</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))
                        }
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle className='border-r-2 border-primary hidden md:block' />
            <ResizablePanel className='page-panel w-full' defaultSize={75} minSize={ 70 }>
                <div className="px-5 pt-3 pb-1 flex justify-between items-center border-b border-primary">
                    <h1 className='uppercase font-bold text-2xl text-primary'>{ title }</h1>
                    {
                        dateTime &&
                        <Button variant={'outline'} className='hidden text-primary sm:block'>{ dateTime?.date + " " + dateTime?.time }</Button>
                    }
                </div>
                { children }
            </ResizablePanel>
        </ResizablePanelGroup>
    </Container>
  )
}