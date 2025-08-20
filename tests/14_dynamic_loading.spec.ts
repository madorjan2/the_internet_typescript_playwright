import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Dynamic Loading', () => {
	test.use({ testPath: 'dynamic_loading' });

	const links: string[] = ['Example 1', 'Example 2'];

	links.forEach((link: string) => {
		test(`element loads on page ${link}`, async ({ page }) => {
			await page.getByRole('link', { name: link }).click();
			const h4_result: Locator = page.locator('#finish h4');
			await expect(h4_result).toBeHidden();

			await page.getByRole('button', { name: 'Start' }).click();
			await expect(h4_result).toBeVisible({ timeout: 200000 });
		});
	});
});
