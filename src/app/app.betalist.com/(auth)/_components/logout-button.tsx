'use client'

import { Button } from '@ui/button'
import { signOut } from 'next-auth/react'

export function LogoutButton() {
  return (
    <Button
      className="px-4 py-2 rounded-md w-full text-lg"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  )
}

