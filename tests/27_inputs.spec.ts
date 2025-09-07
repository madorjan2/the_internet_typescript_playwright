import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Inputs', () => {
	test.use({ testPath: 'inputs' });

	test('accepts input', async ({ page }) => {
		const input: Locator = page.getByRole('spinbutton');
		await input.fill('123');
		expect(await input.inputValue()).toBe('123');
	});

	test('increase and decrease works with arrow keys', async ({ page }) => {
		const input: Locator = page.getByRole('spinbutton');
		await input.fill('123');
		await input.press('ArrowUp');
		expect(await input.inputValue()).toBe('124');
		await input.press('ArrowDown');
		expect(await input.inputValue()).toBe('123');
	});
});
