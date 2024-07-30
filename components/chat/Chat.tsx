"use client"

import ChatHead from './ChatHead'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '@/context/Appcontext'


export default function Chat() {
    const { chatHeads, setState } = useContext(AppContext)
    const [heads, setHeads] = useState<string[]>()

    useEffect(()=>{
        setHeads(chatHeads)
    }, [chatHeads])
    if(!heads?.length) return null

    const deleteChatHead = (head: string) => {
        const updatedList = chatHeads?.filter((h) => h !== head)
        setState({
            key: "chatHeads",
            value: updatedList?.length ? updatedList : undefined
        })
    }

    return (
        <div className='fixed bottom-0 right-0 p-5 w-full max-w-96 sm:p-10 flex flex-col gap-2'>
            {
                heads.map((head, index) =>(
                    <ChatHead key={ index } head={ head } deleteChatHead={()=>{ deleteChatHead(head) }}/>
                ))
            }
        </div>
    )
}