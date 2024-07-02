"use client"

import React, { useEffect, useState } from 'react'
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
    const [value, setValue] = useState('')
    useEffect(()=>{ onSelect(value)}, [value, onSelect])
  return (
    <Select disabled = { disabled } value={ value } onValueChange={ (e)=>setValue(e) }>
        <SelectTrigger className={ `${className}` }>
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