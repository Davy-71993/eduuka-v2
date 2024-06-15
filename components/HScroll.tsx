
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function HScroll({ children }: Props) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex min-w-full h-40 w-max space-x-4 p-4">
        { children }
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}