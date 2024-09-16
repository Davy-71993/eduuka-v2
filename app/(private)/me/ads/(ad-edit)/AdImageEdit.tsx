"use client"

import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import React, { useState } from 'react'

type Props = {
    imageUrl?: string, 
    onDelete?: ()=>void
}

export default function AdImageEdit({ imageUrl, onDelete }: Props) {
    const [hidden, setHidden] = useState('hidden')
    return (
        <div
            onMouseEnter={()=>{ setHidden('') }}
            onMouseLeave={()=>{ setHidden('hidden') }}
            className="h-full w-[30vh] relative">
            <Dialog>
                <DialogTrigger className={`flex ${ hidden } absolute top-0 right-0 z-10 transition-colors justify-center items-center text-destructive bg-primary-foreground`}>
                    <X />
                </DialogTrigger>
                <DialogContent className='max-w-[30rem]'>
                    <DialogHeader className='text-lg text-muted-foreground border-b border-muted-foreground'>Delete Image</DialogHeader>
                    <DialogDescription className="text center text-muted-foreground text-lg text-center p-5">
                        Are your sure you want to delete this image from this ad ?
                    </DialogDescription>
                    <div className="flex gap-5 pt-5 justify-between">
                        <DialogClose className='bg-primary transition-colors hover:bg-primary/90 py-3 w-full text-primary-foreground text-lg rounded'>Cancel</DialogClose>
                        <DialogClose className='bg-destructive transition-colors hover:bg-destructive/90 py-3 w-full text-primary-foreground text-lg rounded' onClick={ onDelete }>Delete</DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
            <ImageWithFallbackUrl src={ imageUrl } alt='Ad Image' className='h-full w-auto' />
        </div>
    )
}