import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { categories } from "@/lib/dami-api"
import { NavigationMenuLink } from "../ui/navigation-menu"
import Link from "next/link"

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-[60vh] w-full rounded-md border">
      <div className="p-4 h-fit flex flex-col">
        <h4 className="mb-4 text-sm font-medium leading-none">Categories</h4>
        {categories.map((cat, i) => (
          <>
           <NavigationMenuLink asChild key={ i } className='w-full my-1 p-2 rounded-md text-center bg-secondary'>
                <Link href={`c/${cat.id}`}>{ cat.name }</Link>
            </NavigationMenuLink>
          </>
        ))}
      </div>
    </ScrollArea>
  )
}
