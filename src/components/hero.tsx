import { Input } from '@ui/input'

import { Submit } from '@components/submit-button'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const Title = () => (
  <h1 className="flex flex-wrap flex-col gap-2 lg:gap-4 opacity-80 text-4xl lg:text-[80px] font-extrabold select-none mt-4">
    <span>Create a waitlist</span>
    <span className="relative flex items-center gap-2 flex-wrap mt-4">
      <span>for your</span>
      <span className="relative whitespace-nowrap -top-8">
        <span className="absolute h-20 flex items-center justify-center top-10 sm:top-0 bg-neutral left-1 text-dark-red p-2 -rotate-1">
          product
        </span>
      </span>
    </span>
  </h1>
)

export const BetalistHero = () => {
  async function create(formdata: FormData) {
    'use server'

    const url = formdata.get('url')
    if (!url) return

    const session = await getServerSession()
    const isAuthed = session?.user ? true : false

    redirect(
      isAuthed
        ? `/app.betalist.com/create?url=${url}`
        : `/app.betalist.com/sign-in?path=${url}`
    )
  }

  return (
    <div className="w-full flex flex-col gap-6 items-start">
      <Title />

      <div className="flex-1 max-w-xl mt-20 sm:mt-0">
        <span className="opacity-70 lg:text-lg font-normal">
          Start managing your product demand more effectively. Enter the name of
          your product below to create a new waitlist.
        </span>
      </div>

      <form className="w-full max-w-lg mt-8" action={create}>
        <div className="border border-[#f5BDIA] flex items-center gap-2 bg-dark-main w-full py-2 px-4">
          <span className="opacity-70 text-[18px]">betali.st/</span>
          <Input
            autoComplete="off"
            spellCheck="false"
            name="url"
            className="p-0 opacity-70 text-[18px] flex-1 bg-inherit border-none ocus:ring-0 focus-visible:ring-0 outline:none"
          />
        </div>

        <Submit text="Create" />
      </form>
    </div>
  )
}

