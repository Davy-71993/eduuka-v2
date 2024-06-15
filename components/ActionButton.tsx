import React, { ComponentType } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function ActionButton({
    
    title,
    action,
    className,
    Icon,
    variant
    }: {
    title: string,
    className?: string,
    action: () => void  
    Icon?: ComponentType
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}) {
  return (
    <Button variant={variant} size="sm" onClick={action} className={cn(Icon && 'flex space-x-2 items-center', className)}>
        {
            Icon &&
            <Icon  />
        }
        <span className='line-clamp-1'>{title}</span>
    </Button>
  )
}