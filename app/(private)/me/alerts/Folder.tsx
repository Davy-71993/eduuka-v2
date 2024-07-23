import { Notification } from '@/lib/types'
import { today, yesterday } from '@/lib/utils'
import React from 'react'

type Props = {
    folder: Notification[],
    folderTitle: string,
    handleClick: (id: string)=>void
}

export default function Folder({ folder, folderTitle, handleClick }: Props) { 
    const pastTime = (start: Date) => {
        const now = new Date().getTime()
        const from = start.getTime()

        const elapsed = now - from

        const finalTime = elapsed/(1000*60)

        if(finalTime > 59){
            return `${(finalTime/60).toFixed(0)} hours ago`
        }

        return `${finalTime.toFixed(0)} mins ago`

        return ''
    }
    return (
        <div className=" border-b border-primary">
            <h1 className="px-5 py-3 text-xl w-full bg-primary-foreground">{ folderTitle }</h1>
            {
                folder.map((alert, index) => (
                <div onClick={ ()=>handleClick(alert.id) } key={index} className={`px-5 py-2 w-full ${ alert.status === 'delivered' ? 'bg-foreground/5' : ''} hover:bg-foreground/10`}>
                    <p className="text-base">{ alert.message }</p>
                    <p className="text-sm text-foreground/50">{ pastTime(new Date(alert.created_at)) }</p>
                </div>
                ))
            }
        </div>
    )
}