
import { Ad, Location } from '@/lib/types'
import { displayCurrencyAndPrice, prettyDistance, toNumber } from '@/lib/utils'
import { Marker, Popup, useMap, Circle } from 'react-leaflet'
import Link from 'next/link'
import { useGeoData } from '@/lib/hooks'

 const MarkerList = ({ center, ads }: { center: Location, ads: Ad[] }) => {
    const geo = useGeoData()
    return (
        <>
            {
                ads.map((marker, index) => (
                    <Marker 
                        key={ index } 
                        position={[toNumber(marker.lat), toNumber(marker.long)]}>
                        <Popup>
                            <div className=" flex flex-col gap-0">
                                <h1 className="text-center text-muted-foreground text-lg py-0">{ marker.name }</h1>
                                <span className="py-0 text-sm text-muted-foreground text-center m-0">{ displayCurrencyAndPrice(marker.default_currency!, geo?.currency!, `${marker.price}` ) }</span>
                                <Link href={`/find/${marker.id}`} 
                                    className='text-primary text-center w-full block p-2 text-base hover:scale-105 transition-transform '>
                                    See more details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))
            }
            <Marker position={[center.lat!, center.lon!]}>
                <Popup>
                    Your here!
                </Popup>
            </Marker>
            <Circle center={[ center.lat!, center.lon!]} radius={center.accuracy!} color='blue' weight={.6}/>
        </>
    )
}

export default MarkerList