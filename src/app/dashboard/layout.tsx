import * as React from "react"
import { Metadata } from "next"
import { NavBar } from "@components/navigation"

export const metadata: Metadata = {
  title: "Dashboard | BetaList"
}

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({ children}: Props) {
  return <main className="overflow-x-hidden w-full">
    <NavBar />
    <div className="ml-[300px] w-[calc(100%-300px)] max-w-7xl py-6 px-4">
      {children}
    </div>
  </main>
}