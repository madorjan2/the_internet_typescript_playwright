import { test, expect } from './fixtures/baseTest';

test.describe('Entry Ad', () => {
	test.use({ testPath: 'entry_ad' });

	test('modal disappears after closing', async ({ page }) => {
		await page.locator('.modal-footer p').click();
		await expect(page.locator('.modal')).toBeHidden();
	});

	test('modal does not reappear after refreshing', async ({ page }) => {
		await page.locator('.modal-footer p').click();
		await expect(page.locator('.modal')).toBeHidden();

		await page.reload();

		await expect(page.locator('.modal')).toBeHidden();
	});

	test('modal reappears on clicking "click here"', async ({
		page,
		browserName,
	}) => {
		test.skip(
			browserName === 'webkit' || browserName === 'firefox',
			'Test is unstable in WebKit and flaky on Firefox on CI',
		);
		await page.locator('.modal-footer p').click();
		await expect(page.locator('.modal')).toBeHidden();

		await page.getByRole('link', { name: 'click here' }).click();

		await page.reload();

		await expect(page.locator('.modal')).toBeVisible();
	});
});
