import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Bundle these into the prerender build; their CommonJS builds break default imports in Node.
  ssr: { noExternal: ['gsap', '@gsap/react', 'lenis'] },
})
