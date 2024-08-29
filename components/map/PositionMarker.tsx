import React, { useEffect, useRef } from 'react'
import { Location } from '@/lib/types'
import { Circle, Marker, Popup } from 'react-leaflet'
import { Marker as LeafletMarker } from 'leaflet'

type Props = {
    position: Location,
    showPopup?: boolean
}

export default function PositionMarker({ position, showPopup }: Props) {

    const myMarkerRef = useRef<LeafletMarker>(null)

    useEffect(()=>{
        if(!showPopup){
            return
        }
        const marker = myMarkerRef.current
        
		if (marker ) {
			marker.openPopup()
		}
    }, [showPopup])
    return (
        <>
            <Marker position={[position.lat!, position.lon!]} ref={ myMarkerRef }>
                <Popup autoClose={false}>
                    Your here!
                </Popup>
            </Marker>
            <Circle center={[ position.lat!, position.lon!]} radius={position.accuracy!} color='blue' weight={.6}/> 
        </>
    )
}