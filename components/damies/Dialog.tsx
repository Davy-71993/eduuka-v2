import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight } from "lucide-react"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-primary bg-transparent hover:bg-secondary text-left rounded-sm transition-all text-sm p-2 w-full flex justify-between">All Uganda <ChevronRight /></Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl">Location</DialogTitle>
          <DialogDescription>
            Set up your shopping location.
          </DialogDescription>
        </DialogHeader>
            Content here
        <DialogFooter className="flex justify-between w-full">
          <Button type="submit">Cancel</Button>
          <Button type="submit">Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
