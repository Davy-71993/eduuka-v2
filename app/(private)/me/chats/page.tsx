/**
 * The chats page
 * The chat can be a message or a call
 * A call can be audio or video
 */
"use client"

import React, { use, useCallback, useContext, useEffect, useState } from 'react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Ad, Message } from '@/lib/types'
import { ImageIcon, MailQuestion } from 'lucide-react'
import { fetchMessages, getAdByID } from '@/lib/actions/db_actions'
import { organizeMessages } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ChatHeadImage from './(parts)/ChatHeadImage'
import ConversationHead from './(parts)/ConversationHead'
import { Skeleton } from '@/components/ui/skeleton'
import ChatBoard from '@/components/chat/ChatBoard'
import { AppContext } from '@/context/Appcontext'
import Link from 'next/link'
import { PiFolderOpenLight } from "react-icons/pi";

type HeadProps = {messages: Message[], user: string}
 
export default function ChatPage() {
  const [chats, setChats] = useState<any[]>()
  const [currentChat, setCurrentChat] = useState<HeadProps>()
  const [fetchingChatHeads, setFetchingChatHeads] = useState(true)
  const [ad, setAd] = useState<Ad>()
  const [channelName, setChannelName] = useState('')
  const [patner, setPatner] = useState('')
  const { me } = useContext(AppContext)

  const fetchAllMessages = useCallback(async()=>{
    setFetchingChatHeads(true)
    console.log("Me")
    if(!me?.id) return
    const messages = await fetchMessages()
    const organisedMessages = await organizeMessages(messages, me.id)
    setChats(organisedMessages)
    setFetchingChatHeads(false)
  }, [me?.id])
  useEffect(()=>{
    fetchAllMessages()
  }, [me, fetchAllMessages ])

  // useEffect(()=>{ console.log(chats)}, [chats])



  const activateChatHead = async (head: HeadProps, ad_id: string) => {
   
    setCurrentChat(head)
    const ad = await getAdByID(ad_id)
    const pa = ad?.seller_id === me?.id ? head.user : ad?.seller_id
    if(!pa) {
      console.log("The patner string is not set")
      return
    }
    setPatner(pa)
    setChannelName(`${ad?.id}_${ad?.seller_id === me?.id ? head.user : me?.id}`)
    setAd(ad)
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
    <ResizablePanelGroup direction="horizontal" className='h-full w-full max-h-[80vh] sm:max-h-full'>
      <ResizablePanel onResize={handleResize} collapsible minSize={5} defaultSize={50} maxSize={50}
        className='chat-heads flex flex-col space-y-2 max-w-[50%]'
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
          <>
          {
            chats && chats.length === 0
            ?
            <div className='h-full w-fit flex justify-center items-center p-5 max-h-[300px] sm:max-h-[500px]'>
              <div className="w-fit h-fit p-5 text-center flex flex-col items-center text-gray-700/50">
                <PiFolderOpenLight size={ 100 } className='rotate-90' />
                <p className='text-base sm:text-lg my-5 w-fit'>
                  You do not have any conversations yet.
                  To start a consersation, head over to the <Link href="/find" className='text-primary'>ad listings 
                  page</Link>, 
                  click on the ad you want to see details. On the details page, you will see the <b>Start Chat</b> button 
                   you can click and start chating with the seller. Or <Link href="/me/ads/create"  className='text-primary'>Post and ad</Link> and wait for buyers to 
                   contact you
                </p>
              </div>
            </div>
            :
            <Accordion collapsible type='single'>
              {
                chats && chats.map((chat, index) => (
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
          </>
        }
      </ResizablePanel>

      <ResizableHandle className='border-r h-full'/>

      <ResizablePanel collapsible defaultSize={50} minSize={50} className='h-full border-r'>
        <div className="flex flex-col h-[90%] space-y-5">
          {
            currentChat && me?.id ?
            (
              <ChatBoard _messages={ currentChat.messages} patner={ patner } channelName={ channelName } ad={ ad! } me={ me.id } />
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