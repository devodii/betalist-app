import { Plus } from '@icons'
import NextLink from 'next/link'
import { Button } from '@ui/button'

export function NavBar() {
  return (
    <nav className="bg-dark-main z-10 fixed left-0 border-r border-grayish min-w-[300px] min-h-screen py-24 px-4">
      <NextLink href="/app.betalist.com/create">
        <Button className="flex items-center gap-2 w-full py-6">
          <Plus size={24} />
          <span className="text-xl">Create</span>
        </Button>
      </NextLink>
      <NextLink href="/app.betalist.com">
        <Button className="w-full text-xl py-6 mt-4">My waitlists</Button>
      </NextLink>
    </nav>
  )
}

