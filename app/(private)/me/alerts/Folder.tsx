import { Notification } from '@/lib/types'
import { today, yesterday } from '@/lib/utils'
import React from 'react'

type Props = {
    folder: Notification[],
    folderTitle: string,
    handleClick: (id: string)=>void
}

export default function Folder({ folder, folderTitle, handleClick }: Props) { 
    return (
        <div className=" border-b border-primary">
            <h1 className="px-5 py-3 text-xl w-full bg-primary-foreground">{ folderTitle }</h1>
            {
                folder.map((alert, index) => (
                <div onClick={ ()=>handleClick(alert.id) } key={index} className={`px-5 py-2 w-full ${ alert.status === 'Unread' ? 'bg-foreground/5' : ''} hover:bg-foreground/10`}>
                    <p className="text-base">{ alert.message }</p>
                    <p className="text-sm text-foreground/50">{ alert.date.getDate() === today.getDate() || alert.date.getDate() === yesterday.getDate() ? alert.date.toLocaleTimeString() : alert.date.toDateString() }</p>
                </div>
                ))
            }
        </div>
    )
}