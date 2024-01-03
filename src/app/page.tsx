import { RedirectToDashboard } from '@components/dashboard-button'
import { BetalistHero } from '@components/hero'
import { getServerSession } from 'next-auth'

export default async function LandingPage() {
  const session = await getServerSession()

  return (
    <main className="min-h-screen p-6 lg:p-24">
      {session?.user && (
        <header className="w-full flex items-end justify-end">
          <RedirectToDashboard />
        </header>
      )}

      <BetalistHero />
    </main>
  )
}

