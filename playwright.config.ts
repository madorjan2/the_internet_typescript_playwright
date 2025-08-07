import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:7080/',
        headless: false,
        viewport: null, // { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        launchOptions: {
            slowMo: 1000,
            args: ['--start-maximized'],
        }
    },
    reporter: 'list',
});
