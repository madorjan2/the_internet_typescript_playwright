import { test, expect, Page } from './fixtures/baseTest';

test.describe('Disappearing Elements', () => {
	test.use({ testPath: 'disappearing_elements' });

	const isGalleryPresent = async (page: Page): Promise<boolean> => {
		return (await page.getByRole('link', { name: 'Gallery' }).count()) > 0;
	};

	const getNumberOfReloads = async (
		page: Page,
		limit: number,
		was_present: boolean,
	): Promise<number> => {
		let reloads: number = 0;
		while (
			(await isGalleryPresent(page)) == was_present &&
			reloads < limit
		) {
			await page.reload();
			reloads++;
		}
		return reloads;
	};

	test('elements dissappear within 10 reloads', async ({ page }) => {
		expect(
			await getNumberOfReloads(page, 10, await isGalleryPresent(page)),
		).toBeLessThanOrEqual(10);
	});
});
