import { useCallback } from 'react'
import { useDeviceTilt } from '../../hooks/useDeviceTilt.js'
import { useInput } from '../../hooks/useInput.js'
import { usePointer } from '../../hooks/usePointer.js'
import { HomeScene } from './HomeScene.jsx'

// 모바일: 터치가 기본, 기울기는 있으면 더 재미있는 보조 입력.
// 기울기를 화면 위의 가상 포인터로 바꿔서 같은 장면에 넘긴다.
export function MobileHome() {
  const pointer = usePointer()
  const { target: tilt, permission, request } = useDeviceTilt()
  const smooth = useInput(tilt, { ease: 0.1 })

  const getFocus = useCallback(() => {
    const p = pointer.current
    const now = performance.now()
    // 최근 1초 안에 터치가 있었으면 터치 우선.
    if (p.active && now - p.movedAt < 1000) {
      return { x: p.px, y: p.py, active: true, movedAt: p.movedAt }
    }
    const t = tilt.current
    return {
      x: window.innerWidth / 2 + smooth.current.x * window.innerWidth * 0.6,
      y: window.innerHeight / 2 + smooth.current.y * window.innerHeight * 0.6,
      active: t.active,
      movedAt: t.movedAt,
    }
  }, [pointer, tilt, smooth])

  return (
    <HomeScene getFocus={getFocus} hint="TOUCH · TILT · TAP THE NAME">
      {permission === 'prompt' && (
        <button type="button" className="mono link" onClick={request}>
          ENABLE TILT
        </button>
      )}
    </HomeScene>
  )
}
