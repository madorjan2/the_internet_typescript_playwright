import { test, expect, Locator } from './fixtures/baseTest';

test.describe('Drag and Drop', () => {
	test.use({ testPath: 'drag_and_drop' });

	test('elements switch using drag_to', async ({ page }) => {
		const columnA: Locator = page.locator('#column-a');
		const columnB: Locator = page.locator('#column-b');
		expect(await columnA.textContent()).toBe('A');
		expect(await columnB.textContent()).toBe('B');
		await columnA.dragTo(columnB);
		expect(await columnA.textContent()).toBe('B');
		expect(await columnB.textContent()).toBe('A');
	});

	test('elements switch using mouse actions', async ({ page }) => {
		const columnA: Locator = page.locator('#column-a');
		const columnB: Locator = page.locator('#column-b');
		expect(await columnA.textContent()).toBe('A');
		expect(await columnB.textContent()).toBe('B');
		await columnA.hover();
		await page.mouse.down();
		await columnB.hover();
		await page.mouse.up();
		expect(await columnA.textContent()).toBe('B');
		expect(await columnB.textContent()).toBe('A');
	});
});
