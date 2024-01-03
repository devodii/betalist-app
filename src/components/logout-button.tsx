'use client'

import * as Auth from 'next-auth/react'
import { Button } from '@ui/button'

export function LogoutButton() {
  return (
    <Button
      className="px-4 py-2 rounded-md w-full text-lg"
      onClick={() => Auth.signOut()}
    >
      Sign out
    </Button>
  )
}

