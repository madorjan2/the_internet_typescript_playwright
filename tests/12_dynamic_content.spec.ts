import { test, expect, Page, Locator } from './fixtures/baseTest';

test.describe('Dynamic Content', () => {
	test.use({ testPath: 'dynamic_content' });

	const areDifferent = (arr: string[][]): boolean => {
		const zeroeths: string[] = arr.map((row) => row[0]);
		const firsts: string[] = arr.map((row) => row[1]);
		const seconds: string[] = arr.map((row) => row[2]);
		return (
			new Set(zeroeths).size > 1 &&
			new Set(firsts).size > 1 &&
			new Set(seconds).size > 1
		);
	};

	const gatherData = async (
		page: Page,
	): Promise<{ images: string[][]; descriptions: string[][] }> => {
		const currentImages: Locator[] = await page
			.locator('//div[@id="content"]//img')
			.all();
		const currentDescriptions: Locator[] = await page
			.locator('//div[@class="large-10 columns"]')
			.all();
		let images: string[][] = [];
		let descriptions: string[][] = [];

		for (let i: number = 0; i < 10; i++) {
			let temp_images: string[] = [];
			let temp_descriptions: string[] = [];
			for (const image of currentImages) {
				const src: string | null = await image.getAttribute('src');
				expect(src).not.toBeNull();
				temp_images.push(src!);
			}
			for (const description of currentDescriptions) {
				const desc: string | null = await description.textContent();
				expect(desc).not.toBeNull();
				temp_descriptions.push(desc!);
			}
			images.push(temp_images);
			descriptions.push(temp_descriptions);

			if (areDifferent(images) && areDifferent(descriptions)) {
				break;
			}

			await page.reload();
		}

		return { images, descriptions };
	};

	test('content changes', async ({ page }) => {
		const { images, descriptions } = await gatherData(page);
		expect(areDifferent(images)).toBe(true);
		expect(areDifferent(descriptions)).toBe(true);
	});
});
