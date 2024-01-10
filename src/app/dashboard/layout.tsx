import { AccountBadge } from '@components/account-badge'
import { NavBar } from '@components/navigation'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import * as React from 'react'
import { getLifetimeStatus } from './action'

export const metadata: Metadata = {
  title: 'Dashboard | BetaList'
}

export default async function DashboardLayout(props: React.PropsWithChildren) {
  const session = await getServerSession()
  const email = session?.user?.email!

  const isPro = await getLifetimeStatus(email)

  return (
    <main className="overflow-x-hidden w-full">
      <NavBar />
      <header className="w-full flex items-end justify-end pr-6 lg:pr-12 pt-6">
        <AccountBadge isPro={isPro} />
      </header>

      <div className="ml-[300px] w-[calc(100%-300px)] max-w-7xl py-6 px-4">
        <>{props.children}</>
      </div>
    </main>
  )
}

