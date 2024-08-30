"use client"

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useParams } from 'next/navigation'
import { AppContext } from '@/context/Appcontext'

type Props = {
    phone?: string, 
    ad_seller?: string
}

export default function ActionButtons({ phone, ad_seller }: Props) {

    const params = useParams()
    const ad_id = params['aid'] as string

    const [showNumber, setShowNumber] = useState(false)

    const { chatHeads, setState, me } = useContext(AppContext)

    const updateChatString = useCallback(() => {
        if(!me || me.id === ad_seller){
            console.log("You are trying to start a conversation with yourself, which is imposible.")
            return
        }
        const newChatHead = `${ad_id}_${me.id}`
        if(chatHeads?.includes(newChatHead)){
            return
        }
        setState({
            key: "chatHeads",
            value: [...chatHeads??[], newChatHead]
        })
    }, [me, ad_seller, ad_id, chatHeads, setState])
    
    if(!ad_id){
        return null
    }

  return (
    <div className="flex flex-col pb-5 px-6">
        <Button 
            onClick={ ()=> { setShowNumber(!showNumber) } } 
            className='w-full font-bold mt-5' >
            { showNumber ? phone : 'Show Contact'}
        </Button>
        <Button 
            onClick={ updateChatString } 
            disabled = { !me || me.id === ad_seller }
            variant="outline" 
            className='w-full font-bold mt-5 border-primary text-primary' >
            Start Chat
        </Button>
    </div>
  )
}