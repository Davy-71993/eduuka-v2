import React, { useEffect, useState } from 'react'
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { X } from 'lucide-react'
import { fetchMessages, getAdByID } from '@/lib/actions/db_actions'
import { Ad, Message } from '@/lib/types'
import { createClient } from '@/lib/supabase/client'
import ChatBoard from '@/app/(private)/me/chats/(parts)/ChatBoard'
import LoadingDots from './LoadingDots'

type Props = {
    head: string,
    deleteChatHead: ()=>void
}

export default function ChatHead({ head, deleteChatHead }: Props) {
    const ad_id = head.split("_")[0]
    const me = head.split("_")[1]
    const supabase = createClient()

    const [messages, setMessages] = useState<Message[]>([])
    const [ad, setAd] = useState<Ad>()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        getChatMassges()
    }, [])

    useEffect(()=>{
        const channels = supabase.channel(head)
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'chats' },
            (payload) => {
                const { ad_id, body, sender_id, recipient_id } = payload.new
                const msg = { ad_id, body, sender_id, recipient_id }
                setMessages([...messages, msg])
            }
        )
        .subscribe()

        return ()=>{
            channels.unsubscribe()
        }
    }, [messages])

    const getChatMassges = async() =>{
        setLoading(true)
        const msgs = await fetchMessages(ad_id)
        const ad = await getAdByID(ad_id)
        setMessages(msgs)
        setAd(ad)
        setLoading(false)
    }

  return (
    <AccordionItem value={ head } className="bg-background w-full rounded-sm shadow-lg border border-primary overflow-hidden">
        <div className="flex gap-3 px-3 items-center w-full justify-between">
            {
                ad?.name 
                ?
                <AccordionTrigger className="w-full sm:text-xl rounded-none line-clamp-1 p-0 py-1 px-2 flex sm:gap-5 justify-between items-center transition-all">
                    { ad.name }
                </AccordionTrigger>
                :
                <div className='p-2'><LoadingDots /></div>
            }
            <X 
                onClick={ deleteChatHead }
                className='h-6 hover:border-2 hover:font-bold w-6 text-primary p-1 flex justify-center items-center border border-primary rounded-full'/>
        </div>
        <AccordionContent className='w-full h-[60vh]'>
            <ChatBoard _messages={ messages } ad={ ad! } channelName={ head } me={ me } loadindState={loading} />
        </AccordionContent>
    </AccordionItem>
  )
}