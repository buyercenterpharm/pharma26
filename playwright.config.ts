import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests', workers: 1, timeout: 20000,
  outputDir: '/tmp/pharma26-intro-results',
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173', viewport:{width:1440,height:900},
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args:['--no-sandbox','--enable-unsafe-swiftshader'] } },
  webServer: { command:'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort', url:'http://127.0.0.1:4173', reuseExistingServer:!process.env.CI },
});
