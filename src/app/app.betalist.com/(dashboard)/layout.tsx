import { Feedback } from '@components/feedback'
import { NavBar } from '@components/navigation'
import { Metadata } from 'next'
import * as React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard | BetaList'
}

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <main className="overflow-x-hidden w-full">
      <NavBar />
      <header className="flex flex-1 justify-end pt-4 pr-8">
        <Feedback />
      </header>
      <div className="ml-[300px] w-[calc(100%-300px)] max-w-7xl py-6 px-4">
        <>{children}</>
      </div>
    </main>
  )
}

