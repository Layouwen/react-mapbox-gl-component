import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { eventEmitter } from '../utils'

export const CustomMarker: FC<{ name: string }> = ({ name: _name }) => {
  const [name, setName] = useState(_name)

  useEffect(() => {
    console.log('layouwen fuck mount')
  }, [])

  useEffect(() => {
    const updateName = (name: string) => {
      setName(name)
    }
    eventEmitter.on(`${name}:updateName`, updateName)
    return () => {
      eventEmitter.off(`${name}:updateName`, updateName)
    }
  }, [])

  return (
    <div
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <div>{name}</div>
      <button
        onClick={() => {
          setName(new Date().getTime().toString())
        }}
      >
        setName render
      </button>
    </div>
  )
}

export const CustomMarkerPortal: FC<{ target: Element; name: string; id: string; floor: string }> = ({
  target,
  name,
  id,
  floor,
}) => {
  return createPortal(
    <div
      onClick={e => {
        e.stopPropagation()
      }}
    >
      <div>{id}</div>
      <div>{floor}</div>
      <div>{name}</div>
    </div>,
    target
  )
}

export const CustomMarkerRender = ({ target, name }: any) => {
  createRoot(target).render(<CustomMarker name={name} />)
}

// export const CustomMarkerRenderPortal = ({ target, name }: any) => {
// const div = document.createElement('div')
// createRoot(div).render(<CustomMarkerPortal name={name} target={target} />)
// document.body.appendChild(div)
// }
