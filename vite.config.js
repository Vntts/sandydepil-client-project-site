import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Separa as bibliotecas de animação/carrossel em chunks próprios
        // para que o bundle inicial fique menor.
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom')) {
            return 'motion'
          }
          if (id.includes('node_modules/swiper')) return 'swiper'
          return null
        },
      },
    },
  },
})
