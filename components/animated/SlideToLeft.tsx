"use client"

import { ChevronRight } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

type Props = {
    title?: string,
    children?: ReactNode,
    className?: string
}

export default function SlideToLeft({ title, children, className }: Props) {
    const [hidden, setHidden] = useState('hidden')
    return (
        <div onMouseEnter={()=>{ setHidden('') }} onMouseLeave={()=>{ setHidden('hidden') }} className="relative w-full">
            <div className={`px-5 py-3 min-w-60 transition-colors flex justify-between text-muted text-lg w-full items-center ${ !hidden && 'bg-blue-500'} border-b border-muted bg-blue-400 ${ className }`}>
                <p className='line-clamp-1'>{ title }</p>
                {
                    !hidden &&
                    <ChevronRight />
                }
            </div>
            <div className={`p-3 ${ hidden } absolute top-0 opacity-0 slide-in z-50`}>
                { children }
            </div>
        </div>
    )
}