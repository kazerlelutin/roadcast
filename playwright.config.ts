import { defineConfig, devices } from "@playwright/test";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3100";
export default defineConfig({ testDir: "./tests/e2e", use: { baseURL, ...devices["Desktop Chrome"] }, webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : { command: "bun run dev -- --host 127.0.0.1 --port 3100", url: "http://127.0.0.1:3100", reuseExistingServer: !process.env.CI } });
