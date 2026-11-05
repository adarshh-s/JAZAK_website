import PageHeader from '../components/PageHeader'
import Services from '../components/Services'
import IntegratedLine from '../components/IntegratedLine'
import Quote from '../components/Quote'
import usePrefill from './usePrefill'
import { services } from '../data/content'
import img from '../assets/photos/profile/villa-structure.jpg'

export default function ServicesPage() {
  const [prefill, pick] = usePrefill()
  return (
    <>
      <PageHeader
        code="JZ-02"
        label="Services"
        title={['Construction services', 'under one roof.']}
        lede={services.supporting}
        image={img}
      />
      <Services onPick={pick} />
      <IntegratedLine />
      <Quote prefill={prefill} />
    </>
  )
}
