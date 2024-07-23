"use client"

import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import LoadingDots from '@/components/LoadingDots'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { uploadFile } from '@/lib/actions/db_actions'
import { CDN_URL } from '@/lib/defaults'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/types'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useTransition } from 'react'

type Props = {}

export default function CreateProfilePage({}: Props) {
    const router = useRouter()

    const [loading, startLoading] = useTransition()
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('/me')

    useEffect(()=>{
        if(!image) return;
        const reader = new FileReader()
        reader.addEventListener('load', function(){
            setUrl(this.result as string)
        })
        reader.readAsDataURL(image)
    }, [image])

    const handleSubmit = (e: any) => {
        e.preventDefault()

        startLoading(async()=>{
            const supabase = createClient()
            const { data:{ user } } = await supabase.auth.getUser()
            if(!user) return
            let imageUrl = ''
            if(image){
                const fileExtension = image.name.split('.').pop()
                const finalPath = `${ user.id }/profile.${fileExtension}`
    
                const { data, error } = await supabase.storage.from('profiles').upload(finalPath, image, {
                    cacheControl: '3600',
                    upsert: true
                })
                if(error){
                    console.log("Image upload failed, ", error.message)
                }
                imageUrl = data ? data.path : ''
            }
            const form = document.getElementById('profile-form') as HTMLFormElement | undefined
            const formdata = new FormData(form)
    
            const profile: Profile = {
                id: user.id,
                address: formdata.get('address') as string,
                first_name: formdata.get('first_name') as string,
                dob: formdata.get('dob') as string,
                image: imageUrl ? `${CDN_URL}/profiles/${imageUrl}` : '',
                last_name: formdata.get('last_name') as string,
                phone: formdata.get('phone') as string,
                sex: formdata.get('sex') as string,
                username: formdata.get('username') as string
            }
    
            const { error } = await supabase.from('profiles').insert(profile)

            if(error){
                console.log(error.message)
                return
            }

            router.push('/me')

        })

    }
  return (
    <div className='w-full mx-auto h-full flex justify-center'>
        <div className="max-w-lg h-fit w-full text-muted-foreground">
            <h1 className="text-4xl  py-10 text-center">Create your profile.</h1>
            <div className="flex flex-col gap-2 w-full">
                <div className="w-60 h-60 rounded-full mx-auto relative border-2 border-primary">
                    <ImageWithFallbackUrl src={ url } className='rounded-full'/>
                    <Input 
                        id='image-selector' 
                        type='file' accept='image/*' className='hidden' 
                        onChange={(e)=>{
                            setImage(e.target.files![0])
                        }}/>
                    <Button 
                        onClick={ ()=>{ document.getElementById('image-selector')?.click()} } 
                        className='h-10 w-10 p-0 bg-background hover:bg-background text-primary absolute right-3 bottom-3 z-50'>
                        <Camera size={35} />
                    </Button>
                </div>
            </div>
            <form id='profile-form' className='w-full flex flex-col gap-5 '>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='first_name' className='text-2xl'>First Name*:</Label>
                    <Input name='first_name' className='w-full border-2 text-lg   '/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='last_name' className='text-2xl'>Last Name*:</Label>
                    <Input name='last_name' className='w-full border-2 text-lg   '/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='username' className='text-2xl'>Username*:</Label>
                    <Input name='username' className='w-full border-2 text-lg   '/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='phone' className='text-2xl'>Phone*:</Label>
                    <Input name="phone" type='number' className='w-full border-2 text-lg   '/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='dob' className='text-2xl'>Date of Birth:</Label>
                    <Input name='dob' type='date' className='w-full border-2 text-lg'/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='sex' className='text-2xl'>Genda:</Label>
                    <Select name='sex' >
                        <SelectTrigger className="w-full border-2 text-lg">
                            <SelectValue placeholder="Male"/>
                        </SelectTrigger>
                        <SelectContent className='p-5'>
                            <SelectItem value='Male' >Male</SelectItem>
                            <SelectItem value='Female' >Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor='address' className='text-2xl'>Address:</Label>
                    <Textarea name='address' className='w-full border-2 text-lg h-16 rounded-sm resize-none'/>
                </div>
                <Button onClick={ handleSubmit } className='text-lg w-full self-center'>
                    {
                        loading
                        ? <span className='flex gap-5 items-center'>Uploading Profile <LoadingDots /></span>
                        : "Submit"
                    }
                </Button>
            </form>
        </div>
    </div>
  )
}