import React from 'react'

type Props = {
    className?: string
    size?: 'sm' | 'md' | 'lg'
    text?: string
    variant?: 'success' | 'warning' | 'danger' | 'primary'
}

export default function Spinner({ className, size, variant, text }: Props) {
    const cn = ()=>{
        let s, v, b, t = ''

        switch (size) {
            case 'sm':
                s =  'h-6 w-6' 
                b = 'border-[3px]'
                t += ' text-sm'
                break;
            case 'md':
                s =  'h-8 w-8' 
                b = 'border-[5px]'
                t += ' text-base'
                break;
            case 'lg':
                s =  'h-14 w-14'
                b = 'border-[8px]' 
                t += ' text-xl'
                break;
        
            default:
                s =  'h-10 w-10'
                b = 'border-[5px]' 
                t += ' text-base'
                break;
        }

        switch (variant) {
            case 'primary':
                v =  'border-primary/50 border-t-primary border-r-primary'
                t += ' text-primary' 
                break;
            case 'success':
                v =  'border-green-500/50 border-t-green-500 border-r-green-500'
                t += ' text-green-500' 
                break;
            case 'warning':
                v =  'border-yellow-400/50 border-t-yellow-400 border-r-yellow-400'
                t += ' text-yellow-400'
                break;
            case 'danger':
                v =  'border-destructive/50 border-t-destructive border-r-destructive'
                t += ' text-destructive'
                break;
        
            default:
                v =  'border-primary/50 border-r-primary border-t-primary' 
                t += ' text-primary'
                break;
        }

        return {s, v, b, t}
    }
    return (
        <div className="flex gap-3 w-full justify-center items-center">
            <div className={`${ cn().s} rounded-full animate-spin ${cn().v} ${ cn().b } ${ className }`}>
            </div>
            <span className={ cn().t }>{ text }</span>
        </div>
    )
}