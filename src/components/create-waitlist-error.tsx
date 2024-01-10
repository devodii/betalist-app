'use client'

import * as React from 'react'
import { useToast } from './ui/use-toast'

interface Props {
  description: string
  render: boolean
}

export function CreateWaitlistError(props: Props) {
  const { toast } = useToast()

  React.useEffect(() => {
    if (props.description) {
      toast({
        title: 'An error occured',
        description: props.description
      })
    }
  }, [props.description, props.render, toast])

  return null
}

