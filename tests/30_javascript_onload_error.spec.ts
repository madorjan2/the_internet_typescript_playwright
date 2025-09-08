import { test, expect } from './fixtures/baseTest';

test.describe('Javascript onLoad error', () => {
	test.use({ testPath: 'javascript_error' });

	test('should recieve error messsage', async ({ page, errors }) => {
		expect(errors.length).toBeGreaterThan(0);
	});
});
