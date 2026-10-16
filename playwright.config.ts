import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright configuration for the portfolio.
 *
 * Single framework (@playwright/test) for both the E2E "physical" specs in
 * tests/e2e and the pure unit specs in tests/unit.
 *
 * Starts the local development server unless PORTFOLIO_BASE_URL points to
 * an already running preview, production build, or public deployment.
 */
export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (process.env.PLAYWRIGHT_USE_BUNDLED_CHROMIUM ? undefined : '/usr/bin/chromium'),
        },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (process.env.PLAYWRIGHT_USE_BUNDLED_CHROMIUM ? undefined : '/usr/bin/chromium'),
        },
      },
    },
  ],
  use: {
    baseURL: process.env.PORTFOLIO_BASE_URL || 'http://localhost:3210',
  },
  webServer: process.env.PORTFOLIO_BASE_URL ? undefined : {
    command: 'npm run dev -- -p 3210',
    url: 'http://localhost:3210',
    reuseExistingServer: true,
    timeout: 60000,
  },
})
