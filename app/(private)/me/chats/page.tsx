/**
 * The chats page
 * The chat can be a message or a call
 * A call can be audio or video
 */
"use client"

import React, { useEffect, useState } from 'react'

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import Container from '@/components/Container'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { chats } from '@/lib/dami-api'
import { Chat } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { MailQuestion, Mic, Send, SendHorizonal } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
  
export default function ChatPage() {
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

    const chat_id = useSearchParams().get('cid')

    const [currentChat, setCurrentChat] = useState<Chat | undefined>(()=>chats.find((chat) => chat.id === chat_id))

  return (
    <ResizablePanelGroup direction="horizontal" className='w-full h-full max-h-[80vh] sm:max-h-full'>
      <ResizablePanel onResize={handleResize} collapsible minSize={5} defaultSize={50} maxSize={50}
        className='chat-heads flex flex-col space-y-2 min-w-fit'
      >
        {
          chats.map((chat, index) => (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={2}>
                <TooltipTrigger  onClick={()=>{ setCurrentChat(chat)}} className='h-fit px-2 w-full bg-transparent hover:bg-secondary rounded-none flex justify-start'>
                  <Image src={'/profile.jpg'} height={1000} width={1000} alt='dealer profile'
                    className='h-10 w-10 sm:w-16 sm:h-16 rounded-full'/>
                  <div className="chat-head-text w-full pl-0 sm:pl-3 overflow-hidden text-left">
                    {/* This should be the name of the message sender */}
                    <p className="text-foreground/50 line-clamp-1">Wafula Denis</p>
                    {/* This should be the name of the ad being talked about */}
                    <p className="text-foreground text-lg line-clamp-1">{ chat.ad_name }</p>
                    {/* This should be the last message sent in the conversation. */}
                    <p className="text-foreground/50 line-clamp-1">Hope your doing well, brother</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent align='end' side='bottom'>
                  <p>{ chat.ad_name }</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))
        }
      </ResizablePanel>
      <ResizableHandle className='border-primary border-r h-full'/>
      <ResizablePanel collapsible defaultSize={50} className='h-full'>
        <div className="flex flex-col h-full space-y-5">

          {
            currentChat ?
            (
              <>
              <ScrollArea className={`p-2 sm:p-5 flex flex-col w-full h-[70%] max-h-[400px] sm:max-h-[700px] border-b border-primary`}>
                {
                  currentChat.messages.length > 0 ?
                    currentChat.messages.map((message, index)=>(
                      <div key={index} className={`p-2 sm:p-3 my-2 w-fit rounded-sm max-w-[80%] ${ message.to !== 'hyuoi' ? 'bg-primary-foreground ml-auto' : 'bg-secondary mr-auto'}`}>
                        {
                          message.type === 'Text' ? (
                            <p className="text-sm sm:text-lg">{ message.body.text}</p>
                          ):(
                            null
                          )
                        }
                      </div>
                    ))
                  : (
                    <div className='h-full w-full flex justify-center items-center p-5 max-h-[300px] sm:max-h-[500px]'>
                      <div className="w-fit h-fit p-5 text-center flex flex-col items-center text-gray-700/50">
                        <MailQuestion size={100} />
                        <h1 className='text-lg sm:text-2xl my-5'>No messages in this chat, start by sending a message below.</h1>
                      </div>
                    </div>
                  )
                }
              </ScrollArea>
              <div className="h-[30%] max-h-32 ">
                <div className="flex justify-center items-end space-x-1 sm:space-x-3 overflow-hidden w-full p-1 sm:p-5">
                  <div className="bg-gray-200 w-full max-w-[34rem] overflow-hidden h-fit max-h-28 flex rounded-sm sm:rounded-[2rem] sm:p-2">
                    <Textarea className='w-full text-foreground h-fit bg-transparent resize-none overflow-hidden' />
                  </div>
                  <Button className='w-fit text-4xl h-fit bg-green-600 text-gray-200 border-none rounded-full p-3 hover:bg-green-700'>
                    <SendHorizonal className='rounded-full'/>
                  </Button>
                </div>
              </div>
              </>
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