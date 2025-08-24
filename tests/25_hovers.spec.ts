import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Hovers', () => {
	test.use({ testPath: 'hovers' });

	test('hover over elements displays information', async ({ page }) => {
		const imgs: Locator[] = await page
			.getByRole('img', { name: 'User Avatar' })
			.all();
		const captions: Locator[] = await page.locator('.figcaption').all();
		for (let i = 0; i < imgs.length; i++) {
			await imgs[i].hover();
			await expect(captions[i]).toBeVisible();
			const otherCaptions: Locator[] = captions.filter((_, j) => j != i);
			for (const caption of otherCaptions) {
				await expect(caption).toBeHidden();
			}
		}
	});
});
