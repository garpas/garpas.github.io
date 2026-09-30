import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// 입력 출처(마우스/기울기)와 무관하게 부드럽게 보간된 값을 매 프레임 제공한다.
// target: { x, y } (-1 ~ 1). 반환값의 current 는 보간된 { x, y }.
export function useInput(target, { ease = 0.08 } = {}) {
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const tick = () => {
      const c = current.current
      const t = target.current
      c.x += (t.x - c.x) * ease
      c.y += (t.y - c.y) * ease
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [target, ease])

  return current
}
