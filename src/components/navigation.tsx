import { LogoutButton } from '@app/(auth)/_components/logout-button'
import { Plus } from '@icons'
import { Button } from '@ui/button'
import NextLink from 'next/link'

export function NavBar() {
  return (
    <nav className="bg-dark-main z-10 fixed left-0 border-r border-grayish min-w-[300px] min-h-screen py-24 px-4">
      <NextLink href="/dashboard/create?email=true">
        <Button className="flex items-center gap-2 w-full py-6">
          <Plus size={24} />
          <span className="text-lg">Create</span>
        </Button>
      </NextLink>
      <NextLink href="/dashboard">
        <Button className="w-full text-lg py-6 mt-4">My waitlists</Button>
      </NextLink>

      <div className="absolute bottom-4 w-[calc(100%-35px)]">
        <LogoutButton />
      </div>
    </nav>
  )
}

