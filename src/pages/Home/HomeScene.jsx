import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { site } from '../../data/site.js'
import { KineticText } from '../../components/typography/KineticText.jsx'
import { useKineticLetters } from '../../components/typography/useKineticLetters.js'
import { Menu } from '../../components/navigation/Menu.jsx'

// PC/모바일이 공유하는 메인 장면.
// getFocus 만 다르게 넘기면(마우스 좌표 / 기울기 가상 포인터) 같은 반응을 한다.
//
// 상태
//   closed: 이름이 크게 떠 있고 커서에 반응한다.
//   open  : 이름이 흩어지고 메뉴 글자들이 모여든다.
export function HomeScene({ getFocus, hint, children }) {
  const scene = useRef(null)
  const name = useRef(null)
  const menu = useRef(null)
  const [open, setOpen] = useState(false)
  const animating = useRef(false)

  useKineticLetters(scene, getFocus, { radius: 240, strength: 100 })

  const scatter = useCallback((container, out) => {
    const inner = container.querySelectorAll('.k-letter-inner')
    const spread = Math.min(window.innerWidth, 900)
    return gsap.to(inner, {
      x: () => (out ? gsap.utils.random(-spread * 0.5, spread * 0.5) : 0),
      y: () => (out ? gsap.utils.random(-260, 260) : 0),
      rotation: () => (out ? gsap.utils.random(-120, 120) : 0),
      opacity: out ? 0 : 1,
      duration: 0.9,
      ease: out ? 'power3.in' : 'power3.out',
      stagger: { each: 0.018, from: 'random' },
    })
  }, [])

  const toggle = useCallback(() => {
    if (animating.current) return
    animating.current = true
    const next = !open
    const tl = gsap.timeline({ onComplete: () => (animating.current = false) })
    if (next) {
      tl.add(scatter(name.current, true))
        .set(name.current, { pointerEvents: 'none' })
        .set(menu.current, { visibility: 'visible' })
        .add(scatter(menu.current, false), '-=0.35')
    } else {
      tl.add(scatter(menu.current, true))
        .set(menu.current, { visibility: 'hidden' })
        .set(name.current, { pointerEvents: 'auto' })
        .add(scatter(name.current, false), '-=0.35')
    }
    setOpen(next)
  }, [open, scatter])

  // 첫 렌더에서 메뉴 글자는 흩어진 채 숨겨둔다.
  useEffect(() => {
    gsap.set(menu.current.querySelectorAll('.k-letter-inner'), { opacity: 0 })
    gsap.set(menu.current, { visibility: 'hidden' })
    gsap.from(name.current.querySelectorAll('.k-letter-inner'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.04,
    })
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, toggle])

  return (
    <main ref={scene} className={`scene ${open ? 'is-open' : ''}`}>
      <header className="scene-top">
        <span className="mono">{site.tagline}</span>
        <span className="mono">{site.year}</span>
      </header>

      <button
        ref={name}
        type="button"
        className="name"
        onClick={toggle}
        aria-expanded={open}
        aria-label={`${site.name}, 메뉴 열기`}
      >
        <KineticText text={site.name} as="span" />
      </button>

      <div ref={menu} className="menu-wrap">
        <Menu items={site.menu} />
        <button type="button" className="menu-close mono" onClick={toggle}>
          ← BACK
        </button>
      </div>

      <footer className="scene-bottom">
        <span className="mono">{hint}</span>
        {children}
      </footer>
    </main>
  )
}
