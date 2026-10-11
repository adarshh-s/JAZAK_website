import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import IntegratedLine from './components/IntegratedLine'
import Services from './components/Services'
import Projects from './components/Projects'
import Materials from './components/Materials'
import About from './components/About'
import Values from './components/Values'
import Quote from './components/Quote'
import Footer from './components/Footer'

export default function App() {
  // Service cards and material "Enquire" links prefill the quote form.
  const [prefill, setPrefill] = useState(null)
  const pick = (p) => setPrefill({ ...p, at: Date.now() })

  return (
    <>
      <a className="skip" href="#contact">Skip to quotation form</a>
      <Nav />
      <main>
        <Hero />
        <IntegratedLine />
        <Services onPick={pick} />
        <Projects />
        <Materials onPick={pick} />
        <About />
        <Values />
        <Quote prefill={prefill} />
      </main>
      <Footer />
    </>
  )
}
