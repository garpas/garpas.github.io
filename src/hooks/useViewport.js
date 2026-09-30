import { useEffect, useState } from 'react'

// 화면 폭이 아니라 입력 장치로 PC/모바일을 나눈다.
// 태블릿은 화면이 커도 터치 기반이면 mobile 로 본다.
const query = '(hover: hover) and (pointer: fine)'

export function useViewport() {
  const read = () => {
    if (typeof window === 'undefined') return { isMobile: false, width: 0, height: 0 }
    return {
      isMobile: !window.matchMedia(query).matches,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }
  const [state, setState] = useState(read)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const update = () => setState(read())
    mql.addEventListener('change', update)
    window.addEventListener('resize', update)
    return () => {
      mql.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return state
}
