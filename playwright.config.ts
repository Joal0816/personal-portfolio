import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for the portfolio.
 *
 * Single framework (@playwright/test) for both the E2E "physical" specs in
 * tests/e2e and the pure unit specs in tests/unit.
 *
 * NOTE: the webServer block below is configuration only — tests are expected
 * to be run later (orchestrator-gated) with the dev server started on port 3210.
 */
export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  use: {
    baseURL: 'http://localhost:3210',
  },
  webServer: {
    command: 'npm run dev -- -p 3210',
    url: 'http://localhost:3210',
    reuseExistingServer: true,
    timeout: 60000,
  },
})
