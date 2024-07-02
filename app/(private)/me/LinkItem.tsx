"use client"


import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentType } from 'react'

type Props = {
    href: string,
    name: string,
    Icon: ComponentType
}

export default function LinkItem({ href, name, Icon }: Props) {
    const pathname = usePathname()
    return (
        <Link href={href}>
            <div className={`text-xl font-bold items-center rounded-sm ${pathname === href ? 'bg-primary-foreground text-primary': ''} hover:bg-primary-foreground hover:text-primary p-2 transition-colors`}>
                <div className="w-fit flex">
                    <Icon />
                    <span className='ml-5 hiddable hidden md:flex'>{ name }</span>
                </div>
            </div>
        </Link>
    )
}

export  function MobileLinkItem({ href, name, Icon }: Props) {
    const pathname = usePathname()
    return (
        <Link href={href}>
            <h1 className={`flex text-xl font-bold items-center rounded-sm ${pathname === href ? 'bg-primary-foreground text-primary': ''} hover:bg-primary-foreground hover:text-primary p-2 transition-colors`}>
                <Icon />
                <span className='ml-5'>{ name }</span>
            </h1>
        </Link>
    )
}