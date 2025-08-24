import { test, expect } from './fixtures/baseTest';

test.describe('Nested Frames', () => {
	test.use({ testPath: 'nested_frames' });

	const directions: string[] = ['left', 'middle', 'right'];

	directions.forEach((direction: string) => {
		test(`double nested frame: top -> ${direction} should contain appropriate text`, async ({
			page,
		}) => {
			const frameText: string | null = await page
				.frameLocator(`[name = "frame-top"]`)
				.frameLocator(`[name="frame-${direction}"]`)
				.locator('body')
				.textContent();
			expect(frameText).toContain(direction.toUpperCase());
		});
	});

	test('single nested frame: bottom contains appropriate text', async ({
		page,
	}) => {
		const frameText: string | null = await page
			.frameLocator(`[name = "frame-bottom"]`)
			.locator('body')
			.textContent();
		expect(frameText).toContain('BOTTOM');
	});
});
