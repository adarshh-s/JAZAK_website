import PageHeader from '../components/PageHeader'
import Quote from '../components/Quote'
import { quote } from '../data/content'
import img from '../assets/photos/profile/kitchen-dining-ceiling.jpg'

export default function ContactPage() {
  return (
    <>
      <PageHeader
        code="JZ-07"
        label="Contact"
        title={['Tell us about', 'your project.']}
        lede={quote.supporting}
        image={img}
      />
      <Quote head={false} />
    </>
  )
}
