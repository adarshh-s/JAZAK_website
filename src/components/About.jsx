import { about } from '../data/content'
import Reveal, { Rule } from './Reveal'
import SectionHead from './SectionHead'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead code="JZ-05" eyebrow={about.eyebrow} title={about.headline}>
          {about.intro}
        </SectionHead>

        <div className="about-body">
          {about.body.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 100}>
              {p}
            </Reveal>
          ))}
        </div>

        <p className="mono muted about-why-label">Why choose JAZAK</p>
        <div className="why-grid">
          {about.why.map((w, i) => (
            <Reveal key={w.title} className="why" delay={i * 110}>
              <Rule accent={i === 0} />
              <span className="mono accent why__num">0{i + 1}</span>
              <h3 className="h3">{w.title}</h3>
              <p>{w.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
