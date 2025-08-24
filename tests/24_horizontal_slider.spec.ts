import { test, expect, Page, Locator } from './fixtures/baseTest';

test.describe('Horizontal Slider', () => {
	test.use({ testPath: 'horizontal_slider' });

	const getSlider = (page: Page): Locator => {
		return page.getByRole('slider');
	};
	const getValue = (page: Page): Locator => {
		return page.locator('#range');
	};

	const getExpectedValue = (value: number): number => {
		return value % 2 == 0 ? value * 0.5 : value * 0.5;
	};
	test('click in the middle using bounding box', async ({ page }) => {
		await expect(getValue(page)).toHaveText('0');
		const boundingBox: {
			x: number;
			y: number;
			width: number;
			height: number;
		} | null = await getSlider(page).boundingBox();
		expect(boundingBox).not.toBeNull();
		const midX: number = boundingBox!.x + boundingBox!.width / 2;
		const midY: number = boundingBox!.y + boundingBox!.height / 2;
		await page.mouse.click(midX, midY);
		await expect(getValue(page)).toHaveText('2.5');
	});

	test('using arrow keys', async ({ page }) => {
		await getSlider(page).focus();
		for (let i: number = 0; i < 10; i++) {
			const expectedResult: number = getExpectedValue(i);
			await expect(getValue(page)).toHaveText(expectedResult.toString());
			await page.keyboard.press('ArrowRight');
		}
		await expect(getValue(page)).toHaveText('5');
	});

	test('dragging by using bounding box', async ({ page }) => {
		const boundingBox: {
			x: number;
			y: number;
			width: number;
			height: number;
		} | null = await getSlider(page).boundingBox();
		expect(boundingBox).not.toBeNull();
		const leftX: number = boundingBox!.x;
		const rightX: number = boundingBox!.x + boundingBox!.width;
		const midY: number = boundingBox!.y + boundingBox!.height / 2;
		await page.mouse.move(leftX, midY);
		await page.mouse.down();
		await page.mouse.move(rightX, midY);
		await page.mouse.up();
		await expect(getValue(page)).toHaveText('5');
	});
});
