import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/DIY-Lake-USV-NMEA-Mapping/',
  build: {
    outDir: 'dist',
  },
  assetsInclude: ['**/*.md'],
})
