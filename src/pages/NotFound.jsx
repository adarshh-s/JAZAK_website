import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function NotFound() {
  return (
    <>
      <PageHeader code="JZ-404" label="Not found" title={['This page', 'is not on the drawings.']} />
      <section className="section">
        <div className="container">
          <Link to="/" className="btn btn--primary">
            Back to the homepage
          </Link>
        </div>
      </section>
    </>
  )
}
