
import React from 'react'
import AdsTable from './Table'
import { getAdByID, getUserAds } from '@/lib/actions/db_actions'
import { Ad } from '@/lib/types'
import AdEditForm from './(ad-edit)/AdEditForm'
import { MdErrorOutline } from 'react-icons/md'

type Props = {
  searchParams: any
}
export default async function AdPage({ searchParams }: Props) {
  const ads = await getUserAds()
  const aid = searchParams['aid']
  let ad: Ad | undefined;
  ad = await getAdByID(aid)
  return (
    <>
      {
        aid
        ? ad 
        ? <AdEditForm ad={ {...ad, ad_images: ad.ad_images?.filter((img: any) => !img["deleted_at"])} } /> 
        : (
            <div className='flex flex-col gap-5 justify-center items-center h-80 w-full text-2xl text-destructive'>
              <MdErrorOutline size={100}/>
              <p className='text-muted-foreground'>Error, invalid Ad id.</p>
            </div>
          )
        :<AdsTable ads={ ads } />
      }
    </>
  )
}