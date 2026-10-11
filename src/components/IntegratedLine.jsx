import { useRef, useState } from 'react'
import { integrated } from '../data/content'
import { gsap, useGSAP, reducedMotion } from '../motion/gsap'
import { Diamond } from './Graphics'
import SectionHead from './SectionHead'

export default function IntegratedLine() {
  const boardRef = useRef(null)
  const factsRef = useRef(null)
  const stages = integrated.stages
  const [reached, setReached] = useState(reducedMotion() ? stages.length : 1)
  const [eyebrowCode, ...rest] = integrated.eyebrow.split(' · ')

  useGSAP(
    () => {
      const line = boardRef.current.querySelector('.iline')
      if (reducedMotion()) {
        gsap.set(line, { '--p': 1 })
        return
      }
      // The red line is scrubbed by scroll and lights each stage as it arrives.
      gsap.fromTo(
        line,
        { '--p': 0 },
        {
          '--p': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: boardRef.current,
            start: 'top 80%',
            end: 'bottom 55%',
            scrub: 0.8,
            onUpdate: (self) => {
              const n = Math.floor(self.progress * (stages.length - 1) + 0.02) + 1
              setReached((r) => (r === n ? r : n))
            },
          },
        },
      )

      // Facts: rise in sequence, then the figures roll up once and hold still.
      const facts = gsap.utils.toArray('.fact', factsRef.current)
      gsap.from(facts, {
        y: 40,
        autoAlpha: 0,
        stagger: 0.14,
        duration: 1.1,
        scrollTrigger: { trigger: factsRef.current, start: 'top 85%', once: true },
      })
      facts.forEach((fact) => {
        const el = fact.querySelector('.fact__value')
        const target = Number(el.dataset.value)
        const counter = { v: target > 1000 ? target - 40 : 0 }
        el.textContent = Math.round(counter.v)
        gsap.to(counter, {
          v: target,
          duration: target > 100 ? 1.6 : 1.1,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = Math.round(counter.v)),
          scrollTrigger: { trigger: factsRef.current, start: 'top 85%', once: true },
        })
      })
    },
    { dependencies: [] },
  )

  return (
    <section id="integrated" className="section section--integrated">
      <div className="container">
        <SectionHead code="JZ-01" eyebrow={eyebrowCode} title={integrated.headline}>
          {integrated.supporting}
        </SectionHead>

        <div className="line-board" ref={boardRef}>
          <p className="mono line-board__tag">
            <span className="accent">{rest.join(' · ')}</span> · Drawn as you scroll
          </p>
          <div className="iline">
            <div className="iline__track" aria-hidden="true">
              <span className="iline__fill" />
            </div>
            <ol className="iline__stages">
              {stages.map((s, i) => {
                const on = i < reached
                return (
                  <li key={s.title} className={`stage ${on ? 'is-reached' : ''}`}>
                    <span className="stage__node">
                      <Diamond size={14} filled={i === stages.length - 1 ? on : false} />
                    </span>
                    <span className="mono stage__tag">{s.tag}</span>
                    <h3 className="h3 stage__title">{s.title}</h3>
                    <p className="stage__text">{s.text}</p>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="line-board__foot mono">
            <span>
              <strong>One contractor</strong> · One point of contact
            </span>
            <span>No hand-offs between firms</span>
          </div>
        </div>

        <div className="facts" ref={factsRef}>
          {integrated.facts.map((f) => (
            <div key={f.label} className="fact">
              <span className="fact__value tabular" data-value={f.value}>
                {f.value}
              </span>
              <span className="fact__label">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
