'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { ls } from '@lib/lemon-squeezy'
import * as React from 'react'

interface Props {
  children?: React.ReactNode
}

export function GetLifeTimeAccess(props: Props) {
  const [url, setUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function redirectToCheckout() {
      const products = await ls.getProducts()
      const url = products.data[0].attributes.buy_now_url
      setUrl(url)
    }
    redirectToCheckout()
  }, [])

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
          {url && (
            <a href={url} target="_blank">
              Purchase
            </a>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

