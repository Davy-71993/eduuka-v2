
import { Ad } from '@/lib/types'
import PriceMenu from './PriceMenu'
import { displayCurrencyAndPrice } from '@/lib/utils'

type Props = {
    data: Ad,
    currency: string,
    className?: string
}

export default function PriceTag({ data, currency, className }: Props) {
    
    switch (data.pricing_scheme?.toLowerCase()) {
        case 'fixed price':
            return (
                <h4 className={`text-primary font-bold text-lg md:text-xl ${className}`}>
                    { displayCurrencyAndPrice(data.default_currency!, currency, `${data.price}`) }
                </h4>
            )
        case 'periodic price':
            return(
                <h4 className={`text-primary font-bold text-lg md:text-xl ${className}`}>
                    { displayCurrencyAndPrice(data.default_currency!, currency, `${data.price}`) + "  " + data.pricing_period }
                </h4>
            )
        
        case 'price range':
            return (
                <h4 className={`text-primary font-bold text-lg md:text-xl ${className}`}>
                    { displayCurrencyAndPrice(data.default_currency!, currency, `${data.min_price}`) + " - " + displayCurrencyAndPrice(data.default_currency!, currency, `${data.max_price}`) }
                </h4>
            )
        
        case 'price menu':
            return (
                <PriceMenu ad_currency={data.default_currency!} requested_currency={currency}  ad_id={ data.id }/>
            )
    
        default:
            return (
                <div>No Pricing</div>
            );
    }
  
}