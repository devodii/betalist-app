import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { redirectToCheckout } from '@app/dashboard/action'
import * as React from 'react'

interface Props {
  children?: React.ReactNode
}

export async function GetLifeTimeAccess(props: Props) {
  const url = await redirectToCheckout()

  return (
    <Dialog>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent className="bg-inherit text-white opacity-90">
        <DialogHeader className="font-semibold text-xl">
          Get the lifetime offer
        </DialogHeader>
        <DialogDescription className="text-gray-200">
          purchase the service to create unlimited wailist, also to receive
          infinite emails
        </DialogDescription>

        <DialogFooter>
          <a href={url} target="_blank">
            Purchase
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

