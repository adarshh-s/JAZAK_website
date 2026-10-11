import { services } from '../data/content'
import { useRef } from 'react'
import Reveal, { useParallax } from './Reveal'
import SectionHead from './SectionHead'
import { Arrow } from './Graphics'

const pad = (n) => String(n).padStart(2, '0')

export default function Services({ onPick }) {
  const total = services.items.length
  const ref = useRef(null)
  useParallax(ref, '.service-card__media img', 7)
  return (
    <section id="services" ref={ref} className="section">
      <div className="container">
        <SectionHead code="JZ-02" eyebrow="Services" title={services.headline}>
          {services.supporting}
        </SectionHead>

        <div className="services-grid">
          {services.items.map((s, i) => (
            <Reveal
              as="article"
              key={s.title}
              className="service-card"
              delay={(i % 4) * 90}
            >
              <a
                href="#contact"
                className="service-card__link"
                onClick={() => onPick({ service: s.title })}
                aria-label={`${s.title}: request a quotation`}
              >
                <div className={`service-card__media grade--${s.grade}`}>
                  <img src={s.image} alt="" loading="lazy" />
                </div>
                <div className="service-card__body">
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <div className="service-card__foot mono">
                  <span>
                    Service {pad(i + 1)} / {pad(total)}
                  </span>
                  <Arrow />
                </div>
              </a>
            </Reveal>
          ))}

          <Reveal as="div" className="service-card service-card--cta" delay={270}>
            <p className="mono accent">One accountable team</p>
            <p className="service-card__cta-text">
              Scope, schedule and supply, coordinated by one contractor from the first survey to handover.
            </p>
            <a href="#contact" className="btn btn--primary">
              {services.cta} <Arrow />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
