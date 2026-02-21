/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import { configDefaults, coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, 'tests/e2e.*'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, '*.config.*', 'src/main.tsx']
    }
  }
})
