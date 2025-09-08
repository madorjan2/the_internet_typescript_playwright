import { test, expect } from './fixtures/baseTest';

test.describe('Javascript onLoad error', () => {
	test.use({ testPath: 'javascript_error' });

	test.describe.configure({ retries: 3 });

	test('should recieve error message', async ({ page, errors }) => {
		expect(errors.length).toBeGreaterThan(0);
	});
});
