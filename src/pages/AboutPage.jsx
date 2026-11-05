import PageHeader from '../components/PageHeader'
import About from '../components/About'
import Values from '../components/Values'
import img from '../assets/photos/profile/majlis-ceiling-lighting.jpg'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        code="JZ-05"
        label="About"
        title={['Built in Doha', 'since 2021.']}
        lede="A licensed, multi-disciplinary construction firm delivering projects from the ground up."
        image={img}
      />
      <About />
      <Values />
    </>
  )
}
