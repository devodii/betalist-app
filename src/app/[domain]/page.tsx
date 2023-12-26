import { getWaitlist } from '@action'
import { undoFormatUrl } from '@lib/utils'
import { WaitListForm } from '@components/waitlist-form'

interface Props {
  params: {
    domain: string
  }
}

export default async function WaitlistPage(props: Props) {
  const url = undoFormatUrl(props.params.domain)
  const { waitlist_table_info: res } = await getWaitlist(url)

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      {res?.id ? (
        <WaitListForm waitlistInfo={res} product_name={props.params.domain} />
      ) : (
        <div>Sorry! This page does not exist</div>
      )}
    </main>
  )
}

