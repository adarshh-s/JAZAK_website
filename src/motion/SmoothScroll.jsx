import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reducedMotion } from './gsap'

const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

const navOffset = () =>
  -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72)

// Momentum scrolling driven by GSAP's ticker so ScrollTrigger stays in sync.
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (reducedMotion()) return
    const instance = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), wheelMultiplier: 0.95 })
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.documentElement.classList.add('lenis-on')
    setLenis(instance)

    // In-page links glide instead of jumping, landing below the fixed nav.
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return
      const id = a.getAttribute('href')
      const target = id === '#top' ? 0 : document.querySelector(id)
      if (target === null) return
      e.preventDefault()
      instance.scrollTo(target, { offset: id === '#top' ? 0 : navOffset(), duration: 1.6 })
      history.replaceState(null, '', id)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      document.documentElement.classList.remove('lenis-on')
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
