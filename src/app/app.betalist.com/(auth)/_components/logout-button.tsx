'use client'

import { Spinner } from '@icons'
import { Button } from '@ui/button'
import { signOut } from 'next-auth/react'
import * as React from 'react'

export function LogoutButton() {
  const [showSpinner, setShowSpinner] = React.useState(false)
  return (
    <Button
      className="px-4 py-2 rounded-md w-full"
      aria-disabled={showSpinner}
      onClick={() => {
        setShowSpinner(true)
        signOut()
      }}
    >
      <span className="text-lg">Sign out</span>
      {showSpinner && <Spinner size={24} className="ml-1 animate-spin" />}
    </Button>
  )
}

