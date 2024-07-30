import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { useEffect, useMemo, useState } from "react"
import LoadingDots from "../LoadingDots"
import Link from "next/link"


export default function MapDialog({ setter }: { setter: (lat: number, lon: number) => void }) {
    const [center, setCenter] = useState<{ lat: number, lon: number, accuracy: number } | null>(null)
    useEffect(()=>{
        if(!navigator.geolocation){
            return
        }
        navigator.geolocation.getCurrentPosition((result)=>{
            setCenter({
                lat: result.coords.latitude,
                lon: result.coords.longitude,
                accuracy: result.coords.accuracy
            })
        })
    }, [])
    if(!center){
        return (
            <div className="w-full h-full border-2 flex justify-center items-center">
                <LoadingDots />
            </div>
        )
    }


  return (
    <div className="w-full h-full relative ">
        <div className="absolute right-0 bottom-0 w-1/2 min-w-60 py-1 px-10 bg-primary z-[100000] text-center">
            <h1 className="text-muted text-sm">Maps by <Link href={'https:www.dolinesystems.com'} className="hover:font-bold">Doline Sysytems</Link></h1>
        </div>
        <MapContainer className="h-full w-full relative" center={[center.lat, center.lon]} zoom={14} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker lat={ center.lat } lon={ center.lon } setter={ setter }/>
        </MapContainer>
    </div>
  )
}

const LocationMarker = ({ lat, lon, setter }:{lat: number, lon: number, setter: (lat:number, lon:number)=> void }) => {
    const [position, setPosition] = useState({lat, lon})
    const map = useMap()

    const eventHandlers = useMemo(
        () => ({
          dragend(e: any) {
            const latlng = e.target._latlng
            setPosition({ lat: latlng.lat, lon: latlng.lng})
          },
        }),
    [],)

    useEffect(()=>{
        setter(position.lat, position.lon)
        map.flyTo([position.lat, position.lon], map.getZoom())
    }, [position, map, setter])
    return (
        <Marker 
            draggable
            eventHandlers={eventHandlers}
            position={[position.lat, position.lon]} >
            <Popup>
                You are approximately here. Drag the pointer to change to a more accurate location.
            </Popup>
        </Marker>
    )
}