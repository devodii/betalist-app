import { Skeleton } from '@ui/skeleton'

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Skeleton className="bg-[#1A1A17] h-[300px] w-full max-w-[550px]" />
    </div>
  )
}

