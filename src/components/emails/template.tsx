import { Heading } from '@react-email/components'

interface Props {
  readonly name: string
}

export function EmailTemplate(props: Props) {
  return (
    <Heading as="h1" className="text-red-500">
      Hey {props.name}, we want to speciallu welcome you.
    </Heading>
  )
}

