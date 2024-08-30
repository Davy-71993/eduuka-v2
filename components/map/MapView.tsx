import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, TileLayer } from "react-leaflet"
import MarkerList from "./MarkerList"
import { useContext, useEffect, useState } from "react"
import LoadingDots from "../LoadingDots"
import { Ad, Location } from "@/lib/types"
import { AppContext } from "@/context/Appcontext"
import AdRoute from "./AdRoute"

type Props = {
    ads?: Ad[],
    ad?: Ad,
    loading?: boolean
}
export default function MapView({ ads, ad, loading }: Props) {

    const [center, setCenter] = useState<Location | null>(null)
    const {geoData} = useContext(AppContext)

    useEffect(()=>{
        if(geoData){
            setCenter({lat: geoData.location?.lat!, lon: geoData.location?.lon!, accuracy: geoData.location?.accuracy!})
        }
    }, [ads, geoData])

    if(!center || loading){
        return (
            <div className="w-full rounded-sm h-[75vh] border-2 flex justify-center items-center">
                <LoadingDots />
            </div>
        )
    }

  return (
    <div className="w-full h-[75vh] rounded-sm overflow-hidden">
        <MapContainer className="h-full w-full" center={[center.lat!, center.lon!]} zoom={8} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                ads &&
                <MarkerList ads={ ads } center={ center }/>
            }
            {
                ad &&
                <AdRoute ad={ ad } currency={ geoData?.currency??"USD"} position={ center } />
            }
        </MapContainer>
    </div>
  )
}