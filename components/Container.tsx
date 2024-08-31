import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode,
    clasName?: string,
    id?: string
}

export default function Container({ children, clasName, id }: Props) {
  return (
    <div id={id} className={`w-full px-5 max-w-[90rem] mx-auto ${ clasName }`}>
        { children }
    </div>
  )
}

// px-3 sm:px-10 md:px-14 lg:px-32 xl:px-52