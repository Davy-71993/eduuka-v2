import React, { useCallback, useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { Distance, OrderBy, PriceRange } from '../filtering/Filters'
import { Category, SubCategory } from '@/lib/types'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { NavigationMenuLink } from '../ui/navigation-menu'

type Props = {
    categories: Category[]
}

export default function MobileFilters({ categories }: Props) {
    
    const [content, setContent] = useState('categories')
  return (
    <div className="flex flex-col h-full w-full">
        <div className="flex w-full">
            <Button onClick={()=>{ setContent('categories')}} className={`bg-transparent text-primary ${ content === 'categories' ? 'bg-secondary' : '' } text-xl rounded-none hover:bg-secondary text-center w-full`}>Categories</Button>
            <Button onClick={()=>{ setContent('filters')}} className={`bg-transparent text-primary ${ content === 'filters' ? 'bg-secondary' : '' } text-xl rounded-none hover:bg-secondary text-center w-full`}>Filters</Button>
        </div>

        <ScrollArea className='h-[70vh] w-full'>
            <div className='h-max w-full'>
                { 
                    content === 'categories' ? <Categories categories={ categories } /> : <Filters />
                }
            </div>
        </ScrollArea>
    </div>
  )
}

const Filters = () => {
    return(
        <div className="flex flex-col gap-5 w-full py-5 rounded-b-sm bg-secondary">
            <PriceRange  />
            <OrderBy />
            <Distance  />
            <Button className='text-xl w-[90%] mx-auto'>Apply Filters</Button>
        </div>
    )
}

const Categories = ({ categories }: { categories: Category[]}) => {
    const [subCategories, setSubCategories] = useState<SubCategory[]>()
    const [selected, setSelected] = useState<Category>()

    useEffect(()=>{
        setSubCategories(selected?.sub_categories)
    } , [selected])
    return(
        <div className="flex flex-col w-full pb-5 rounded-b-sm bg-secondary overflow-hidden">
            {
                !selected 
                ?
                categories.map((category, index) => (
                    <div onClick={ ()=>{ setSelected(category) } } key={index} className='px-5 py-1 text-xl cursor-pointer hover:text-primary transition-colors'>{ category.name}</div>
                ))
                :
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex w-full items-center px-2 gap-3">
                        <div 
                            onClick={()=>{ setSelected(undefined) }} 
                            className='bg-primary rounded-full text-background h-8 w-8 flex justify-center items-center'
                        >
                            <ChevronLeft size={28} />
                        </div>
                        <NavigationMenuLink asChild>
                            <Link href={`/categories/${selected.slug}`}>
                                <p className='flex-1 text-center w-full line-clamp-1 text-xl font-bold text-primary'>
                                    { selected.name }
                                </p>
                            </Link>
                        </NavigationMenuLink>
                    </div>
                    {
                        subCategories?.map((subCategory, index) => (
                            <NavigationMenuLink key={index} asChild>
                                <Link href={`/categories/${selected.slug}/${subCategory.slug}`}>
                                    <p className='px-5 py-1 text-xl hover:text-primary'>{ subCategory.name}</p>
                                </Link>
                            </NavigationMenuLink>
                        ))
                    }
                </div>
            }
        </div>
    )
}