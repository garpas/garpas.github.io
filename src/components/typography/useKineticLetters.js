import { useEffect } from 'react'
import gsap from 'gsap'

// container 안의 .k-letter 들을 focus 지점(커서/가상 포인터)과의 거리에 따라
// 밀어내고, 굵기를 바꾼다. 입력이 idleAfter 동안 없으면 원위치로 돌아간다.
//
// getFocus(): { x, y, active, movedAt }  (x, y 는 px)
export function useKineticLetters(containerRef, getFocus, opts = {}) {
  const {
    radius = 220,
    strength = 90,
    idleAfter = 1500,
    weightMin = 300,
    weightMax = 900,
    enabled = true,
  } = opts

  useEffect(() => {
    if (!enabled) return
    const el = containerRef.current
    if (!el) return

    let letters = []
    const measure = () => {
      letters = Array.from(el.querySelectorAll('.k-letter')).map((node) => {
        const r = node.getBoundingClientRect()
        // 현재 transform 을 빼서 원래 중심을 기록한다.
        const x = gsap.getProperty(node, 'x') || 0
        const y = gsap.getProperty(node, 'y') || 0
        return {
          node,
          cx: r.left + r.width / 2 - x,
          cy: r.top + r.height / 2 - y,
          toX: gsap.quickTo(node, 'x', { duration: 0.6, ease: 'power3.out' }),
          toY: gsap.quickTo(node, 'y', { duration: 0.6, ease: 'power3.out' }),
          toW: gsap.quickTo(node, '--wght', { duration: 0.4, ease: 'power2.out' }),
        }
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    // 폰트 로딩이 끝나면 글자 폭이 바뀌므로 다시 잰다.
    document.fonts?.ready.then(measure)

    const tick = () => {
      const f = getFocus()
      const idle = !f.active || performance.now() - f.movedAt > idleAfter
      for (const l of letters) {
        if (idle) {
          l.toX(0)
          l.toY(0)
          l.toW(weightMin)
          continue
        }
        const dx = l.cx - f.x
        const dy = l.cy - f.y
        const d = Math.hypot(dx, dy)
        const t = Math.max(0, 1 - d / radius)
        const k = t * t
        const inv = d > 0.001 ? 1 / d : 0
        l.toX(dx * inv * strength * k)
        l.toY(dy * inv * strength * k)
        l.toW(weightMin + (weightMax - weightMin) * k)
      }
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      ro.disconnect()
      window.removeEventListener('resize', measure)
      for (const l of letters) gsap.set(l.node, { x: 0, y: 0, '--wght': weightMin })
    }
  }, [containerRef, getFocus, radius, strength, idleAfter, weightMin, weightMax, enabled])
}
