import { useCallback } from 'react'
import { usePointer } from '../../hooks/usePointer.js'
import { Cursor } from '../../components/cursor/Cursor.jsx'
import { HomeScene } from './HomeScene.jsx'

// PC: 마우스 좌표가 곧 힘의 중심.
export function DesktopHome() {
  const pointer = usePointer()
  const getFocus = useCallback(() => {
    const p = pointer.current
    return { x: p.px, y: p.py, active: p.active, movedAt: p.movedAt }
  }, [pointer])

  return (
    <>
      <HomeScene getFocus={getFocus} hint="MOVE · CLICK THE NAME" />
      <Cursor pointer={pointer} />
    </>
  )
}
