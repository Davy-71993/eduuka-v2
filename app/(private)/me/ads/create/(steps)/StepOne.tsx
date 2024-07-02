import React, { useEffect, useState } from 'react'
import { FormGroup, FormSelect } from '../fields'
import { AdData, Category, SubCategory } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {  ArrowBigRight, ArrowRight, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

type Props = {
    categories: Category[]
}

export default function StepOne({ categories }: Props) {

    useEffect(()=>{
        const item = localStorage.getItem('ad_data') ?? '{}'
        const initialState: AdData = JSON.parse(item)
        
        setData(initialState)
        setCategoryValue(initialState.category?.id?? '')
        setSubCategoryValue(initialState.sub_category?.id?? '')
    }, [])
    const [data, setData] = useState({})
    const [categoryValue, setCategoryValue] = useState('')
    const [category, setCategory] = useState<Category>()
    const [subCategoryValue, setSubCategoryValue] = useState('')
    const [subCategory, setSubCategory] = useState<SubCategory>()
    
    const [errors, setErrors] = useState<{} | null>(null)

    const router = useRouter()

    useEffect(()=>{
        const category = categories.find(cat => cat.id === categoryValue)
        setCategory(category)
    }, [ categoryValue ])

    useEffect(()=>{
        if(!category){
            setSubCategory(undefined)
            return
        }
        const subCategory = category.sub_categories?.find(subCat => subCat.id === subCategoryValue)
        setSubCategory(subCategory)
    }, [ subCategoryValue, category ])

    const navigateToNextPage = () =>{
        const errors = validateStep()

        if(!errors){
            localStorage.setItem('ad_data', JSON.stringify({
                ...data,
                category, sub_category: subCategory
            }))

           router.push('?cp=2') 
        }
    }

    const validateStep = () => {
        !category && setErrors({...errors, category: ""})
        !subCategory && setErrors({...errors, subCategory: ""})

        return errors
    }

    const handleClear = () => {
        localStorage.removeItem('ad_data')
        setCategoryValue('')
        setSubCategoryValue('')
    }

  return (
    <>
        <FormSelect 
            label='Select your Advert Category'
            value={ categoryValue } 
            setter={ setCategoryValue } 
            options={ categories.map((cat)=>({ name: cat.name ?? '', value: cat.id ?? '' }))} 
            tip='Start with selecting the category that is applicable to your product or service.'
            required
        />
        {
            category &&
            <FormSelect 
                label={ `Select Sub-category from ${ category?.name }` }
                value={ subCategoryValue } 
                setter={ setSubCategoryValue } 
                options={ category?.sub_categories?.map((cat)=>({ name: cat.name ?? '', value: cat.id ?? '' }))?? []} 
                required
                tip='Select the sub category of your product or service. This should in the context of the category you selected above'
            />
        }
        <div className="flex justify-between items-center py-3 max-w-lg mx-auto w-full">
            <ClearButton onClear = { handleClear } />
            <Button disabled={ !category || !subCategory } onClick={ navigateToNextPage } className='flex space-x-3 font-bold text-lg' >Next Page<ArrowBigRight /></Button>
        </div>
    </>
  )
}

export const ClearButton = ({ onClear }: { onClear: ()=> void}) => {

    return (
        <Dialog>
            <DialogTrigger className='bg-red-500 font-bold flex text-primary-foreground rounded-sm py-2 px-4 space-x-3 hover:bg-red-600' >
                <Trash size={20} /> Clear Form
            </DialogTrigger>
            <DialogContent className="w-[80%] mx-auto max-w-lg rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Clear Form</DialogTitle>
                    <DialogDescription>
                        You are deleting all the data you had saved for your ad sofar.
                        A you sure you want to clear the form ?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0 w-full">
                    <DialogClose className='w-full flex font-bold border-2 border-primary hover:bg-primary/20 text-primary rounded-sm py-2 px-4 justify-center space-x-3 transition-colors'>
                        Cancel
                    </DialogClose>
                    <DialogClose onClick={ onClear  } className='bg-red-500 font-bold flex text-primary-foreground w-full justify-center rounded-sm py-2 transition-colors px-4 space-x-3 hover:bg-red-600'>
                       <Trash  size={20} className='mr-3'/>Clear
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}