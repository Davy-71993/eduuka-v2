"use client"
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useSearchQuery } from '@/lib/hooks'

type Props = {}

export default function Page({}: Props){
    return (
        <Container clasName='pt-5 flex flex-col gap-10 justify-center items-center min-h-[60vh]'>
            <div className="flex gap-5 p-5">
            </div>
            <div className="flex gap-5 p-5">
            </div>
            {/* <Button >{ loading ? "Tests Loading" : "Test" }</Button> */}
        </Container>
    )
}