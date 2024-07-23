"use client"

import React, { ReactNode, useEffect, useState } from 'react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { DASHBOARD_LINKS } from '@/lib/defaults'
import LinkItem from './LinkItem'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getProfile } from '@/lib/actions/db_actions'
  

type Props = {
    children: ReactNode
}

export default function DashboardLayout({ children }: Props) {

     /**
     * Try to figure out how we can implement 
     * the resize behaviour on resize and scroll
     */
    
    const pathname = usePathname()
    const router = useRouter()
    useEffect(()=>{
      (async()=>{
       const profile = await getProfile()
       if(!profile){
           return router.push('/me/create-profile')
       }
      })()     
   }, [pathname])
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
    

  return (
    <Container clasName='pt-2'>
        <ResizablePanelGroup direction="horizontal" className='min-h-[80vh] rounded-sm'>
            <ResizablePanel onResize={ handleResize } minSize={5} defaultSize={25} maxSize={30}
                className='bg-secondary nav-panel text-secondary-foreground hidden md:block min-w-20 min-h-[90vh] rounded-l-sm'>
                <div className="flex flex-col space-y-1 mt-12 p-3">
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
            </ResizablePanel>
            <ResizableHandle className='border-r-2 border-secondary hidden md:block' />
            <ResizablePanel className='page-panel w-full' defaultSize={75} minSize={ 70 }>
                <div className="px-2 sm:px-5  h-16 flex justify-end sm:justify-between items-center bg-secondary">
                    <h1 className='hidden sm:block uppercase font-bold text-2xl text-primary'>{ title }</h1>
                    {
                        dateTime &&
                        <Button variant={'outline'} className='text-primary'>{ dateTime?.date + " " + dateTime?.time }</Button>
                    }
                </div>
                { children }
            </ResizablePanel>
        </ResizablePanelGroup>
    </Container>
  )
}