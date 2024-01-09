import { SignUpComponent } from '@app/(auth)/_components/signup-component'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    path: string
  }
}

export default async function SignUpPage({ searchParams }: Props) {
  const user = await getServerSession()

  if (user?.user) {
    redirect(`/dashboard`)
  }

  return <SignUpComponent path={searchParams.path} />
}

