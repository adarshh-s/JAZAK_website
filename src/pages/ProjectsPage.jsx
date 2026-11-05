import PageHeader from '../components/PageHeader'
import Projects from '../components/Projects'
import IntegratedLine from '../components/IntegratedLine'
import { projects } from '../data/content'
import img from '../assets/photos/profile/arched-villa-facade.jpg'

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        code="JZ-03"
        label="Projects"
        title={['Our work', 'across Qatar.']}
        lede={projects.supporting}
        image={img}
      />
      <Projects />
      <IntegratedLine />
    </>
  )
}
