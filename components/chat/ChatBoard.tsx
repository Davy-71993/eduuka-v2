import LoadingDots from '@/components/LoadingDots'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { AppContext } from '@/context/Appcontext'
import { sendMessage } from '@/lib/actions/db_actions'
import { createClient } from '@/lib/supabase/client'
import { Ad, Message } from '@/lib/types'
import React, { useContext, useEffect, useState } from 'react'

type Props = {
    _messages: Message[],
    patner: string,
    channelName: string,
    me: string,
    ad: Ad,
    loadindState?: boolean
}

export default function ChatBoard({ _messages, patner, ad, me, loadindState, channelName }: Props) {

    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const { supabase, chatHeads, activeChatHead } = useContext(AppContext)

    useEffect(()=>{
        setMessages(_messages)
    }, [_messages])

    useEffect(()=>{
        if(!supabase) return
        const channels = supabase.channel(channelName)
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
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
    }, [channelName, messages, supabase])

    if(!ad || !me || loadindState){
        return (
            <div className="flex flex-col w-full gap-2 py-5">
                <div className="flex flex-col gap-3 px-3">
                    <Skeleton className='p-5 w-[70%] self-start'/>
                    <Skeleton className='p-5 w-[70%] self-end'/>
                    <Skeleton className='p-5 w-[70%] self-start'/>
                    <Skeleton className='p-5 w-[70%] self-end'/>
                </div>
                <div className="px-5 flex flex-col gap-3">
                    <Textarea 
                        disabled
                        value={ newMessage } onChange={ (e)=>{ setNewMessage(e.target.value)} }
                        className='border rounded-md p-3 h-24 mt-5 resize-none' autoFocus/>
                    <Button disabled  className='font-bold text-lg flex gap-5 max-w-40 w-full self-end'>
                        Send
                    </Button>
                </div>
            </div>
        )
    }   

    const handleSendMessage = async() => {
        setLoading(true)
        if(!newMessage || newMessage.trim().length === 0){
            // Make sure some message is entered before sending.
            setLoading(false)
            return
        }

        await sendMessage({body: newMessage, sender_id: me, ad_id: ad.id!, recipient_id: patner})
        setLoading(false)
        setNewMessage('')
    }
  return (
    <div className="flex flex-col w-full gap-2 py-5 h-full">
        <ScrollArea onLoad={ (e)=>{ console.log(e)} } scrollHideDelay={100} className='w-full h-[70%]'>
            <div className="w-full h-fit flex flex-col gap-2 px-3">
                {
                    messages.map((message, index)=>(
                        <p key={index} 
                            className={`w-fit p-2 rounded-sm max-w-[80%] ${ message.sender_id === me ? 'self-start bg-primary/25' : 'self-end text-right bg-green-200'}`}>
                            { message.body }
                        </p>
                    ))
                }
                {
                    loading &&
                    <p className="w-1/2 p-2 rounded-sm bg-primary/25"><LoadingDots /></p>
                }
            </div>
        </ScrollArea>
        <div className="px-5 flex flex-col gap-1 sm:gap-3">
            <Textarea 
                value={ newMessage } onChange={ (e)=>{ setNewMessage(e.target.value)} }
                className='border text-sm sm:text-lg rounded-md p-3 h-16 sm:h-24 mt-5 resize-none' autoFocus/>
            <Button onClick={ handleSendMessage } className='font-bold py-1 text-lg max-w-40 w-full self-end'>
                {   loading 
                    ?  <>Sending <LoadingDots /></>
                    : 'Send'
                }
            </Button>
        </div>
    </div>
  )
}