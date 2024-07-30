"use client"

import React, { ReactNode } from 'react'
import AppContextProvider from './Appcontext'

type Props = {
    children?: ReactNode
}

export default function WithContext({ children }: Props) {
  return (
    <AppContextProvider>
        { children }
    </AppContextProvider>
  )
}