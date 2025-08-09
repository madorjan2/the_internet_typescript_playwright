import { test, expect } from './fixtures/baseTest';

test.describe('Basic Auth', () => {
    test.use({
        testPath: 'basic_auth/',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
        }
    });

    test('Login using basic auth', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Basic Auth' })).toBeVisible();
    })
});