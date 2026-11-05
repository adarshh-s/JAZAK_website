import Hero from '../components/Hero'
import IntegratedLine from '../components/IntegratedLine'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Materials from '../components/Materials'
import Values from '../components/Values'
import Quote from '../components/Quote'
import usePrefill from './usePrefill'

export default function Home() {
  const [prefill, pick] = usePrefill()
  return (
    <>
      <Hero />
      <IntegratedLine />
      <Services onPick={pick} />
      <Projects compact />
      <Materials onPick={pick} />
      <Values />
      <Quote prefill={prefill} />
    </>
  )
}
