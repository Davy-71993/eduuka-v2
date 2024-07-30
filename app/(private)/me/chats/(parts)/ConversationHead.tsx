import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import { createClient } from '@/lib/supabase/client'
import React, { useEffect, useState } from 'react'

type Props = {
    id: string,
    onClick: ()=> void
}

export default function ConversationHead({ id, onClick }: Props) {
    const supabase = createClient()
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')

    useEffect(()=>{    
        (async()=>{
            const { data, error } = await supabase
                .from('profiles')
                .select('image, username')
                .eq('id', id).single()

            if(error) return
            setUrl(data.image)
            setName(data.username)
        })()
    }, [id, supabase])
  return (
    <div className="flex pl-5 gap-3 items-center cursor-pointer hover:bg-muted-foreground/50 hover:text-muted text-muted-foreground" onClick={ onClick }>
        <div className="w-10 h-10 rounded-full overflow-hidden">
            {
                url
                ? <ImageWithFallbackUrl src={url}/>
                : <ImageWithFallbackUrl src={"/url"}/>
            }
        </div>
        <p className="text-lg max-w-40 line-clamp-1">{ name }</p>
    </div>
  )
}