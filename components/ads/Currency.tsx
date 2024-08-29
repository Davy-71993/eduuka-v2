
import { useContext } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { AppContext } from '@/context/Appcontext'

type Props = {
    currency: string
}

export default function Currency({ currency }: Props) {
    const { geoData, setState } = useContext(AppContext)
  return (
    <div className="flex w-fit gap-5">
        <Select value={ currency } onValueChange={ (selectedCurrency)=>{
            setState({value: {...geoData, currency: selectedCurrency}, key: 'geoData'})
        } }>
            <SelectTrigger className="w-fit">
                <SelectValue placeholder={ currency } />
            </SelectTrigger>
            <SelectContent className='p-5 mr-5'>
                <SelectItem value="UGX">UGX</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="KSH">KSH</SelectItem>
                <SelectItem value="TSH">TSH</SelectItem>
            </SelectContent>
        </Select>
    </div>
  )
}