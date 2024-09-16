import React from 'react'
import Container from './Container'
import Link from 'next/link'
import Nav from './mobile/Nav'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { getCategories } from '@/lib/actions/db_actions'

type Props = {}

export default async function NavBar({}: Props) {
  const categories = await getCategories()
  return (
    <div className='w-full bg-primary text-primary-foreground py-3 sm:py-5 drop-shadow-lg z-[10000] fixed top-0 right-0'>
        <Container clasName="h-full">
            <div className="flex justify-between">
              <Link href={'/'}>
                <button className="bg-primary-foreground px-3 py-1 sm:text-2xl sm:py-2 rounded font-bold text-xl text-primary">DUUKA</button>
              </Link>
              <div className="flex w-full justify-end space-x-5 items-center">
                <Nav categories={ categories } />
                <Link href="/me/ads/create" className='hidden md:flex'>
                  <Button className='border-2 py-3 rounded hover:bg-primary-foreground border-primary-foreground hover:text-primary sm:text-2xl sm:py-4 '><Plus/><span>Post Ad</span></Button>
                </Link>
              </div>
            </div>
        </Container>
    </div>
  )
}