import { useViewport } from './hooks/useViewport.js'
import { DesktopHome } from './pages/Home/DesktopHome.jsx'
import { MobileHome } from './pages/Home/MobileHome.jsx'

export default function App() {
  const { isMobile } = useViewport()
  return isMobile ? <MobileHome /> : <DesktopHome />
}
