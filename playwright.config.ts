import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	timeout: 30000,
	use: {
		baseURL: 'http://localhost:7080/',
		headless: !!process.env.CI,
		viewport: process.env.CI ? { width: 1920, height: 1080 } : null,
		screenshot: 'only-on-failure',
		launchOptions: {
			slowMo: process.env.CI ? 0 : 1000,
			args: process.env.CI ? [] : ['--start-maximized'],
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		...(process.env.CI
			? [
					{
						name: 'firefox',
						use: { ...devices['Desktop Firefox'] },
					},
					{
						name: 'webkit',
						use: { ...devices['Desktop Safari'] },
					},
				]
			: []),
	],
	reporter: 'list',
});
