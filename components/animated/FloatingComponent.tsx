"use client"

import React, { ReactNode, useCallback, useEffect, useRef } from 'react'

type Props = {
  children?: ReactNode
}

export default function FloatingComponent({ children }: Props) {

  const sidePaneRef = useRef<HTMLDivElement>(null)

  const calcWidth = useCallback(() => {
    const pane = sidePaneRef.current
    const parent = pane?.parentElement
    if(!pane) return
    pane.style.width = `${parent?.clientWidth}px`
  }, [])

  useEffect(()=>{
    calcWidth()
    window.addEventListener('load', calcWidth)
    window.addEventListener('resize', calcWidth)
    return ()=>{
      window.removeEventListener('load', calcWidth)
      window.removeEventListener('resize', calcWidth)
    }
  }, [calcWidth])

  return (
    <div ref={sidePaneRef} id="sidePane" className="fixed z-50">
      { children }
    </div>
  )
}