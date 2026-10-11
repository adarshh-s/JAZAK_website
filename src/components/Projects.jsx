import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { projects } from '../data/content'
import Reveal, { useParallax } from './Reveal'
import { Flip, gsap, ScrollTrigger, reducedMotion } from '../motion/gsap'
import SectionHead from './SectionHead'
import { Arrow, Contours } from './Graphics'

// Simplified Qatar coastline, [lon, lat]. Illustrative, not survey-grade.
const QATAR = [
  [50.8, 24.74], [50.76, 24.95], [50.8, 25.15], [50.76, 25.4], [50.8, 25.55], [50.85, 25.65],
  [50.93, 25.8], [51.02, 25.97], [51.12, 26.1], [51.22, 26.16], [51.33, 26.1], [51.43, 26.0],
  [51.55, 25.92], [51.53, 25.75], [51.5, 25.65], [51.54, 25.52], [51.6, 25.42], [51.55, 25.33],
  [51.62, 25.27], [51.61, 25.15], [51.58, 25.02], [51.57, 24.9], [51.48, 24.7], [51.4, 24.6],
  [51.25, 24.55], [51.1, 24.48], [50.95, 24.55],
]

const W = 800
const H = 840
const K = 420
const project = ([lon, lat]) => [(lon - 50.2) * K * 0.906, (26.3 - lat) * K]
const DOHA = project([51.531, 25.2854])

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [hover, setHover] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const LIMIT = 7
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)
  const flipState = useRef(null)

  useParallax(sectionRef, '.gallery__frame img', 6)

  // Record tile positions before a filter change so Flip can glide them into place.
  const withFlip = (update) => {
    if (!reducedMotion() && galleryRef.current) {
      flipState.current = Flip.getState(galleryRef.current.querySelectorAll('.gallery__item'))
    }
    update()
  }

  useLayoutEffect(() => {
    const state = flipState.current
    if (!state) return
    flipState.current = null
    Flip.from(state, {
      targets: galleryRef.current.querySelectorAll('.gallery__item'),
      duration: 0.9,
      ease: 'build',
      scale: true,
      onEnter: (els) =>
        gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, delay: 0.15 }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [filter, showAll])

  const coast = useMemo(
    () => QATAR.map((p, i) => `${i ? 'L' : 'M'}${project(p).map((v) => v.toFixed(1)).join(',')}`).join('') + 'Z',
    [],
  )

  const matches = projects.items.map((p) => filter === 'All' || p.category === filter)
  let shown = 0
  const visible = matches.map((m) => m && (showAll || ++shown <= LIMIT))
  const hiddenCount = matches.filter(Boolean).length - visible.filter(Boolean).length
  const focus = hover ?? projects.items.findIndex((_, i) => visible[i])
  const focused = projects.items[focus]

  return (
    <section id="projects" ref={sectionRef} className="section section--projects">
      <div className="container">
        <SectionHead
          code="JZ-03"
          eyebrow="Projects"
          title={projects.headline}
          aside={
            <div className="filters" role="group" aria-label="Filter projects">
              {projects.filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`chip ${filter === f ? 'is-active' : ''}`}
                  aria-pressed={filter === f}
                  onClick={() =>
                    withFlip(() => {
                      setFilter(f)
                      setHover(null)
                    })
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          {projects.supporting}
        </SectionHead>

        <div className="projects-layout">
          <Reveal className="map-card">
            <svg className="map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of Qatar with sample project pins">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" fill="none" className="map__grid" />
                </pattern>
                <clipPath id="land">
                  <path d={coast} />
                </clipPath>
              </defs>
              <rect width={W} height={H} fill="url(#grid)" />
              <g clipPath="url(#land)">
                <rect width={W} height={H} className="map__land" />
                <Contours width={W} height={H} seed={5} hills={6} accentEvery={6} className="map__contours" />
              </g>
              <path d={coast} className="map__coast" />
              {[120, 220, 320].map((r) => (
                <circle key={r} cx={DOHA[0]} cy={DOHA[1]} r={r} className="map__ring" />
              ))}
              <g className="map__label mono">
                <text x={DOHA[0] + 16} y={DOHA[1] + 4}>DOHA</text>
                <text x={W - 40} y={60} textAnchor="end">ARABIAN GULF</text>
                <text x={W - 40} y={84} textAnchor="end">25.2854° N · 51.5310° E</text>
              </g>
              {projects.items.map((p, i) => {
                const [x, y] = project(p.pin)
                const on = i === focus
                return (
                  <g
                    key={p.caption}
                    className={`pin ${matches[i] ? '' : 'is-hidden'} ${on ? 'is-active' : ''}`}
                    transform={`translate(${x} ${y})`}
                    onMouseEnter={() => matches[i] && setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <rect x="-16" y="-16" width="32" height="32" transform="rotate(45)" className="pin__halo" />
                    <rect x="-7" y="-7" width="14" height="14" transform="rotate(45)" className="pin__core" />
                  </g>
                )
              })}
            </svg>
            <div className="map-card__legend mono">Sample pins, not real project locations</div>
            {focused && (
              <div className="map-card__info" key={focus}>
                <p className="mono accent">Sample pin · {focused.category}</p>
                <p className="map-card__title">{focused.caption}</p>
              </div>
            )}
          </Reveal>

          <ul className="gallery" ref={galleryRef}>
            {projects.items.map((p, i) => (
              <li
                key={p.caption}
                className={`gallery__item grade--${p.grade} ${visible[i] ? '' : 'is-hidden'} ${i === focus ? 'is-active' : ''}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <Reveal className="gallery__frame" delay={(i % 2) * 90}>
                  <img src={p.image} alt={p.caption} loading="lazy" />
                  <span className="gallery__cap mono">
                    <span>{p.caption}</span>
                    <span>{p.category}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="section-cta">
          {hiddenCount > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={() => withFlip(() => setShowAll(true))}>
              {projects.cta} <span className="mono muted">+{hiddenCount}</span> <Arrow />
            </button>
          ) : (
            showAll && (
              <button type="button" className="btn btn--ghost" onClick={() => withFlip(() => setShowAll(false))}>
                Show fewer
              </button>
            )
          )}
        </div>
      </div>
    </section>
  )
}
