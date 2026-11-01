import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173/ashfolio/",
    trace: "retain-on-failure",
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: "node scripts/serve-static.mjs",
    url: "http://127.0.0.1:4173/ashfolio/",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: {
      GITHUB_REPOSITORY: "ashutoshpalhare/ashfolio",
    },
  },
});
