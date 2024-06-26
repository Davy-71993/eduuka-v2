import React from 'react'
import Container from './Container'
import Link from 'next/link'
import Nav from './mobile/Nav'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { fetchCategories } from '@/lib/db/api'

type Props = {}

export default async function NavBar({}: Props) {
 
  const supabase = createClient(cookies())
  const { data, error } = await supabase.auth.getUser()

  const categories = await fetchCategories(supabase)

  return (
    <div className='w-full bg-primary text-primary-foreground py-3 sm:py-5 drop-shadow-lg z-10 fixed top-0 right-0'>
        <Container clasName="h-full">
            <div className="flex justify-between">
              <Link href={'/'}>
                <button className="bg-primary-foreground px-3 py-1 sm:text-2xl sm:py-2 rounded font-bold text-xl text-primary">DUUKA</button>
              </Link>
              <div className="flex w-full justify-end space-x-5 items-center">
                <Nav categories={ categories } authenticated={ data.user && data.user !== null || false}/>
                <Link href="/me/ads/create">
                  <Button className='border-2 py-3 rounded hidden md:flex hover:bg-primary-foreground border-primary-foreground hover:text-primary sm:text-2xl sm:py-4 '><Plus/><span>Post Ad</span></Button>
                </Link>
              </div>
            </div>
        </Container>
    </div>
  )
}