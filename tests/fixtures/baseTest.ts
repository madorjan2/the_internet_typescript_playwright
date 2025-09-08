import { test as base } from '@playwright/test';

type CustomFixtures = {
	testPath: string;
	headers?: Record<string, string>;
    errors: string[];
};

export const test = base.extend<CustomFixtures>({
	testPath: ['', { option: true }],
	headers: [undefined, { option: true }],
    errors: async ({}, use) => {
        const errors: string[] = [];
        await use(errors);
    },

	page: async ({ page, testPath, headers, errors }, use) => {
		if (headers) {
			await page.route('**/*', async (route) => {
				const newHeaders = {
					...route.request().headers(),
					...headers,
				};
				await route.continue({ headers: newHeaders });
			});
		}
        page.on('pageerror', (error) => {
            errors.push(error.message);
        });
		await page.goto('/' + testPath || '/');
		await use(page);
	},
});

export * from '@playwright/test';
