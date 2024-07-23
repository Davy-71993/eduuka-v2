"use client"


import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, Locate, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState, useTransition } from "react"
import Cookies from "js-cookie"
import { setLocation as setCurrentLocation } from "@/lib/actions/business_actions" 
import axios from "axios"

type Props = {
    className?: string
}

export default function LocationSelector({ className }: Props) {
    const [location, setLocation] = useState<any>({})
    const [loading, startLoading] = useTransition()
    const [error, setError] = useState<string>()
    useEffect(()=>{
        startLoading(async()=>{
            const geo = Cookies.get('geo')
            if(geo){
                setLocation(JSON.parse(geo))
                return
            }

            try {
                console.log("Fetching location")
                const res = await axios.get('http://ip-api.com/json?fields=country,countryCode,currency,region,regionName,city,query,lat,lon')
                setLocation(res.data)
                setCurrentLocation(res.data)
                
              } catch (error) {
                setError("An error ocured while fetching your location.")
              }

        })


    }, [])
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className={cn("text-left rounded-sm transition-all text-sm p-2 w-full flex justify-between", className)}>All Uganda <ChevronRight /></Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] max-w-md rounded-sm">
            <DialogHeader>
                <DialogTitle className="text-2xl flex justify-center items-center gap-2 border-b-2 pb-5"> <span><MapPin /> </span> Your current location</DialogTitle>
            </DialogHeader>
            <div className="flex flex-wrap w-full p-5 gap-6 justify-center">
                <p className="text-muted-foreground">Country: <span className="font-bold">{ location.country }</span></p>
                <p className="text-muted-foreground">Region: <span className="font-bold">{ location.regionName }</span></p>
                <p className="text-muted-foreground">Town: <span className="font-bold">{ location.city }</span></p>
                <p className="text-muted-foreground">Currency: <span className="font-bold">{ location.currency }</span></p>
            </div>
            <p className="text-muted-foreground flex gap-3">
                <span className="font-bold">NOTE: </span>
                Changing your location also changes your prefered currency to the currency 
                used in the location that you set
            </p>
            <DialogFooter className="flex justify-between mt-10 w-full">
                <DialogClose asChild>
                    <Button type="submit" variant="outline" className="border-2 border-primary font-bold text-primary">Cancle</Button>
                </DialogClose>
                <DialogClose asChild>
                    <Button type="submit" disabled className="disabled:cursor-not-allowe ">Change Location</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}