import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP, reducedMotion } from '../motion/gsap'
import { Contours } from './Graphics'

// Inner-page header: the page's single <h1>, over a graded site photo.
export default function PageHeader({ code, label, title, lede, image }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (reducedMotion()) return
      gsap
        .timeline()
        .from('.page-header__bg', { scale: 1.15, autoAlpha: 0, duration: 1.8 })
        .from('.page-header__title .line > span', { yPercent: 108, duration: 1.2, stagger: 0.12 }, 0.2)
        .from(['.page-header__crumbs', '.page-header__lede'], { autoAlpha: 0, y: 20, duration: 1, stagger: 0.1 }, 0.6)
      gsap.to('.page-header__bg', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    },
    { scope: ref },
  )

  const lines = Array.isArray(title) ? title : [title]

  return (
    <header ref={ref} className="page-header">
      <div className="page-header__media" aria-hidden="true">
        {image && <img className="page-header__bg" src={image} alt="" />}
        <div className="page-header__shade" />
        <Contours className="hero__contours" seed={code.length * 7 + 3} hills={6} live />
      </div>
      <div className="container page-header__inner">
        <nav className="page-header__crumbs mono" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
          <span className="accent page-header__code">{code}</span>
        </nav>
        <h1 className="page-header__title">
          {lines.map((l, i) => (
            <span className="line" key={i}>
              <span className={i === lines.length - 1 && lines.length > 1 ? 'accent' : ''}>{l}</span>
            </span>
          ))}
        </h1>
        {lede && <p className="page-header__lede">{lede}</p>}
      </div>
    </header>
  )
}
