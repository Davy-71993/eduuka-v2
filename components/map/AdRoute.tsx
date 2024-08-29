import { Ad, Location } from '@/lib/types'
import { calcDistance, toNumber } from '@/lib/utils'
import { LatLng, Circle as LeafletCircle } from 'leaflet'
import React, { useCallback, useEffect } from 'react'
import { useMap } from 'react-leaflet'
import AdMarker from './AdMarker'
import PositionMarker from './PositionMarker'

type Props = {
    ad: Ad,
    position: Location,
    currency: string
}

export default function AdRoute({ ad, position, currency }: Props) {
    const map = useMap()
    const calcCenter = useCallback(()=> {
        const avLat = (toNumber(ad.lat)+toNumber(position.lat))/2
        const avLon = (toNumber(ad.long) + toNumber(position.lon))/2
        return new LatLng(avLat, avLon)
    }, [position, ad.lat, ad.long])

    useEffect(() => {
        let diameter = calcDistance(position, {lat: toNumber(ad.lat), lon: toNumber(ad.long)}, "K")
        if(!diameter) return
        const circleCenter = calcCenter()
        diameter = diameter*1000
        const radius = (diameter/2)*(3/2)
        const leafletCircle = new LeafletCircle(circleCenter, {
            radius,
            fill: false,
            stroke: false,
            opacity: 0
        })

        const circle = leafletCircle.addTo(map)

        const bounding = circle.getBounds()

        map.fitBounds(bounding, {
            animate: true
        })
    }, [ad, map, calcCenter, position])

    return (
        <>
            <AdMarker ad={ad} currency={currency} single />
            <PositionMarker position={ position } showPopup />
        </>
    )
}