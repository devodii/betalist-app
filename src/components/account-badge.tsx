import { Crown } from '@icons'
import * as React from 'react'
import { Badge } from './ui/badge'
import { GetLifeTimeAccess } from './get-lifetime-access'

interface Props {
  isPro: boolean
}

export function AccountBadge(props: Props) {
  return (
    <Badge className="max-w-max px-4 py-1.5">
      <div className="flex items-center gap-1">
        {props.isPro ? (
          <>
            <span>Lifetime</span>
            <Crown size={20} />
          </>
        ) : (
          <>
            <GetLifeTimeAccess>
              <span>Upgrade</span>
            </GetLifeTimeAccess>
          </>
        )}
      </div>
    </Badge>
  )
}

