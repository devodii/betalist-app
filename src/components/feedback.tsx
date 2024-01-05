'use client'

import { findId, logError } from '@action'
import supabase from '@lib/supabase'
import { Textarea } from '@ui/textarea'
import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import { Submit } from './submit-button'
import { Button } from './ui/button'

export function Feedback() {
  const session = useSession()

  const [submitted, setSubmitted] = React.useState(false)

  async function onInsert(formdata: FormData) {
    const text = formdata.get('message')
    const userId = await findId(session?.data?.user?.email!)

    // TODO: Add page URL.
    const { error } = await supabase
      .from('feedbacks')
      .insert({ text, sender_id: userId })

    if (error) {
      await logError(error)
    }

    setSubmitted(true)
  }
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="underline underline-offset-2">
          Feedback
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4 bg-dark-main shadow-xl min-w-[350px] text-white mr-12 flex items-center justify-center">
          {!submitted ? (
            <form className="flex flex-col gap-2 w-full" action={onInsert}>
              <Textarea
                name="message"
                className="bg-inherit border border-[#f5BDIA]"
                placeholder="Ideas on how to improve this page."
                required
                rows={7}
              />

              <Submit text="Send feedback" />
            </form>
          ) : (
            <div className="flex flex-col gap-2">
              <span>Thank you for your feedback!</span>
              <Button onClick={() => setSubmitted(false)} variant={'secondary'}>
                Send another one
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

