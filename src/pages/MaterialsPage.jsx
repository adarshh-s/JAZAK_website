import PageHeader from '../components/PageHeader'
import Materials from '../components/Materials'
import Quote from '../components/Quote'
import usePrefill from './usePrefill'
import { materials } from '../data/content'
import img from '../assets/photos/profile/materials-yard.jpg'

export default function MaterialsPage() {
  const [prefill, pick] = usePrefill()
  return (
    <>
      <PageHeader
        code="JZ-04"
        label="Materials"
        title={['Building materials,', 'supplied in Doha.']}
        lede={materials.supporting}
        image={img}
      />
      <Materials onPick={pick} />
      <Quote prefill={prefill} />
    </>
  )
}
