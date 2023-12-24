import { SessionProvider } from '@/components/auth-provider'
import { HydrationOverlay } from '@components/hydration-provider'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beta list',
  description: '🚀 Accelerating tool launches & beta testing for solopreneurs.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap"
        rel="stylesheet"
      />
      <body className="bg-dark-main text-white">
        <SessionProvider session={session}>
          <HydrationOverlay>{children}</HydrationOverlay>
        </SessionProvider>
      </body>
    </html>
  )
}

