// "use client"
import AdCard from '@/components/AdCard'
import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { fetchAdByID, fetchAds } from '@/lib/db/api'
import { createClient } from '@/lib/supabase/server'
import { Check, Star } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: any,
  searchParams: any
}

export default async function page({ params, searchParams }: Props) {
  const aid = params.aid
  const supabase = createClient(cookies())
  const ad = await fetchAdByID(supabase, aid)
  const ads = await fetchAds(supabase)

  // console.log(ad)

  const numberOrZer0 = (str: string) => {
    const index =  Number.isNaN(parseInt(str)) ? 1 : parseInt(str)
    return index > ad?.ad_images?.length! ? 1 : index
  }

  console.log(numberOrZer0(searchParams['img']))

  if(!ad){
    return null
  }
  const details = JSON.parse(ad?.ad_details || '');

  const handleDetails = () => {
    // Alternatively we can convert the details in 2D array ie [["", ""], ["", ""], ...]
    let keys = []
    let values = []
    for (const key in details) {
      if (Object.prototype.hasOwnProperty.call(details, key)) {
        keys.push(key)
        if(typeof details[key] === 'boolean'){
          details[key] ? values.push("Yes") : values.push("No")
        }else if(typeof details[key] ===  'string'){
          values.push(details[key])
        }else{
          values.push("Not defined")
        }
      }
    }
    return (
      <>
      {
        keys.map((key, index) =>(
          <div key={index} className="">
            <p className="text-center">{ values[index] }</p>
            <p className="text-center text-foreground/50">{ key }</p>
          </div>
        ))
      }
      </>
    )
  }

  return (
    <Container clasName='pt-5' >
      <SearchBar includeLocation />
      <div className='sm:flex sm:space-x-5 mt-5'>
        <div className="bg-secondary w-full sm:w-[60%] xl:w-[50%]">
          <div className="p-5 w-full h-[50vh]">
            {
              ad.ad_images &&
              <Image 
                src={ ad.ad_images[numberOrZer0(searchParams['img'])-1]?.url ?? ''} 
                alt='Priority Ad Image' 
                height={1500} width={1500} 
                className='w-full mx-auto hover:scale-110 rounded-sm transition-all h-auto' 
              />
            }
          </div>
          <div className="flex border-t p-2 h-24 overflow-hidden space-x-2">
            {
              ad?.ad_images?.map((image, index)=>(
                <Link key={ index } href={`?img=${index+1}`} className='block h-full'>
                  <Image 
                    src={ image?.url || ''} 
                    alt='Priority Ad Image' 
                    height={100} width={100} 
                    className='w-full max-w-24 border h-auto' 
                  />
                </Link>
              ))
            }
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl mt-5 pl-5 border-b">Extra Details</h1>
            <div className="p-5 grid gap-5 grid-cols-2 md:grid-cols-4">
              {
                handleDetails()
              }
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[40%] xl:w-[50%] mt-5 h-fit sm:mt-0 xl:grid xl:gap-5 grid-cols-2">
          <div className="bg-secondary w-full p-5">
            <h1 className="text-2xl md:text-4xl font-bold mb-5 text-primary">USH {" " + ad?.price}</h1>
            <p className="text-accent-foreground mb-5 line-clamp-2 text-2xl">{ ad?.description }</p>
            {
              // Add a condition to check if the details object includes negotiable and it is true
              details['negotiable'] &&
              <div className='px-5 py-2 mb-5 bg-card text-xl font-bold rounded-sm w-full flex justify-between items-center'>
                <span className=''>Negotiable</span><Check size={32} className='border-2 border-foreground font-bold rounded-full p-1 h-8 w-8' />
              </div>
            }
            <div className="border rounded-sm px-5 py-3 text-sm ">Market price: USH 45000 - 60000</div>
          </div>
          <div className="bg-secondary mt-5 xl:mt-0 w-full p-5 h-fit">
            <Link href={`/dealers/${ad?.seller_id}`} className='hover:text-primary transition-colors block w-full'>
              <Image 
                src={'/profile.jpg'} alt='Seller Image' height={100} width={100} 
                className='rounded-full mx-auto' />
              <h1 className="text-lg text-center pt-2">{ ad.profiles?.first_name } { ad.profiles?.last_name }</h1>
              <div className="flex justify-evenly py-2 w-full">
                <p className="text-foreground/50 w-fit">6 ads</p>
                <div className="w-fit flex text-yellow-500">
                  <Star /><Star /><Star /><Star /><Star />
                </div>
              </div>
            </Link>
            <Button className='w-full font-bold mt-5' >Show Contact</Button>
            <Button variant="outline" className='w-full font-bold mt-5 border-primary text-primary' >Start Chat</Button>
          </div>
          <div className="col-span-2 hidden sm:block bg-secondary p-5 mt-5 xl:mt-0">
            <h1 className="text-center text-2xl">Tips to be safe from conmen</h1>
            <p className='py-1 list-disc text-lg list-item ml-5'>Avoid paying in advance, even for delivery</p>
            <p className='py-1 list-disc text-lg list-item ml-5'>Meet with the seller at a safe public place</p>
            <p className='py-1 list-disc text-lg list-item ml-5'>Inspect the item and ensure it&apos;s exactly what you want</p>
            <p className='py-1 list-disc text-lg list-item ml-5'>Make sure that the packed item is the one you&apos;ve inspected</p>
            <p className='py-1 list-disc text-lg list-item ml-5'>Only pay if you&apos;re satisfied</p>
            <div className="flex  p-5 space-x-5">
              <Button variant="outline" className='text-primary text-lg border-primary hover:text-primary w-full'>Report Abuse</Button>
              {/* <Button variant="outline" className='text-primary text-lg border-primary hover:text-primary w-full'>Post Ad like this</Button> */}
            </div>
          </div>
        </div>
        <div className="sm:hidden mt-5 bg-secondary">
          <h1 className="text-xl pl-5 py-3 border-b">Extra Details</h1>
          <div className="p-5 grid gap-5 grid-cols-2 md:grid-cols-4">
            {
              handleDetails()
            }
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-3 overflow-hidden">
        <h1 className="text-2xl mt-5">Similar Ads.</h1>
        {/* filtered Ads */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
          {
            ads.slice(0,6).map((ad, index)=>(
              <AdCard key={index} ad={ad} />
            ))
          }
        </div>
      </div>
    </Container>
  )
}