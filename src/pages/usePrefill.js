import { useState } from 'react'

// Service cards and material "Enquire" links prefill the quote form on the same page.
export default function usePrefill() {
  const [prefill, setPrefill] = useState(null)
  return [prefill, (p) => setPrefill({ ...p, at: Date.now() })]
}
