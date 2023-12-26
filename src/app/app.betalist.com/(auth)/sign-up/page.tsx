import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { SignUpComponent } from '@components/signup-component'

export default async function SignUpPage() {
  const user = await getServerSession()

  if (user?.user) {
    redirect(`/app.betalist.com`)
  }

  return <SignUpComponent />
}

