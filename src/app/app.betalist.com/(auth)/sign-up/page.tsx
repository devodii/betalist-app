import { SignUpComponent } from '@auth/signup-component'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {
  const user = await getServerSession()

  if (user?.user) {
    redirect(`/app.betalist.com`)
  }

  return <SignUpComponent />
}

