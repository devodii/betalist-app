"use client"

import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "@shadcn/button"
import { Spinner } from "@icons"

interface Props extends ButtonProps { }

export function Create(props: Props) {
  const { pending } = useFormStatus()

  return (
    <Button className="flex items-center gap-1 p-4" type="submit" {...props} aria-disabled={pending}>
      <span>create</span>
      {pending && <Spinner size={24} className="animate-spin" />}
    </Button>
  )
}