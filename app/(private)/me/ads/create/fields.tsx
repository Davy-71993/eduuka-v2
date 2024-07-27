
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MenuItem } from '@/lib/types'
import { cn, displayCurrencyAndPrice } from '@/lib/utils'
import { CircleHelp, X } from 'lucide-react'
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
    const [fieldsArray, setFieldsArray] = useState(()=>{
        if(!initialData) return fields.split(',')
        let ar: string[] = []

        for (const key in JSON.parse(initialData)) {
            ar.push(key)
        }

        return ar
    })
    const [fieldsObject, setFieldsObject] = useState<any>(()=>{
        if(!initialData) return;
        
        return JSON.parse(initialData)
    })
    const [newField, setNewField] = useState<{field?: string, value?: string}>()
    // console.log(fieldsArray)

    useEffect(()=>{
        const jsonString = JSON.stringify(fieldsObject)
        setter(jsonString)
    }, [fieldsObject, setter])

    const saveNewField = () => {
        if(newField?.field && newField.value){
            fieldsArray.push(newField.field)
            setFieldsObject({...fieldsObject, [newField.field]: newField.value })
        }
    }
   
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='h-fit w-full max-w-44 mx-auto col-span-2 bg-primary/10 hover:bg-primary/30 text-accent-foreground'>Add Custom Field</Button>
                </DialogTrigger>
                <DialogContent>
                    <p className="text-center text-xl text-muted-foreground">Create Your field here</p>
                    <div className="flex flex-col gap-3 py-5">
                        <div className="w-full max-w-lg mx-auto mt-5 relative border-2 border-primary rounded-sm p-3">
                            <Label className='px-3 absolute left-5 sm:text-lg -top-2 max-w-[70%] line-clamp-1 sm:-top-4 text-accent-foreground/50 bg-background'>
                                Field Name:
                            </Label>
                            <Input 
                                className='text-lg' 
                                value={ newField?.field ?? '' } 
                                onChange={(e)=>{ setNewField({...newField, field: e.target.value})}} />
                            <Tip tip="" className='absolute -top-5 right-1 bg-background' />
                        </div>
                        <div className="w-full max-w-lg mx-auto mt-5 relative border-2 border-primary rounded-sm p-3">
                            <Label className='px-3 absolute left-5 sm:text-lg -top-2 max-w-[70%] line-clamp-1 sm:-top-4 text-accent-foreground/50 bg-background'>
                                Field Value:
                            </Label>
                            <Input 
                                className='text-lg' 
                                value={ newField?.value ?? '' } 
                                onChange={(e)=>{ setNewField({...newField, value: e.target.value })}} />
                            <Tip tip="" className='absolute -top-5 right-1 bg-background' />
                        </div>
                        <DialogFooter className='flex justify-between w-full pt-10 max-w-lg mx-auto'>
                            <DialogClose className='bg-destructive text-primary-foreground px-5 py-3 text-lg rounded-sm'>
                                Cancle
                            </DialogClose>
                            <DialogClose 
                                onClick={ saveNewField }
                                className='bg-primary text-primary-foreground px-5 py-3 text-lg rounded-sm'>
                                Save
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </FormGroup>
    )
}

export const MenuPriceItem = ({ item, default_currency, onclose }: { item: MenuItem, default_currency: string, onclose:(e: MenuItem)=> void }) => {
    const [hidden, setHidden] = useState('hidden')
     return (
        <div onMouseLeave={ ()=>{ setHidden('hidden') } } onMouseEnter={ ()=>{ setHidden('') } } className="gap-1 w-full border rounded-sm px-3 py-4 hover:bg-primary/15 bg-primary/10 relative mt-5">
            <X size={24}
                onClick={ ()=>{onclose(item)} } 
                className={`border ${hidden} border-destructive absolute -top-2 -right-2 self-end rounded-full text-destructive`} />
            <div className="flex gap-2 w-full ">
                <p className="text-lg w-full">{ item.item } {`->`}</p> 
                <h1 className="text-lg w-full text-right">{displayCurrencyAndPrice(default_currency, default_currency, item.price!)}</h1>
            </div>
        </div>
     )
}

