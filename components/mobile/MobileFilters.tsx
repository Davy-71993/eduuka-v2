import React, { useCallback, useEffect, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { Category, SubCategory } from '@/lib/types'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { NavigationMenuLink } from '../ui/navigation-menu'
import { useSearch } from '@/lib/hooks'
import { usePathname } from 'next/navigation'
import CategoryButton from './CategoryButton'
import { HomeFiltersContainer } from '../filtering/FilterContainers'

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
                    content === 'categories' ? <Categories categories={ categories } /> : <HomeFiltersContainer />
                }
            </div>
        </ScrollArea>
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
        <div className="flex flex-col h-full w-full pb-5 rounded-b-sm bg-secondary overflow-hidden">
            {
                !selected 
                ?
                categories.map((category, index) => (
                    <CategoryButton key={ index } category={ category } setSelected={ setSelected } />
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
                                <p className='flex-1 text-center w-full line-clamp-1 text-lg font-bold text-primary'>
                                    { selected.name }
                                </p>
                            </Link>
                        </NavigationMenuLink>
                    </div>
                    {
                        subCategories?.map((subCategory, index) => (
                            <NavigationMenuLink key={index} asChild>
                                <Link href={`/categories/${selected.slug}/${subCategory.slug}`}>
                                    <p className='px-5 py-1 text-lg hover:text-primary'>{ subCategory.name}</p>
                                </Link>
                            </NavigationMenuLink>
                        ))
                    }
                </div>
            }
        </div>
    )
}