import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Shadow DOM', () => {
	test.use({ testPath: 'shadowdom' });

	test('should open shadow dom', async ({ page }) => {
		const firstLine: Locator = page.locator('my-paragraph span');
		const secondLine: Locator = page.locator('my-paragraph li').first();
		const thirdLine: Locator = page.locator('my-paragraph li').last();

		await expect(firstLine).toHaveText("Let's have some different text!");
		await expect(secondLine).toHaveText("Let's have some different text!");
		await expect(thirdLine).toHaveText('In a list!');
	});
});
