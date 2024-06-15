import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
    className?: string
}

export default function LocationSelector({ className }: Props) {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className={cn("text-left rounded-sm transition-all text-sm p-2 w-full flex justify-between", className)}>All Uganda <ChevronRight /></Button>
        </DialogTrigger>
        <DialogContent className="w-[95%] max-w-md rounded-sm">
            <DialogHeader>
                <DialogTitle className="text-2xl">Location</DialogTitle>
                <DialogDescription>
                    Set up your shopping location.
                </DialogDescription>
            </DialogHeader>
                <div className="flex space-x-3 w-full items-center">
                    <Label className="w-1/4 text-xl font-thin">Country:</Label>
                    <Select>
                        <SelectTrigger className="w-3/4 max-w-sm ring-0 focus:ring-0 active:ring-0">
                            <SelectValue placeholder="Uganda" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="light">Kenya</SelectItem>
                            <SelectItem value="dark">Tanzania</SelectItem>
                            <SelectItem value="system">Rwanda</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex space-x-3 w-full items-center">
                    <Label className="w-1/4 text-xl font-thin">Region:</Label>
                    <Select>
                        <SelectTrigger className="w-3/4 max-w-sm ring-0 focus:ring-0 active:ring-0">
                            <SelectValue placeholder="Kampala" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="Kampala">Kampala</SelectItem>
                            <SelectItem value="Eastern Region">Eastern Region</SelectItem>
                            <SelectItem value="Central Region">Central Region</SelectItem>
                            <SelectItem value="Western Region">Western Region</SelectItem>
                            <SelectItem value="Masaka Region">Masaka Region</SelectItem>
                            <SelectItem value="Northern Region">Northern Region</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex space-x-3 w-full items-center">
                    <Label className="w-1/4 text-xl font-thin">Town:</Label>
                    <Select>
                        <SelectTrigger className="w-3/4 max-w-sm ring-0 focus:ring-0 active:ring-0">
                            <SelectValue placeholder="Busia" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value="light">Mbale</SelectItem>
                            <SelectItem value="dark">Busa</SelectItem>
                            <SelectItem value="system">Wakiso</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            <DialogFooter className="flex justify-end mt-10 w-full">
                <DialogClose asChild>
                    <Button type="submit">Update Location</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}