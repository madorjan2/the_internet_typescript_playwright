import { test, expect } from './fixtures/baseTest';

test.describe('Geolocation', () => {
	test.use({ testPath: 'geolocation' });

	const testData: { lat: number; lon: number } = { lat: 12.345, lon: 9.8765 };

	test('geolocation shows correct data', async ({ page }) => {
		await page.context().grantPermissions(['geolocation']);
		await page
			.context()
			.setGeolocation({
				latitude: testData.lat,
				longitude: testData.lon,
			});
		await page.getByRole('button', { name: 'Where am I?' }).click();
		await expect(page.locator('#lat-value')).toContainText(
			testData.lat.toString(),
		);
		await expect(page.locator('#long-value')).toContainText(
			testData.lon.toString(),
		);
	});
});
