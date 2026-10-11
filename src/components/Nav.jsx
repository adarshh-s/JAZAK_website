import { useEffect, useState } from 'react'
import { nav } from '../data/content'
import mark from '../assets/jazak-mark.png'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner container">
        <a href="#top" className="brand" aria-label="JAZAK, back to top" onClick={() => setOpen(false)}>
          <img src={mark} alt="" width="32" height="32" />
          <span className="brand__word">JAZAK</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href.slice(1) ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--primary btn--sm nav__cta" onClick={() => setOpen(false)}>
          Get a quote
        </a>

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
        {nav.map((item, i) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <span className="mono">0{i + 1}</span>
            {item.label}
          </a>
        ))}
        <a href="#contact" className="btn btn--primary" onClick={() => setOpen(false)}>
          Request a quotation
        </a>
      </div>
    </header>
  )
}
