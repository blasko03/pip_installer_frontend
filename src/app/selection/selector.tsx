import { useEffect, useRef, useState } from "react"

export default function Selector({list, selected, active, title}: {list: string[], selected: number, active: boolean, title: string}) { 
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  const elementHeight = 40;

  useEffect(() => {
    if(ref.current != null)
      setHeight(ref.current.clientHeight)
  }, [active])

  return (
    <div className = { ['fullscreen', 'selector', active && 'active'].join(' ') }>
      <h3>{title}</h3>
      <div ref={ref} className = { [height === 0 && 'hidden'].join(' ') }>
        <div style = {{marginTop: `${height / 2 - elementHeight / 2 - elementHeight * (selected)}px`}}>
          {list.map( (x, index) => <Element key={x} title={x} active={selected == index}/>)}
        </div>
      </div>
    </div>
  )
}

function Element({title, active}: {title: string, active: boolean}) {
  return <div className = {[active && 'active'].join(' ')}>{title}</div>
}