"use client"

import React, { useEffect, useState } from 'react'
import { Accordion } from './ui/accordion'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import ChatHead from './ChatHead'
import { useSearchQuery } from '@/lib/hooks'


export default function Chat() {
    const pathName = usePathname()
    const searchParams  = useSearchParams()
    const router = useRouter()

    const [chatHeads, setChatHeads] = useState<string[]>()
    const queryString = useSearchQuery({chats: chatHeads?.length!-1}, searchParams)

    useEffect(()=>{
        const chats = localStorage.getItem('chats')
        if(chats){
            setChatHeads(JSON.parse(chats))
        }
    }, [pathName, searchParams])
    
    const deleteChathead = (newString: string) => {
        const newHeads = chatHeads?.filter(head => head !== newString)
        localStorage.setItem('chats', JSON.stringify(newHeads))
        setChatHeads(newHeads)

        router.push(`${pathName}${queryString}`)
        
    }

    if(!chatHeads?.length) return null

    return (
        <div className='fixed bottom-0 right-0 p-5 w-full max-w-96 sm:p-10'>
            <Accordion type="single" collapsible className='flex flex-col gap-5'>
            {
                chatHeads.map((head, index) =>(
                    <ChatHead key={ index } head={ head } deleteChatHead={()=>{ deleteChathead(head) }}/>
                ))
            }
            </Accordion>
        </div>
    )
}