import { type IResponseData } from '@/pages/api/install'
import { type ReactElement, useEffect, useRef } from 'react'

export default function InstallResponse ({ response, scrolled }: { response: IResponseData | undefined, scrolled: any }): ReactElement {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const scrollAmmount = (scrolled: string): number => {
      const ammount = 20
      switch (scrolled) {
        case 'up':
          return -1 * ammount
        case 'down':
          return ammount
        default:
          return 0
      }
    }

    const scroll = (scrolled: string): void => {
      ref.current?.scrollBy(0, scrollAmmount(scrolled))
    }
    scroll(scrolled.direction)
  }, [scrolled])

  return <code ref={ref} className={['fullscreen', 'response', response !== undefined && 'active', response?.return_code !== 0 && 'error'].join(' ')} style={{ whiteSpace: 'break-spaces', overflow: 'scroll' }}>
    <h3>StdOut</h3>
    {response?.std_out}
    <hr />
    <h3 className={[response?.std_err === undefined && 'hidden'].join(' ')}>StdErr</h3>
    {response?.std_err}
  </code>
}
