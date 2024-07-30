import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import { createClient } from '@/lib/supabase/client'
import React, { useEffect, useState } from 'react'

type Props = {
    id: string
}

export default function ChatHeadImage({ id }: Props) {
    const supabase = createClient()
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')

    useEffect(()=>{
        (async()=>{
            const { data, error } = await supabase
                .from('ads_with_image_url')
                .select('image, name')
                .eq('id', id).single()

            if(error) return
            setUrl(data.image)
            setName(data.name)
        })()
    }, [supabase, id])
  return (
    <div className="flex gap-3 items-center">
        <div className="w-16 h-16">
            {
                url &&
                <ImageWithFallbackUrl src={url}/>
            }
        </div>
        <p className="text-xl max-w-40 line-clamp-1 text-left">{ name }</p>
    </div>
  )
}