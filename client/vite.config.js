import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'router';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor';
            if (id.includes('@react-google-maps')) return 'maps';
            if (id.includes('framer-motion')) return 'animation';
            if (id.includes('react-markdown') || id.includes('remark')) return 'markdown';
            return 'vendor-other';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }

})

