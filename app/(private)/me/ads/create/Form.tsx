"use client"


import { SelectField } from '@/components/post_ad/Field'
import { Category } from '@/lib/types'
import React, { useState } from 'react'

type Props = {
    categories?: Category[]
}

export default function Form({ categories }: Props) {
    // The state for the form
    const [selectedCategory, setSelectedCategory] = useState<Category>()

    const category_options = categories?.map( category => ({
        option: category.name,
        value: category.id ?? ''
    }))
    // console.log(options)
    return (
        <div className='p-5 w-full'>
            <div className="flex flex-col space-y-10">
                <SelectField options={ category_options} required label='Select Category' onChange = { (e: any) => { console.log(e)} } />
                <SelectField onChange={() => {}} disabled={!selectedCategory} options={ category_options} required label='Select Sub-Category' />
            </div>
        </div>
    )
}