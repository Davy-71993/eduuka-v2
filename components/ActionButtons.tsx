"use client"

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useSearchQuery } from '@/lib/hooks'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

type Props = {
    phone?: string, 
    ad_seller?: string
}

export default function ActionButtons({ phone, ad_seller }: Props) {
    const searchParams = useSearchParams()
    const params = useParams()
    const [chatsHeads, setChatHeads] = useState<string[]>()
    const pathName = usePathname()
    const [showNumber, setShowNumber] = useState(false)

    const queryString = useSearchQuery({chats: chatsHeads?.length ? chatsHeads.length : 1}, searchParams)

    const ad_id = params['aid'] as string

    useEffect(()=>{
        const activeChats = localStorage.getItem('chats')
        if(activeChats){
            setChatHeads(JSON.parse(activeChats))
        }
        
    }, [])

    useEffect(()=>{
        if(chatsHeads){
            localStorage.setItem('chats', JSON.stringify(chatsHeads))
        }
    }, [chatsHeads])

    const updateChatString = async() => {
        const supabase = createClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if(error || !user || !ad_id) {
            alert("You need to login before you can chat with the seller")
            return
        }
        if(user.id === ad_seller){
            alert("You can not message your self.")
            return
        }
        const str = `${ad_id}_${user.id}`
        if(chatsHeads?.includes(str)){
            setChatHeads([...chatsHeads])
            return
        }
        if(chatsHeads?.length){
            setChatHeads([...chatsHeads, str])
        }else{
            setChatHeads([str])
        }
    }
    
    if(!ad_id){
        return null
    }

  return (
    <div className="flex flex-col pb-5 px-6">
        <Button onClick={ ()=> { setShowNumber(!showNumber) } } className='w-full font-bold mt-5' >{ showNumber ? phone : 'Show Contact'}</Button>
        <Link href={`${pathName}${queryString}`}>
            <Button onClick={ updateChatString } variant="outline" className='w-full font-bold mt-5 border-primary text-primary' >Start Chat</Button>
        </Link>
    </div>
  )
}