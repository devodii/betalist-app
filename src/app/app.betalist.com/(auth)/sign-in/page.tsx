import { SignInComponent } from '@auth/signin-component'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    path: string
  }
}

export default async function SignInPage({ searchParams: { path } }: Props) {
  const user = await getServerSession()

  if (user?.user) {
    redirect(`/app.betalist.com`)
  }

  return <SignInComponent path={path} />
}

