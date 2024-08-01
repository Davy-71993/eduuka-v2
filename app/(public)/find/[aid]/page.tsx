
import Container from '@/components/Container'
import SearchBar from '@/components/SearchBar'
import { Button } from '@/components/ui/button'
import { getAdByID } from '@/lib/actions/db_actions'
import Link from 'next/link'
import React from 'react'
import ProfileCard from './(parts)/ProfileCard'
import ImageWithFallbackUrl from '@/components/ImageWithFallbackUrl'
import SimilarAdsList from '@/components/ads/SimilarAdsList'
import PricePanel from '@/components/PricePanel'


export async function generateMetadata({ params: { aid } }: { params: any}) {
  const ad  = await getAdByID(aid);
  return {
    title: ad?.name,
    description: ad?.description,
    alternates: {
      canonical: `/find/${ad?.id}`,
    },
    openGraph: {
      title: ad?.name,
      description: "category.description",
      images: [ad?.ad_images],
    },
  };
}

type Props = {
  params: any,
  searchParams: any
}

export default async function page({ params, searchParams }: Props) {
  const aid = params.aid
  const ad = await getAdByID(aid)
  
  const numberOrZer0 = (str: string) => {
    const index =  Number.isNaN(parseInt(str)) ? 1 : parseInt(str)
    return index > ad?.ad_images?.length! ? 1 : index
  }

  if(!ad){
    return null
  }
  const details = JSON.parse(ad?.ad_details || '[]');

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
      <SearchBar toUrl='/find' includeLocation />
      <div className='sm:flex sm:space-x-5 mt-5'>
        <div className="bg-secondary w-full sm:w-[60%] xl:w-[50%]">
          <div className="p-5 w-full h-[50vh] object-cover overflow-hidden relative">
            {
              ad.ad_images &&
              <ImageWithFallbackUrl
                src={ ad.ad_images[numberOrZer0(searchParams['img'])-1]?.url ?? ''} 
                alt='Priority Ad Image' 
                className='w-full mx-auto hover:scale-110 object-contain rounded-sm transition-all h-auto' 
              />
            }
          </div>
          <div className="flex border-t p-5 h-fit overflow-hidden space-x-2">
            {
              ad?.ad_images?.map((image, index)=>(
                <Link key={ index } href={`?img=${index+1}`} className='h-16 relative w-20'>
                  <ImageWithFallbackUrl 
                    src={ image?.url || ''} 
                    alt='Priority Ad Image' 
                    className='w-full h-auto object-contain' 
                  />
                </Link>
              ))
            }
          </div>
          <div className="p-5 w-full">
            { ad.description }
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
          <PricePanel ad={ ad } />
          <ProfileCard ad_seller={ ad.seller_id } scheme={ ad.pricing_scheme } profile={ ad.profiles }  />
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
        <SimilarAdsList ad={ ad }/>
      </div>
    </Container>
  )
}