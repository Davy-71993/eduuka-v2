import React from 'react'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from './ui/select'

type Props = {
    options?: {
        option: string,
        value: string
    }[],
    placeholder?: string,
    className?: string
    disabled?:  boolean,
    onSelect: (e: any) => void
}

export default function DefaultSelect({ options, placeholder, className, disabled, onSelect }: Props) {
  return (
    <Select disabled = { disabled }>
        <SelectTrigger className={ `${className}` } onChange={ (e: any)=>{onSelect(e.target.value)} }>
            <SelectValue placeholder={ placeholder } className='' />
        </SelectTrigger>
        <SelectContent className="w-full">
            {
                options?.map((option, index) =>(
                    <SelectItem key={ index } value={ option.value }>{ option.option }</SelectItem>
                ))
            }
        </SelectContent>
    </Select>
  )
}