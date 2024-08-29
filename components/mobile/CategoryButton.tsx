import { Category } from '@/lib/types'
import Link from 'next/link'
import React, { useState } from 'react'
import { PiArrowUpRight } from 'react-icons/pi'

type Props = {
    setSelected: (c: Category)=>void,
    category: Category
}

export default function CategoryButton({setSelected, category}: Props) {
    const [hidden, setHidden] = useState('hidden')
  return (
    <div onMouseEnter={ ()=>{setHidden('')} } onMouseLeave={()=>{ setHidden('hidden')}} className='text-lg cursor-pointer flex hover:bg-primary/10 transition-colors'>
        <span onClick={ ()=>{ setSelected(category) } } className='w-full px-5 py-1  hover:bg-primary/20'>
            { category.name}
        </span>
        <Link href={`/categories/${category.slug}`} className={ `${hidden} hover:bg-primary/20 max-w-fit relative px-5 text-teal-700 flex justify-start items-center` }>
            <PiArrowUpRight size={30}/>
        </Link>
    </div>
  )
}