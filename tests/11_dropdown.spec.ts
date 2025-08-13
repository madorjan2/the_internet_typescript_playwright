import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Dropdown', () => {
	test.use({ testPath: 'dropdown' });

	test('dropdown has 3 options', async ({ page }) => {
		const select: Locator = page.getByRole('combobox');
		const options: Locator = select.locator('option');
		await expect(options).toHaveCount(3);
	});

	test('dropdown is displaying correct text for all options', async ({
		page,
	}) => {
		const select: Locator = page.getByRole('combobox');
		const selectedOption: Locator = select.locator('//option[@selected]');
		await expect(selectedOption).toHaveText('Please select an option');
		await select.selectOption('1');
		await expect(selectedOption).toHaveText('Option 1');
		await select.selectOption('2');
		await expect(selectedOption).toHaveText('Option 2');
	});

	test('dropdown has correct values for all options', async ({ page }) => {
		const select: Locator = page.getByRole('combobox');
		const selectedOption: Locator = select.locator('//option[@selected]');
		await expect(selectedOption).toHaveAttribute('value', '');
		await select.selectOption({ label: 'Option 1' });
		await expect(selectedOption).toHaveAttribute('value', '1');
		await select.selectOption({ label: 'Option 2' });
		await expect(selectedOption).toHaveAttribute('value', '2');
	});
});
