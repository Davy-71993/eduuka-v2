
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Check, CircleHelp } from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'

type FormSelectProps = {
    options: { name: string, value: string }[],
    setter: (e: string) => void,
    value: string,
    label?: string,
    tip?: string,
    required?: boolean
}

type FormGroupProps = {
    children?: ReactNode,
    label?: string,
    className?: string,
    tip?: string,
    required?: boolean,
}

type TipProps = {
    tip?: string,
    disabled?: boolean,
    className?: string
}

type FormRadioGroupProps = {
    radios: string[],
    value: string,
    setter: (value: string)=> void,
    includeCustomField?: boolean
}

export const Tip = ({ tip, disabled, className }: TipProps) => {
    return (
      <TooltipProvider delayDuration={0}>
          <Tooltip>
              <TooltipTrigger className={cn(`bg-secondary ${ disabled ? 'text-primary/35' : 'text-primary'} hover:text-primary/65 text-lg p-1 sm:text-3xl font-thin transition-colors`, className)}>
                  <CircleHelp size={28} />
              </TooltipTrigger>
              {
                  tip &&
                  <TooltipContent side='left' className='p-5 w-full text-foreground text-lg font-[300] max-w-sm'>
                  <p>{ tip }</p>
                  </TooltipContent>
              }
          </Tooltip>
      </TooltipProvider>
    )
  }

export const FormGroup = ({ children, label, className, tip, required }: FormGroupProps) =>{
    return (
        <div className={cn("w-full max-w-lg mx-auto mt-5 bg-secondary relative border-2 border-primary rounded-sm h-14 sm:h-16", className)}>
            {
                label &&
                <Label className='px-3 absolute left-5 sm:text-lg -top-2 max-w-[70%] line-clamp-1 sm:-top-4 text-accent-foreground/50 bg-secondary'>
                    { label }
                    { " " }
                    {
                        required &&
                        <span className='text-red-600'>*</span>
                    }
                </Label>
            }
            { children }
            {
                tip &&
                <Tip tip={ tip } className='absolute -top-5 right-1' />
            }
        </div>
    )
}

export const FormSelect = ({ label, value, options, setter, tip, required }: FormSelectProps) =>{
  return (
    <FormGroup label={ label } tip={ tip } required={ required } className=''>
        <Select onValueChange={(e)=>{ setter(e)}} value={ value }>
            <SelectTrigger className="w-full sm:text-lg h-10 sm:h-12 px-8 py-1 bg-secondary border-none absolute left-0 bottom-0">
                <SelectValue />
            </SelectTrigger>
            <SelectContent className='p-5'>
                {
                    options.map((option, index) =><SelectItem key={ index } value={ option.value }>{ option.name }</SelectItem>)
                }
            </SelectContent>
        </Select>
    </FormGroup>
  )
}

export const FormRadioGroup = ({ radios, value, setter, includeCustomField }: FormRadioGroupProps) => {
    const [radioFields, setRadioFields] = useState(radios)

    const handleSetter = (selectedValue: string) => {
        if(radios.includes(selectedValue)){
            setRadioFields(radios)
        }

        setter(selectedValue)
    }

    const handleUseCustomRadio = (val: string)=>{
        if(!radios.includes(val.toLowerCase()) && val !== ''){
            setRadioFields([...radios, val.toLowerCase()])
        }else{
            setRadioFields(radios)
        }
        setter(val)
    }

    return (
        <>
            <RadioGroup value={ value ?? ''} onValueChange={(e)=>{ handleSetter(e) }} className='flex flex-col sm:flex-row py-5 sm:items-center h-fit sm:justify-between px-8 sm:space-x-2'>
            
                {
                    radioFields.map((radio, index) =>(
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={ radio } id={`r-${index}`} />
                            <Label htmlFor={`r-${index}`} className='capitalize'>{ radio }</Label>
                        </div>
                    ))
                }
            </RadioGroup>
            {
                includeCustomField &&
                <div className="sm:p-5 pt-10">
                    <Accordion type="single" collapsible className="w-full py-2 border-none bg-secondary rounded-sm">
                        <AccordionItem value="Sub-Categories" className='w-full border-none border-t px-2'>
                            <AccordionTrigger className="w-full text-sm sm:text-xl p-2 text-primary items-center hover:bg-secondary transition-all rounded-sm"><span>Add Custom Period</span></AccordionTrigger>
                            <AccordionContent className='flex flex-col space-y-2 py-3 px-1 items-center'>
                                <Input onChange={(e)=>{ handleUseCustomRadio(e.target.value)}} value={ radioFields[-1] } className='border border-primary bg-secondary'/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            }
        </>
    )
}

export const RenderExtraFields = ({fields, setter, initialData}: {fields: string, initialData: string, setter: (value:string) => void}) => {
    const fieldsArray = fields.split(',')
    const [fieldsObject, setFieldsObject] = useState<any>(()=>{
        if(!initialData) return;
        
        return JSON.parse(initialData)
    })
    // console.log(fieldsArray)

    useEffect(()=>{
        const jsonString = JSON.stringify(fieldsObject)
        setter(jsonString)
    }, [fieldsObject, setter])
    return (
        <FormGroup label='Ad Details' className='h-fit sm:h-fit py-5 flex flex-wrap gap-3 sm:gap-5 justify-center'>
            {
                fieldsArray.map((field, index)=>(
                    <div key={ index } className="w-fit flex flex-col items-center">
                        <Input 
                            className='border-b-2 rounded-none text-center w-36 bg-secondary' 
                            value={fieldsObject ? fieldsObject[field] ?? '' : ''} 
                            onChange={(e) => { setFieldsObject({...fieldsObject, [field]: e.target.value})} }/>
                        <Label className='text-accent-foreground/50 capitalize'>{ field }</Label>
                    </div>
                ))
            }
            <Button className='h-fit w-full max-w-44 mx-auto col-span-2 bg-primary/10 hover:bg-primary/30 text-accent-foreground'>Add Custom Field</Button>
        </FormGroup>
    )
}

