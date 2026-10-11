import { integrated } from '../data/content'
import { useCountUp, useInView, useScrollProgress } from '../hooks/motion'
import { Diamond } from './Graphics'
import SectionHead from './SectionHead'

function Fact({ value, label, start, delay }) {
  const n = useCountUp(value, start, value > 100 ? 1400 : 900)
  return (
    <div className={`fact reveal ${start ? 'is-in' : ''}`} style={{ '--delay': `${delay}ms` }}>
      <span className="fact__value tabular">{n}</span>
      <span className="fact__label">{label}</span>
    </div>
  )
}

export default function IntegratedLine() {
  const [lineRef, progress] = useScrollProgress(0.9, 0.45)
  const [factsRef, factsIn] = useInView({ threshold: 0.4 })
  const stages = integrated.stages
  const [eyebrowCode, ...rest] = integrated.eyebrow.split(' · ')

  return (
    <section id="integrated" className="section section--integrated">
      <div className="container">
        <SectionHead code="JZ-01" eyebrow={eyebrowCode} title={integrated.headline}>
          {integrated.supporting}
        </SectionHead>

        <div className="line-board" ref={lineRef}>
          <p className="mono line-board__tag">
            <span className="accent">{rest.join(' · ')}</span> · Drawn as you scroll
          </p>
          <div className="iline" style={{ '--p': progress }}>
            <div className="iline__track" aria-hidden="true">
              <span className="iline__fill" />
            </div>
            <ol className="iline__stages">
              {stages.map((s, i) => {
                const at = i / (stages.length - 1)
                const reached = progress >= at - 0.001
                return (
                  <li key={s.title} className={`stage ${reached ? 'is-reached' : ''}`}>
                    <span className="stage__node">
                      <Diamond size={14} filled={i === stages.length - 1 ? reached : false} />
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
          {integrated.facts.map((f, i) => (
            <Fact key={f.label} {...f} start={factsIn} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
