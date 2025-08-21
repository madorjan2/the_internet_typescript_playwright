import { test, expect, Page, Locator } from './fixtures/baseTest';

test.describe('Floating Menu', () => {
	test.use({ testPath: 'floating_menu' });

	const isScrolledDown = async (page: Page): Promise<boolean> => {
		return await page.evaluate(() => {
			return window.scrollY > 0;
		});
	};

	const areElementsVisible = async (page: Page): Promise<boolean> => {
		const elements: Locator[] = [
			page.getByRole('link', { name: 'Home' }),
			page.getByRole('link', { name: 'News' }),
			page.getByRole('link', { name: 'Contact' }),
			page.getByRole('link', { name: 'About' }),
		];
		const visibilities = await Promise.all(
			elements.map((elem) => elem.isVisible()),
		);
		return visibilities.every(Boolean);
	};

	test('elements are visible', async ({ page }) => {
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});

	test('scroll down via mouse wheel', async ({ page }) => {
		await page.focus('body');
        await page.mouse.wheel(0, 500);
		const scrolledDown = await isScrolledDown(page);
		expect(scrolledDown).toBe(true);
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});

	test('scroll to element', async ({ page }) => {
		await page
			.getByRole('link', { name: 'Elemental Selenium' })
			.scrollIntoViewIfNeeded();
		const scrolledDown = await isScrolledDown(page);
		expect(scrolledDown).toBe(true);
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});

	test('javascript scroll by', async ({ page }) => {
		await page.evaluate(() => {
			window.scrollBy(0, 500);
		});
		const scrolledDown = await isScrolledDown(page);
		expect(scrolledDown).toBe(true);
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});

	test('javascript scroll to', async ({ page }) => {
		await page.evaluate(() => {
			window.scrollTo(0, 500);
		});
		const scrolledDown = await isScrolledDown(page);
		expect(scrolledDown).toBe(true);
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});

	test('javascript scroll to element', async ({ page }) => {
		const link_handle = await page
			.getByRole('link', { name: 'Elemental Selenium' })
			.elementHandle();
		expect(link_handle).not.toBeNull();
		await page.evaluate((elem) => {
			elem!.scrollIntoView();
		}, link_handle);
		const scrolledDown = await isScrolledDown(page);
		expect(scrolledDown).toBe(true);
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});

	test('page down key', async ({ page }) => {
		await page.focus('body')
        await page.press('body', 'PageDown');
		const scrolledDown = await isScrolledDown(page);
		expect(scrolledDown).toBe(true);
		const allVisible = await areElementsVisible(page);
		expect(allVisible).toBe(true);
	});
});
