import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { CircleHelp } from 'lucide-react'
  

type Props = {
    tip?: string,
    disabled?: boolean
}

export default function Tip({ tip, disabled }: Props) {
  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger className={`${ disabled ? 'text-primary/35' : 'text-primary/65'} hover:text-primary font-thin transition-colors`}>
                <CircleHelp size={28}/>
            </TooltipTrigger>
            {
                tip &&
                <TooltipContent side='left'>
                <p>{ tip }</p>
                </TooltipContent>
            }
        </Tooltip>
    </TooltipProvider>
  )
}