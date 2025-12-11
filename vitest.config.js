import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        setupFiles: './vitest.setup.js',
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{ts,tsx}'],
            // thresholds: {
            //     branches: 70,
            //     functions: 70,
            //     lines: 70,
            //     statements: 70,
            // },
        },
        // environment: 'jsdom',
        // mode: 'test',
        browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
        },
    },
})
