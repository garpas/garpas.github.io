import { useEffect, useRef } from 'react'

// 마우스/터치 위치를 -1 ~ 1 로 정규화해서 ref 로 돌려준다.
// 렌더를 유발하지 않도록 state 대신 ref 를 쓴다.
export function usePointer() {
  const target = useRef({ x: 0, y: 0, px: -1, py: -1, active: false, movedAt: 0 })

  useEffect(() => {
    const onMove = (e) => {
      const t = target.current
      t.px = e.clientX
      t.py = e.clientY
      t.x = (e.clientX / window.innerWidth) * 2 - 1
      t.y = (e.clientY / window.innerHeight) * 2 - 1
      t.active = true
      t.movedAt = performance.now()
    }
    const onLeave = () => {
      target.current.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return target
}
