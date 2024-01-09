'use client'

import { ls } from '@lib/lemon-squeezy'
import * as React from 'react'

export default function BillingPage() {
  const [url, setUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function getPlans() {
      const products = await ls.getProducts()
      setUrl(products.data[0].attributes.buy_now_url)
    }

    getPlans()
  }, [])

  return (
    <div className="min-h-sreen w-screen flex flex-col gap-4 items-center justify-center py-12">
      <h1 className="text-2xl lg:text-3xl font-semibold">Billings Page</h1>

      {url ? (
        <a href={url} target="_blank">
          Buy now
        </a>
      ) : (
        <div>...</div>
      )}
    </div>
  )
}

