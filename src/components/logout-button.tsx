'use client'

import * as Auth from 'next-auth/react'
import { Button } from '@shadcn/button'

export function LogoutButton() {
  return (
    <Button
      className="border px-4 py-2 rounded-md"
      onClick={() => Auth.signOut()}
    >
      Sign out
    </Button>
  )
}

