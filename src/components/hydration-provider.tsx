import * as React from 'react'
import { HydrationOverlay as Overlay } from '@builder.io/react-hydration-overlay'

interface Props {
  children: React.ReactNode
}
export function HydrationOverlay(props: Props) {
  return <Overlay>{props.children}</Overlay>
}

