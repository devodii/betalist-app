import { __rootDomain__ } from '@lib/constants'

export async function Spoiler() {
  return (
    <div className="opacity-90">
      <p>
        Powered by
        <a
          className="underline underline-offset-2 opacity-80 ml-1.5"
          target="_blank"
          href={__rootDomain__}
        >
          Betalist
        </a>
      </p>
    </div>
  )
}

