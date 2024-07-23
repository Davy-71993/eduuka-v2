"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

type Props = {
  src?: string
  className?: string,
  alt?: string
}

export default function ImageWithFallbackUrl({ src, className, alt }: Props) {
  const [imageUrlError, setImageUrlError] = useState(true)
  
  useEffect(()=>{
    setImageUrlError(false)
  }, [src])

  return (
    <div className="relative w-full h-full">
      <Image 
        onError={ (e)=>{ 
          setImageUrlError(true)
        }}
        src={ imageUrlError ? '/images/no_img.jpg' : src ?? '' } 
        alt={alt ?? 'Image' } 
        fill
        className={ className }
      />
    </div>
  )
}