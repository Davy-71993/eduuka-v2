import React, { useContext, useEffect, useState, useTransition } from 'react'
import { X } from 'lucide-react'
import { fetchMessages, getAdByID } from '@/lib/actions/db_actions'
import { Ad, Message } from '@/lib/types'
import ChatBoard from '@/components/chat/ChatBoard'
import LoadingDots from '../LoadingDots'
import { AppContext } from '@/context/Appcontext'
import { Button } from '../ui/button'

type Props = {
    head: string,
    deleteChatHead: ()=>void
}

export default function ChatHead({ head, deleteChatHead }: Props) {
    const ad_id = head.split("_")[0]
    const buyer = head.split("_")[1]

    const { me, supabase, activeChatHead, setState } = useContext(AppContext)

    const [messages, setMessages] = useState<Message[]>([])
    const [ad, setAd] = useState<Ad>()
    const [loading, setLoading] = useTransition()
    const [iam, setIam] = useState<string>()
    const [patner, setPatner] = useState<string>()
    const [hidden, setHidden] = useState('hidden')

    useEffect(()=>{
        setLoading(async()=>{
            const msgs = await fetchMessages(ad_id)
            const ad = await getAdByID(ad_id)
            setMessages(msgs)
            setAd(ad)
        })
    },[ad_id])

    useEffect(()=>{
        setIam(me?.id === ad?.seller_id ? ad?.seller_id: buyer)
        setPatner(me?.id === ad?.seller_id ? buyer : ad?.seller_id)
    }, [me, buyer, ad])

    useEffect(()=>{
        if(!supabase){
            return
        }
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
    }, [messages, supabase, head])

    useEffect(()=>{
        if(activeChatHead === head){
            setHidden('')
        }else{
            setHidden('hidden')
        }
    }, [activeChatHead, head])

    if(!iam || !patner || !ad) return (
        <Button className="w-full sm:text-xl rounded-sm  py-1 px-2 justify-between items-center transition-all">
            <LoadingDots />
            <X 
                onClick={ deleteChatHead }
                className='h-6 hover:border-2 w-6 text-primary-foreground p-1 flex justify-center items-center border border-primary-foreground rounded-full'/>
        </Button>
    )
    return (
        <div className="bg-background w-full rounded-sm shadow-lg border border-primary overflow-hidden">
            <div className="w-full flex overflow-hidden">
                <Button onClick={ ()=> { 
                        if(activeChatHead === head){
                            setState({
                                key: 'activeChatHead',
                                value: undefined
                            })
                            
                        }else{
                            setState({
                                key: "activeChatHead",
                                value: head
                            }) 
                        }
                    } } className="w-full max-w-[85%] sm:text-xl rounded-none justify-between items-center">
                    { ad.name }
                </Button>
                <Button 
                    className='text-primary-foreground w-full max-w-[15%] p-0 flex justify-center items-center rounded-none'
                    >
                    <X onClick={ deleteChatHead }/>
                </Button>
            </div>
            
            <div className={`w-full h-0 max-h-[60vh] ${ hidden } animate-h h-out`}>
                <ChatBoard 
                    _messages={ messages } 
                    ad={ ad! } 
                    channelName={ head } 
                    patner={ patner } 
                    me={ iam } 
                    loadindState={loading} />
            </div>
        </div>
    )
}