import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode,
    clasName?: string
}

export default function Container({ children, clasName }: Props) {
  return (
    <div className={`px-3 sm:px-10 md:px-14 lg:px-32 xl:px-52 ${ clasName }`}>
        { children }
    </div>
  )
}