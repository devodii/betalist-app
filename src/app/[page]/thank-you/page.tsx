interface Props {
  params: {
    page: string
  }
}
export default async function ThankYouPage(props: Props) {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <div>{props.params.page} says:</div>
      Thank you for waiting!
    </main>
  )
}

