"use client"

import { ChevronRight } from 'lucide-react'
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react'

type Props = {
    title?: string,
    children?: ReactNode,
    className?: string,
    onOpen?: (open: boolean)=> void
}

export default function SlideToLeft({ title, children, className, onOpen }: Props) {
    const [hidden, setHidden] = useState('hidden')
    const subRef = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        if (hidden === '') {
            setTimeout(()=>{
                subRef.current?.classList.add('border-l-2','border-muted')
            }, 300)
        }
    }, [hidden])

    const handleOpen = useCallback(()=>{
        setHidden(''); 
        if(onOpen){
            onOpen(true)
        }
    }, [onOpen])

    const handleClose = useCallback(()=>{
        setHidden('hidden'); 
        if(onOpen){
            onOpen(false)
        }
    }, [onOpen])
    
    return (
        <div onMouseEnter={ handleOpen } onMouseLeave={ handleClose } className="w-full">
            <div className={`px-5 py-1 transition-colors flex justify-between text-muted text-lg w-full items-center cursor-pointer ${ !hidden && 'bg-primary'} ${ className }`}>
                <p className='line-clamp-1'>{ title }</p>
                {
                    !hidden &&
                    <ChevronRight />
                }
            </div>
            <div ref={ subRef } className={`${ hidden } h-[65vh] overflow-hidden bg-primary/95 rounded-r-sm absolute top-0 opacity-0 slide-in z-40`}>
                { children }
            </div>
        </div>
    )
}