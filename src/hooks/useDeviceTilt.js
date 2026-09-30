import { useCallback, useEffect, useRef, useState } from 'react'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

// 기기 기울기를 -1 ~ 1 로 정규화한다. iOS 13+ 는 사용자 동작 안에서
// 권한을 요청해야 하므로 request() 를 버튼 클릭 등에서 호출한다.
export function useDeviceTilt(range = 30) {
  const target = useRef({ x: 0, y: 0, active: false, movedAt: 0 })
  const [permission, setPermission] = useState(() =>
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
      ? 'prompt'
      : 'granted',
  )

  const request = useCallback(async () => {
    try {
      const res = await DeviceOrientationEvent.requestPermission()
      setPermission(res === 'granted' ? 'granted' : 'denied')
    } catch {
      setPermission('denied')
    }
  }, [])

  useEffect(() => {
    if (permission !== 'granted') return
    const onOrient = (e) => {
      if (e.gamma == null || e.beta == null) return
      const t = target.current
      t.x = clamp(e.gamma / range, -1, 1)
      // 폰을 손에 들었을 때 beta 는 보통 40~60도라 그 근처를 0 으로 본다.
      t.y = clamp((e.beta - 45) / range, -1, 1)
      t.active = true
      t.movedAt = performance.now()
    }
    window.addEventListener('deviceorientation', onOrient)
    return () => window.removeEventListener('deviceorientation', onOrient)
  }, [permission, range])

  return { target, permission, request }
}
