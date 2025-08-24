import { test, expect, Locator, Page } from './fixtures/baseTest';

test.describe('Infinite Scroll', () => {
	test.use({ testPath: 'infinite_scroll' });

	const numberOfScrolls: number = 10;
	const timeout: number = 5000;

	const getNumberOfParagraphs = async (page: Page) => {
		const paragraphs: Locator[] = await page
			.locator('.jscroll-added')
			.all();
		return paragraphs.length;
	};

	test('scrolling using the end key', async ({ page }) => {
		for (let i: number = 0; i < numberOfScrolls; i++) {
			const originalNumber: number = await getNumberOfParagraphs(page);
			await page.keyboard.press('End');
			await expect
				.poll(async () => await getNumberOfParagraphs(page), {
					timeout,
				})
				.toBeGreaterThan(originalNumber);
		}
	});

	test('scrolling using javascript', async ({ page }) => {
		for (let i: number = 0; i < numberOfScrolls; i++) {
			const originalNumber: number = await getNumberOfParagraphs(page);
			await page.evaluate(() => {
				window.scrollTo(0, document.body.scrollHeight);
			});
			await expect
				.poll(async () => await getNumberOfParagraphs(page), {
					timeout,
				})
				.toBeGreaterThan(originalNumber);
		}
	});
});
