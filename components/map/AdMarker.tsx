import { Ad } from '@/lib/types'
import React, { useEffect, useRef } from 'react'
import { Marker as LeafletMarker } from 'leaflet'
import { Marker, Popup } from 'react-leaflet'
import Link from 'next/link'
import { displayCurrencyAndPrice, toNumber } from '@/lib/utils'
import Image from 'next/image'

type Props = {
    ad: Ad,
    single?: boolean,
    currency: string
}

export default function AdMarker({ ad, single, currency }: Props) {

    const adMarkerRef = useRef<LeafletMarker>(null)
    useEffect(()=>{
        if(!single){
            return
        }
        const adMarker = adMarkerRef.current
        
		if (adMarker) {
            adMarker.openPopup()
		}
    }, [single])
  return (
    <Marker 
        ref ={ adMarkerRef }
        position={[toNumber(ad.lat), toNumber(ad.long)]}>
        <Popup autoClose={ false } className='p-3'>
            <div className=" flex flex-col gap-0">
                <Image src={ad?.image ?? ad.ad_images![0].url ?? '/images/no_img.jpg'} alt='Image' height={1000} width={1000} />
                <h1 className="text-center text-muted-foreground text-lg py-0">{ ad.name }</h1>
                <span className="py-0 text-sm text-muted-foreground text-center m-0">{ displayCurrencyAndPrice(ad.default_currency!, currency, `${ad.price}` ) }</span>
                <div className="flex w-full">
                    <Link href={`/find/${ad.id}`}>
                        <span className="text-primary text-center m-0 w-full line-clamp-1 rounded px-3 py-1 text-lg hover:bg-primary hover:text-muted transition-colors">
                            More details
                        </span>
                    </Link>

                    {
                        !single &&
                        <Link href={`/map/${ad.id}`}>
                            <span className="text-primary my-0 text-center w-full line-clamp-1 rounded px-3 py-1 text-lg hover:bg-primary hover:text-muted transition-colors">
                                Show Route
                            </span>
                        </Link>
                    }

                </div>
            </div>
        </Popup>
    </Marker>
  )
}