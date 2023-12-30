'use client'

import { Button } from '@ui/button'
import Link from 'next/link'

export function RedirectToDashboard() {
  return (
    <Button>
      <Link className="underline-none" href="/app.betalist.com">
        Dashboard
      </Link>
    </Button>
  )
}

