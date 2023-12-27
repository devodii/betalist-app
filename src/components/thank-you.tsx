interface Props {
  domain: string
}

export default async function ThankYou(props: Props) {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      Thank you for waiting for {props.domain}!
    </main>
  )
}

