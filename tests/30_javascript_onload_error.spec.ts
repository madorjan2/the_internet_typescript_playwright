import { test, expect } from './fixtures/baseTest';

test.describe('Javascript onLoad error', () => {
	test.use({ testPath: 'javascript_error' });

	test('should receive error message', async ({ page, errors }, testInfo) => {
		test.skip(
			!!process.env.CI && testInfo.project.name === 'firefox',
			'Firefox does not show console errors in CI',
		);
		expect(errors.length).toBeGreaterThan(0);
	});
});
