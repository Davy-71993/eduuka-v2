import React from 'react'
import { Label } from '../ui/label'
import DefaultSelect from '../Select'
import Tip from './Tip'

type Props = {
    options: any,
    label?: string,
    required?: boolean,
    disabled?: boolean,
    onChange: (e: any)=> void
}

export const SelectField = ({ options, label, required, disabled, onChange }: Props) => {
    
  return (
    <div className={`w-full max-w-lg mx-auto flex space-x-2 justify-end ${ disabled ? 'text-accent-foreground/35' : 'text-accent-foreground'}`}>
        <div className="relative w-full">
            {
                label &&
                <Label className='bg-background p-2 pb-1 text-xl left-5 font-thin -top-[1.4rem] absolute'>
                    { label + " "} 
                    { required && <span className={`${ disabled ? 'text-red-600/35' : 'text-red-600'}`}>*</span> }
                </Label>
            }
            <DefaultSelect onSelect={ (e: any) => { onChange(e)} } disabled={ disabled} options={ options } className={`border text-lg ${ disabled ? 'border-primary/35' : 'border-primary'} rounded-sm py-3 h-fit pl-6`} />
        </div>
        <Tip disabled={ disabled }/>
    </div>
  )
}