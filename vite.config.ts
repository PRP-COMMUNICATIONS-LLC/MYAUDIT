import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const outputDir = env.BUILD_OUTPUT_DIR || 'dist'

  return {
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 600, // Phase 1: suppress warning
      outDir: outputDir,
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
  }
})
