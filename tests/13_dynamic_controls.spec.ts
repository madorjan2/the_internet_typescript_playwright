import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Dynamic Controls', () => {
	test.use({ testPath: 'dynamic_controls' });

	test('checkbox is removed then added', async ({ page }) => {
		const checkbox: Locator = page.getByRole('checkbox');
		await expect(checkbox).toBeVisible();

		await page.getByRole('button', { name: 'Remove' }).click();
		await expect(checkbox).toBeHidden();

		await page.getByRole('button', { name: 'Add' }).click();
		await expect(checkbox).toBeVisible();
	});

	test('input is enabled then disabled', async ({ page }) => {
		const input: Locator = page.getByRole('textbox');
		await expect(input).toBeDisabled();

		await page.getByRole('button', { name: 'Enable' }).click();
		await expect(input).toBeEnabled();

		await page.getByRole('button', { name: 'Disable' }).click();
		await expect(input).toBeDisabled({ timeout: 10000 });
	});
});
