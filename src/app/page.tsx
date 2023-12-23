import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { BetalistHero } from '@components/hero'

export default async function LandingPage() {
  const session = await getServerSession()

  if (session || session!.user) {
    redirect('/dashboard')
  }

  return (
    <main className="min-h-screen p-24">
      <BetalistHero />
    </main>
  )
}

