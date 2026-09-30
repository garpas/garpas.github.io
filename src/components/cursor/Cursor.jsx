import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// 모든 페이지를 잇는 공통 요소. 테마 페이지에서는 모양이 바뀔 예정이다.
export function Cursor({ pointer }) {
  const dot = useRef(null)

  useEffect(() => {
    const toX = gsap.quickTo(dot.current, 'x', { duration: 0.25, ease: 'power3.out' })
    const toY = gsap.quickTo(dot.current, 'y', { duration: 0.25, ease: 'power3.out' })
    let shown = false
    const tick = () => {
      const p = pointer.current
      if (!p.active) return
      if (!shown) {
        shown = true
        gsap.set(dot.current, { x: p.px, y: p.py })
        gsap.to(dot.current, { opacity: 1, duration: 0.2 })
      }
      toX(p.px)
      toY(p.py)
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [pointer])

  return <div ref={dot} className="cursor" aria-hidden="true" />
}
