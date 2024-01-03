import { getWaitlist } from '@action'
import { ThankYou } from '@components/thank-you'
import { WaitListForm } from '@components/waitlist-form'
import { undoFormatUrl } from '@lib/utils'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    domain: string
  }
  searchParams: {
    success: true
  }
}

export default async function WaitlistPage({ params, searchParams }: Props) {
  const url = undoFormatUrl(params.domain)
  const { waitlist_table_info: waitlist } = await getWaitlist(url)

  if (!waitlist?.id) return notFound()

  if (searchParams.success) return <ThankYou domain={params.domain} />

  await new Promise((resolve, reject) => setTimeout(() => resolve(''), 4000))

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      {waitlist?.id && (
        <WaitListForm waitlistInfo={waitlist} product_name={params.domain} />
      )}
    </main>
  )
}

