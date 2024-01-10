'use client'

import { findId, logError } from '@action'
import supabase from '@lib/supabase'
import * as React from 'react'

import { useSession } from 'next-auth/react'
import { Submit } from './submit-button'
import { Toast } from './toast'
import { Card, CardContent, CardHeader } from './ui/card'

interface Props {
  placeholder: string
  path: string
}

export function Feedback(props: Props) {
  const session = useSession()

  const [submitted, setSubmitted] = React.useState(false)

  async function onInsert(formdata: FormData) {
    const text = formdata.get('message')
    const userId = await findId(session?.data?.user?.email!)

    // todo: add submit with path
    const { error } = await supabase
      .from('feedbacks')
      .insert({ text, sender_id: userId })

    if (error) {
      await logError(error)
    }

    setSubmitted(true)

    setTimeout(() => setSubmitted(false), 300) // triggers a re-render to update the toast component
  }
  return (
    <>
      <div>
        <Card className="border-grayish text-white bg-inherit min-h-[200px]">
          <CardHeader className="text-2xl leading-6 font-semibold text-center">
            Feedback
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-2 w-full px-6 py-3"
              action={onInsert}
            >
              <textarea
                name="message"
                className="rounded-md bg-inherit border border-grayish  outline-none px-4 py-2"
                placeholder={props.placeholder}
                required
                rows={7}
              />
              <Submit text="Send feedback" />
            </form>
          </CardContent>
        </Card>
      </div>

      {submitted && (
        <Toast description="Your request has been sent" title="Thank you" />
      )}
    </>
  )
}

