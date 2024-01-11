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

// todo: add more contents
const contents = [
  {
    reason: 'trial exceeded',
    header: 'You have exceeded your free trial',
    description:
      'Purchase a lifetime deal to get access to premium features, and unlimited waitlists.'
  },
  {
    reason: 'plan_upgrade',
    header: 'Upgrade Your Plan',
    description:
      'Purchase a lifetime deal to get access to premium features, and unlimited waitlists.'
  }
] as const

interface Props {
  children?: React.ReactNode
  reason: (typeof contents)[number]['reason']
}

export function GetLifeTimeAccess(props: Props) {
  const [url, setUrl] = React.useState<string | null>(null)
  const content = contents.find(item => item.reason === props.reason)

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
        <DialogHeader className="font-semibold text-xl lg:text-2xl">
          {content?.header}
        </DialogHeader>
        <DialogDescription className="text-gray-200">
          {content?.description}
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

