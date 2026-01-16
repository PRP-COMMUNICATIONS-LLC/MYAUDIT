import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600, // Phase 1: suppress warning
  },
  server: {
    host: true,
    port: 5173, // Forces the server back to the port the workstation expects
    hmr: {
      protocol: 'wss',
      clientPort: 443
    },
    allowedHosts: ['.cloudworkstations.dev']
  }
})
