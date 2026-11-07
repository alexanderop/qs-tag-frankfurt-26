import vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['packages/**/tests/**/*.test.ts'],
          exclude: ['**/*.browser.test.ts', '**/node_modules/**'],
          environment: 'node',
        },
      },
      {
        plugins: [vue()],
        resolve: { dedupe: ['vue'] },
        // Slidev's client code reads this build-time global (see useClicks.ts)
        define: { __DEV__: 'true' },
        test: {
          name: 'components',
          include: ['packages/**/tests/**/*.browser.test.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        test: {
          name: 'deck',
          include: ['starter/tests/**/*.e2e.test.ts'],
          globalSetup: ['starter/tests/build-and-serve.ts'],
          environment: 'node',
          testTimeout: 60_000,
          hookTimeout: 300_000,
        },
      },
    ],
  },
})
