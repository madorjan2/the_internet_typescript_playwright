import { test, expect, FileChooser } from './fixtures/baseTest';
import { join } from 'path';

test.describe('File Upload', () => {
	test.use({ testPath: 'upload' });

	test('file upload', async ({ page }) => {
		const fileChooserPromise: Promise<FileChooser> =
			page.waitForEvent('filechooser');
		await page.locator('#file-upload').click();
		const fileChooser = await fileChooserPromise;
		await fileChooser.setFiles(
			join(__dirname, '/test_data/test_data_17.txt'),
		);

		await page.getByRole('button', { name: 'Upload' }).click();
		await expect(page.locator('#uploaded-files')).toHaveText(
			'test_data_17.txt',
		);
	});
});
