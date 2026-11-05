import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { ScrollTrigger, reducedMotion } from '../motion/gsap'
import { useLenis } from '../motion/SmoothScroll'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navRoutes } from '../data/routes'
import mark from '../assets/jazak-mark.png'

const STORAGE_KEY = 'jazak-theme'

function useTheme() {
  // Starts unknown so server and client render the same markup; the saved
  // theme (already applied by the inline script in index.html) is read on mount.
  const [stored, setTheme] = useState(null)
  const theme = stored ?? 'dark'
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark')
  }, [])
  useEffect(() => {
    if (!stored) return
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#F4F1EC' : '#0F0E0E')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }
  }, [stored, theme])
  const toggle = (e) => {
    const next = theme === 'light' ? 'dark' : 'light'
    if (!document.startViewTransition || reducedMotion()) {
      setTheme(next)
      return
    }
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const vt = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
      document.documentElement.dataset.theme = next
    })
    vt.ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 900, easing: 'cubic-bezier(0.6, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      ),
    )
  }
  return [theme, toggle]
}

function ThemeToggle({ theme, onToggle }) {
  const light = theme === 'light'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Dark mode' : 'Light mode'}
    >
      {light ? (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6 13 13M3 13l1.4-1.4M11.6 4.4 13 3" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      )}
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [theme, toggleTheme] = useTheme()
  const [hidden, setHidden] = useState(false)
  const lenis = useLenis()
  const openRef = useRef(open)
  openRef.current = open

  // Slides away while reading down the page, returns on the first scroll up.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current) return
        const y = self.scroll()
        setHidden(y > window.innerHeight * 0.9 && self.direction === 1)
      },
    })
    return () => st.kill()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (lenis) open ? lenis.stop() : lenis.start()
    if (open) setHidden(false)
  }, [open, lenis])

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''} ${hidden ? 'nav--hidden' : ''}`}>
      <div className="nav__inner container">
        <Link
          to="/"
          className="brand"
          aria-label="JAZAK home"
          onClick={() => pathname === '/' && (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
        >
          <img src={mark} alt="" width="32" height="32" />
          <span className="brand__word">JAZAK</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {navRoutes.map((r) => (
            <NavLink key={r.path} to={r.path} className={({ isActive }) => (isActive ? 'is-active' : '')}>
              {r.label}
            </NavLink>
          ))}
        </nav>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        <Link to="/contact" className="btn btn--primary btn--sm nav__cta">
          Get a quote
        </Link>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        {navRoutes.map((r, i) => (
          <NavLink key={r.path} to={r.path} onClick={() => setOpen(false)}>
            <span className="mono">0{i + 1}</span>
            {r.label}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn--primary" onClick={() => setOpen(false)}>
          Request a quotation
        </Link>
      </div>
    </header>
  )
}
