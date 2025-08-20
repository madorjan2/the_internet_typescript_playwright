import { test, expect } from './fixtures/baseTest';

test.describe('Exit Intent', () => {
	test.use({ testPath: 'exit_intent' });

	test('pop-up appears on mouse leave', async ({ page }) => {
		const viewport_size: { width: number; height: number } | null =
			page.viewportSize();
		expect(viewport_size).not.toBeNull();
		await page.mouse.move(viewport_size!.width / 2, 1);
		await page.mouse.move(viewport_size!.width / 2, -5);
		await expect(page.locator('.modal')).toBeVisible();
	});
});
