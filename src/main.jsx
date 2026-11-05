import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Production pages are prerendered to HTML; hydrate them instead of re-rendering.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
