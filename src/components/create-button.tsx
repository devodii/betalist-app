'use client'

import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from '@ui/button'
import { Spinner } from '@icons'

interface Props extends ButtonProps {
  text: string
}

export function Create(props: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      className={`flex items-center gap-1 p-4 ${
        pending ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
      type="submit"
      variant="secondary"
      {...props}
      aria-disabled={pending}
    >
      <span>{props.text ?? 'Create'}</span>
      {pending && <Spinner size={24} className="animate-spin" />}
    </Button>
  )
}

