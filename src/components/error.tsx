'use client'

import * as React from 'react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

interface Props {
  description: string
  children: React.ReactNode
}

export function Error(props: Props) {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: 'An error occured',
          description: props.description
        })
      }}
    >
      {props.children}
    </Button>
  )
}

