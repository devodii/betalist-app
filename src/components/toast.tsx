import * as React from 'react'
import { useToast } from '@ui/use-toast'

interface Props {
  title: string
  description: string
}

export function Toast(props: Props) {
  const { toast } = useToast()

  React.useEffect(() => {
    toast({
      title: props.title,
      description: props.description
    })
  }, [props.description, props.title, toast])

  return null
}

