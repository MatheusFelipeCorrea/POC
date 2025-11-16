import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. ADICIONA A CONFIGURAÇÃO DO VITEST
  test: {
    globals: true,
    environment: 'jsdom',
    // 2. Aponta para o arquivo de setup que vamos criar
    setupFiles: './src/setupTests.js',
  },
})