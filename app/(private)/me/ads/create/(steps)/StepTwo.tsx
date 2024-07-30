import { Button } from '@/components/ui/button'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FormGroup, RenderExtraFields } from '../fields'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { AdData } from '@/lib/types'

type Props = {}

export default function StepTwo({}: Props) {

  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [data, setData] = useState<AdData>()
  const [deatils, setDetails] = useState('')
  const [errors, setErrors] = useState<string>()
  
  useEffect(()=>{
    const item = localStorage.getItem('ad_data')
    if(!item){
      router.push(`/me/ads/create?cp=1&e=no item in the storage`)
      return
    }
    const data: AdData = JSON.parse(item)
    
      data && setData(data)
      data.name && setName(data.name)
      data.description && setDescription(data.description)
      data.ad_details && setDetails(data.ad_details)
      // Find a way to set deatils with the data from the storage and pass it on to the renderer

  }, [router])

  const navigateToNextPage = () => {
   
    if(!description || description === '' || !name || name === ''){
       setErrors('Please fill all the required fields')
       return
    }

    const updatedData: AdData = {
      ...data,
      name,
      description,
      ad_details: deatils
    }

    localStorage.setItem('ad_data', JSON.stringify(updatedData))
    router.push('?cp=3')
  }


  return (
    <>
      <FormGroup label="Name or Title" required>
          <Input className='w-full absolute bg-secondary left-0 bottom-0 h-12 text-lg px-8' value={name} onChange={(e)=>{ setName(e.target.value)}} />
      </FormGroup>
      <FormGroup className='h-28 sm:h-32' label='Describe your Product'>
        <Textarea 
            value={ description } 
            onChange={(e)=>{ setDescription(e.target.value) }}  
            className='h-24 sm:h-28 absolute bg-secondary left-0 bottom-0 px-8 resize-none sm:text-lg rounded-sm overflow-hidden' />
      </FormGroup>
      {
        data?.sub_category?.extra_fields &&
        <RenderExtraFields
          setter={ (value) => { setDetails(value) } } 
          fields={ data?.sub_category.extra_fields ?? '' }
          initialData={ deatils } />
      } 
      <div className="flex justify-between items-center py-3 max-w-lg mx-auto w-full">
        <Link href="?cp=1"><Button><ArrowBigLeft />Prevous Page</Button></Link>
        <Button onClick={ navigateToNextPage }>Next Page<ArrowBigRight /></Button>
      </div>
    </>
  )
}