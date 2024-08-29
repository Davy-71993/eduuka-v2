"use client"

import { Distance, OrderBy, PriceRange } from './Filters'
import { Button } from '../ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import { useFilters, useSearch } from '@/lib/hooks'
import Link from 'next/link'
import { ScrollArea } from '../ui/scroll-area'
import { Category, SubCategory } from '@/lib/types'
import { useCallback, useEffect, useState } from 'react'
import { toQueryString, toNumber } from '@/lib/utils'

type Props = {
  colapsble?: boolean
}

export  const  HomeFiltersContainer = ({ colapsble=false }: Props) => {
  const [open, setOpen] = useState(false)
  const pathName = usePathname()
  const [filters, setFilters] = useState<any>()
  const queryString = useSearch(filters)
  const openClose = useCallback(()=>{
    setOpen(!open)
  }, [open])
  return (
    <div className='w-full relative'>
      <Button onClick={ openClose } size={'lg'} className='font-bold text-xl w-full justify-between'>
        <span>Extra Filters</span>
        <ChevronDown size={25} className={`${open ? '-rotate-180' : ''} transition-transform`} />
      </Button>
      <div className={`flex flex-col gap-5 w-full min-h-[72vh] h-full shadow-lg py-5 absolute top-14 left-0 z-50 rounded-sm bg-secondary ${ colapsble ? (open ? '' : 'hidden') : ''}`}>
        <PriceRange setter={ setFilters } />
        <OrderBy setter={ setFilters } />
        <Distance setter={ setFilters } />
        <Link href={`${pathName}${queryString}`} className='block w-full max-w-[90%] mx-auto'>
        <Button className='w-full text-xl'>Apply Filters</Button>
        </Link>
      </div>
    </div>
  )
}

export const MapCategoryFilter = ({ categories }: { categories: Category[] }) => {
  
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [subCategories, setSubCategories] = useState<SubCategory[]>()
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory>()

  const params = useFilters()
  
  useEffect(()=>{
    const cat = params.cid
    const cate = categories.find(c => toNumber(c.id) === toNumber(cat))
    setSelectedCategory(cate)
    if(cate){
      const scate = cate.sub_categories?.find(sc => toNumber(sc.id) === toNumber(params.scid))
      setSelectedSubCategory(scate)
      setSubCategories(cate.sub_categories)
    }else{
      setSubCategories(undefined)
    }
  }, [params, categories])

  return (
    <div className="flex flex-col h-full bg-primary w-full rounded-sm overflow-hidden">
      <p className='w-full px-5 py-2 text-muted text-2xl line-clamp-1'>Filter by Category</p>
      <ScrollArea className='h-[70vh] w-full'>
          <div className='h-max w-full'>
            <div className="flex flex-col h-full w-full pb-5 px-3">
            {
              !selectedCategory 
              ?
              categories.map((category, index) => (
                <Link key={ index } href={`/map${ toQueryString({...params, cid: category.id}) }`}>
                  <Button
                    className='w-full rounded px-2 py-1 text-lg text-muted hover:bg-background hover:text-primary justify-start'>{ category.name }</Button>
                </Link>
              ))
              :
              <div className="flex flex-col gap-1 w-full">
                <div className="flex bg-background/95 rounded w-full items-center text-primary overflow-hidden">
                  <Link href={`/map`} className='w-fit hover:bg-background h-full py-1 px-3'>
                      <ChevronLeft size={28} />
                  </Link>
                  <Link  
                    href={`/map${toQueryString({...params, cid: selectedCategory.id, scid: undefined})}`}
                    className='w-full line-clamp-1 py-1 px-3 text-primary text-left hover:bg-background'
                  >
                    { selectedCategory.name }
                  </Link>
                </div>
                {
                  subCategories?.map((subCategory, index) => (
                    <Link key={ index } href={`/map${toQueryString({...params, scid: subCategory.id})}`}>
                      <p 
                        className={`w-full line-clamp-1 rounded px-2 py-1 text-lg text-muted hover:bg-background hover:text-primary ${ selectedSubCategory === subCategory && 'bg-background text-primary'}`}>
                        { subCategory.name }
                      </p>
                    </Link>
                  ))
                }
              </div>
            }
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
