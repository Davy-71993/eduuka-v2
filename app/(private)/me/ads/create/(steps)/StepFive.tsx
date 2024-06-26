import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdData } from '@/lib/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowBigLeft, ArrowBigRight, CloudUpload, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { createClient } from '@/lib/supabase/client'
import { CDN_URL } from '@/lib/defaults'

type Props = {}

export default function StepFive({}: Props) {

  const router = useRouter()

  const [data, setData] = useState<AdData>()
  const [error, setError] = useState<string>()
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>()

  useEffect(()=>{
    const item = localStorage.getItem("ad_data")
    if(!item){
      router.push('?cp=1&e=no item')
      return
    }
    setData(JSON.parse(item))
  }, [])

  useEffect(()=>{validateData()}, [data])

  const validateData = () => {
    const files = data?.imageFiles
    !files || files.length < 2 
      ? setError("You must upload at least two image files.")
      : setError(undefined);
  }

  const convertImageToString = (file: File) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener("load", function () {
      setSelectedImageUrl(this.result as string)
    });
  }

  const handleNewFiles = (files: File[]) => {
    const currentFiles = data?.imageFiles
    
    if(currentFiles?.length){
      setData({...data, imageFiles: [...currentFiles, ...files ]})
    }else{
      setData({...data, imageFiles: [...files]})
    }
  }

  const handleSubmit = async() => {
    if(error){
      console.log(`You have ${data?.imageFiles?.length} images.\n`, error)
      return
    }

    const ad = {
      name: data?.name,
      price: data?.price,
      description: data?.description,
      status: 'Draft',
      sub_category_id: parseInt(`${data?.sub_category?.id}`),
      location: data?.location,
      pricing_scheme: data?.pricing_scheme,
      min_price: data?.min_price,
      max_price: data?.max_price,
      address: data?.address,
      pricing_period: data?.pricing_period,
      ad_details: data?.ad_details 
    }

    const supabase = createClient()

    const res = await supabase.from('ads').insert(ad).select('id').single()
    if(res.error){
      setError(res.error.message)
      return
    }

    const { id } = res.data
    data?.imageFiles?.forEach(async(image, index)=>{
      const imageRes = await supabase.storage.from('ads').upload(`/${id}/${image.name}`, image)
      if(imageRes.error){
        setError(imageRes.error.message)
        return
      }

      const metaDataRes = await supabase.from('ad_images').insert({
        url: `${CDN_URL}ads/${imageRes.data.path}`,
        ad_id: id
      })

      console.log(metaDataRes)
    })
    
  }

  return (
    <>
      {
        error &&
        <p className="text-center w-fit mx-auto max-w-lg text-lg text-red-600">{ error}</p>
      }
      <div className="h-fit w-full static py-3">
        <div id='images-container' className="flex flex-wrap w-full p-3 gap-5 h-fit border-2 border-dashed border-primary rounded-sm">
          {
            data?.imageFiles?.length 
            ?
            data.imageFiles.map((image, index) => (
                <Dialog key={index}>
                  <DialogTrigger
                    onClick={ ()=> { convertImageToString(image) }} 
                    className='bg-muted-foreground text-muted px-2 py-1 rounded-sm w-32 text-sm overflow-hidden font-bold'>
                      <p className='line-clamp-1'>{ image.name }</p>
                      <p className=''>{ (((image.size)/1000)).toFixed(1) }KB</p>
                  </DialogTrigger>

                  <DialogContent className='w-fit max-w-[90%] mx-auto h-fit max-h-[70vh] overflow-hidden p-4'>
                    {
                      selectedImageUrl 
                      ? 
                      <Image src={selectedImageUrl} alt={`image-${index}`} width={1000} height={1000}
                        className='h-auto w-auto'/>
                      : 
                      <div className="h-48 w-full flex justify-center items-center text-muted-foreground">
                        The image could not load, please select another image to preview.
                      </div>
                    }
                  </DialogContent>
              </Dialog>
              ))
            : 
              <div className="h-fit w-full py-5 flex flex-col gap-3 justify-center items-center text-muted-foreground">
                <CloudUpload size={60} />
                <span>Drag and drop Images here to upload</span>
              </div>
          }
        </div>
      </div>
      
      <Button onClick={()=>{ document.getElementById('file-selector')?.click()}} 
        className='bg-muted-foreground flex space-x-3 font-bold hover:bg-muted-foreground/80'>
        <CloudUpload /><span>Upload Images</span>
      </Button>
      <Input type='file' accept='image/*' id='file-selector' className='hidden' onChange={(e)=>{ handleNewFiles(e.target.files as unknown as File[]) }} multiple/>
      
      <div className="flex justify-between items-center py-3 w-full">
        <Link href="?cp=4"><Button><ArrowBigLeft />Prevous Page</Button></Link>
        <Button 
          className='bg-green-600'
          onClick={ handleSubmit }>Post Ad<ArrowBigRight /></Button>
      </div>
    </>
  )
}

