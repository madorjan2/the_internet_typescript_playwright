import { test, expect } from './fixtures/baseTest';

test.describe('Iframe', () => {
	test.use({ testPath: 'iframe' });

	test('iframe editor contains correct placeholder', async ({ page }) => {
		await page.getByRole('button', { name: 'Close' }).click();
		await expect(
			page.frameLocator('#mce_0_ifr').locator('[data-id="mce_0"]'),
		).toContainText('Your content goes here.');
	});
});
