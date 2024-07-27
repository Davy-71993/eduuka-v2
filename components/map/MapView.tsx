import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, TileLayer } from "react-leaflet"
import MarkerList from "./MarkerList"
import { useEffect, useState } from "react"
import LoadingDots from "../LoadingDots"
import { useFetchAds, useGeoData } from "@/lib/hooks"
import Link from "next/link"
import { Location } from "@/lib/types"
import { useSearchParams } from "next/navigation"


export default function MapView() {
    const searchParams = useSearchParams()

    const [center, setCenter] = useState<Location | null>(null)

    const { ads } = useFetchAds(searchParams.get('c') as string, searchParams.get('sc') as string)
    const geoData = useGeoData()
    useEffect(()=>{
        if(geoData){
            setCenter({lat: geoData.location?.lat!, lon: geoData.location?.lon!, accuracy: geoData.location?.accuracy!})
        }
    }, [ads, geoData])

    if(!center){
        return (
            <div className="w-full h-[70vh] border-2 flex justify-center items-center">
                <LoadingDots />
            </div>
        )
    }

  return (
    <div className="w-full h-[70vh] relative ">
        <div className="absolute right-0 bottom-0 w-1/2 min-w-60 py-1 px-10 bg-primary z-[100000] text-center">
            <h1 className="text-muted text-sm">Maps by <Link href={'https:www.dolinesystems.com'} className="hover:font-bold">Doline Systems</Link></h1>
        </div>
        <MapContainer className="h-full w-full relative" center={[center.lat!, center.lon!]} zoom={8} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerList ads={ ads } center={ center } />
        </MapContainer>
    </div>
  )
}