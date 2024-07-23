/**
 * The chats page
 * The chat can be a message or a call
 * A call can be audio or video
 */
"use client"

import React, { use, useEffect, useState } from 'react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Ad, Chat, Message } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { ImageIcon, MailQuestion, SendHorizonal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { fetchMessages, getAdByID, getAdImage, getMessages, getUsername } from '@/lib/actions/db_actions'
import { createClient } from '@/lib/supabase/client'
import { organizeMessages } from '@/lib/utils'
import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LoadingDots from '@/components/LoadingDots'
import ChatHeadImage from './(parts)/ChatHeadImage'
import ConversationHead from './(parts)/ConversationHead'
import ChatBoard from './(parts)/ChatBoard'
import { Skeleton } from '@/components/ui/skeleton'

type HeadProps = {messages: Message[], user: string}
 
export default function ChatPage() {
  const supabase = createClient()
  const [chats, setChats] = useState<any[]>([])
  const [currentChat, setCurrentChat] = useState<HeadProps>()
  const [fetchingChatHeads, setFetchingChatHeads] = useState(false)
  const [fetchingChat, setFetchingChat] = useState(false)
  const [me, setMe] = useState<string>()
  const [ad, setAd] = useState<Ad>()
  const [channelName, setChannelName] = useState('')

  useEffect(()=>{
    fetchAllMessages()
  }, [])

  // useEffect(()=>{ console.log(chats)}, [chats])

  const fetchAllMessages = async()=>{
    setFetchingChatHeads(true)
    const { data: { user }, error } = await supabase.auth.getUser()
    if(error || !user){
      return
    }
    setMe(user.id)
    const messages = await fetchMessages()
    const organisedMessages = await organizeMessages(messages, user.id)
    setChats(organisedMessages)
    setFetchingChatHeads(false)
  }

  const activateChatHead = async (head: HeadProps, ad_id: string) => {
    setFetchingChat(true)
    setCurrentChat(head)
    const ad = await getAdByID(ad_id)
    setChannelName(`${ad?.id}_${ad?.seller_id === me ? head.user : me}`)
    setAd(ad)
    setFetchingChat(false)
  }

  const setPanelSize = (size: number, changeSize: number) => {
    const panel = document.querySelector('.chat-heads')
    const hiddables = document.querySelectorAll('.chat-head-text')
    if(size < changeSize){
        panel?.classList.add('sm:max-w-20', 'max-w-10')
        hiddables.forEach((elem) => {
            elem.classList.add('hidden')
        })
    }
    if(size >= changeSize){
        panel?.classList.remove('sm:max-w-20', 'max-w-10')
        hiddables.forEach((elem) => {
            elem.classList.remove('hidden')
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


  return (
    <ResizablePanelGroup direction="horizontal" className='w-full h-full max-h-[80vh] sm:max-h-full'>
      <ResizablePanel onResize={handleResize} collapsible minSize={5} defaultSize={50} maxSize={50}
        className='chat-heads flex flex-col space-y-2 min-w-fit'
      >
        {
          fetchingChatHeads
          ?
          <div className="flex flex-col gap-3 p-3">
            {
              [1, 2, 3, 4, 5].map((e, i) => (
                <div key={e} className="flex gap-3 items-center">
                  <Skeleton className='w-20 h-20 rounded-sm flex justify-center items-center text-muted-foreground/80'>
                    <ImageIcon size={35} />
                  </Skeleton>
                  <Skeleton className='p-10 w-60'/>
                </div>
              ))
            }
          </div>
          :
          <Accordion collapsible type='single'>
            {
              chats.map((chat, index) => (
                <AccordionItem key={ index } value={`chat-${index}`}>
                  <AccordionTrigger className='p-0 border-none'>
                    <ChatHeadImage id={ chat.image } />
                  </AccordionTrigger>
                  <AccordionContent className='py-5 border-t-2 flex flex-col gap-2'>
                    {
                      chat.persons.map((person: HeadProps , ind:number) => (
                        <ConversationHead 
                          onClick={()=>{ activateChatHead(person, chat.image) }}
                          id={ person.user }
                          key={ ind }
                          >
                        </ConversationHead>
                      ))
                    }
                  </AccordionContent>
                </AccordionItem>
              ))
            }
          </Accordion>
        }
      </ResizablePanel>
      <ResizableHandle className='border-r h-full'/>
      <ResizablePanel collapsible defaultSize={50} className='h-full border-r'>
        <div className="flex flex-col h-[90%] space-y-5">

          {
            currentChat ?
            (
              <ChatBoard _messages={ currentChat.messages} channelName={ channelName } ad={ ad! } me={ me! } />
            ):(
              <div className='h-full w-full flex justify-center items-center p-5 max-h-[300px] sm:max-h-[500px]'>
                <div className="w-fit h-fit p-5 text-center flex flex-col items-center text-gray-700/50">
                  <MailQuestion size={100} />
                  <h1 className='text-lg sm:text-2xl my-5'>Select the chat head to see the messages.</h1>
                </div>
              </div>
            )
          }
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}