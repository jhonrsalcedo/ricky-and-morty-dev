/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults, coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, 'tests/e2e.*'],
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, '*.config.*', 'src/main.tsx']
    }
  }
})
