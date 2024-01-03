'use client'

import NextLink from 'next/link'
import * as React from 'react'

export function DeleteDialogContainer(props: React.PropsWithChildren) {
  return (
    <header className="fixed top-16 flex self-end">{props.children}</header>
  )
}

interface LiveWaitlistInfoProps {
  url: string
}

export function LiveWaitlistInfo(props: LiveWaitlistInfoProps) {
  return (
    <div className="flex gap-2 text-lg">
      <span>Your Page is Live at </span>
      <NextLink
        href={props.url}
        className="underline underline-2"
        target="_blank"
      >
        {props.url}
      </NextLink>
    </div>
  )
}

