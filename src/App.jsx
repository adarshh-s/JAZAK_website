import { useEffect, useLayoutEffect, useRef } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import SmoothScroll, { useLenis } from './motion/SmoothScroll'
import { gsap, ScrollTrigger, reducedMotion } from './motion/gsap'
import { routeFor } from './data/routes'
import { applyHead } from './seo'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import MaterialsPage from './pages/MaterialsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// On each page change: update <head>, reset scroll (or go to #hash), lift the wipe.
function RouteEffects() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()
  const wipeRef = useRef(null)
  const first = useRef(true)

  useEffect(() => {
    const route = routeFor(pathname)
    if (route) applyHead(route)
  }, [pathname])

  useIsoLayoutEffect(() => {
    const target = hash ? document.querySelector(hash) : null
    const go = () => {
      if (target) {
        const offset = -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72)
        lenis ? lenis.scrollTo(target, { offset, immediate: true }) : target.scrollIntoView()
      } else {
        lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
      }
    }
    if (first.current) {
      first.current = false
      if (target) requestAnimationFrame(go)
      return
    }
    go()
    requestAnimationFrame(() => ScrollTrigger.refresh())
    if (!reducedMotion() && wipeRef.current) {
      gsap.fromTo(
        wipeRef.current,
        { scaleY: 1, transformOrigin: '50% 0%' },
        { scaleY: 0, duration: 0.9, ease: 'build', delay: 0.05 },
      )
    }
  }, [pathname])

  return <div ref={wipeRef} className="page-wipe" aria-hidden="true" />
}

export default function App() {
  return (
    <SmoothScroll>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <RouteEffects />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  )
}
