import { test, expect, Page } from './fixtures/baseTest';

test.describe('New window', () => {
	test.use({ testPath: 'windows' });

	test('should open new window', async ({ context, page }, testInfo) => {
		const pagePromise: Promise<Page> = context.waitForEvent('page');
		await page.locator('a[href="/windows/new"]').click();
		const newPage: Page = await pagePromise;
		expect(newPage.url()).toBe(
			testInfo.project.use.baseURL + 'windows/new',
		);
		await expect(newPage.locator('h3')).toContainText('New Window');
	});
});
