
import { Ad, Location } from '@/lib/types'
import { useContext } from 'react'
import { AppContext } from '@/context/Appcontext'
import PositionMarker from './PositionMarker'
import AdMarker from './AdMarker'

 export default function MarkerList({ center, ads }: { center: Location, ads: Ad[]}){
    const { geoData } = useContext(AppContext)
    
    return (
        <>
            {
                ads.map((ad, index) => (
                    <AdMarker ad={ad} key={ index} currency={geoData?.currency??"USD"} />
                ))
            }
            <PositionMarker position={ center } />
        </>
    )
}