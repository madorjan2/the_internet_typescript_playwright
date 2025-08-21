import { test, expect, Download } from './fixtures/baseTest';
import { join } from 'path';
import { readFileSync } from 'fs';

test.describe('File Download', () => {
	test.use({ testPath: 'download' });

	const readFileContent = (path: string): string => {
		return readFileSync(path, { encoding: 'utf-8' })
			.replace(/\r\n/g, '\n')
			.trim();
	};

	test('file downloads with correct data', async ({ page }) => {
		const downloadPromise: Promise<Download> =
			page.waitForEvent('download');
		await page.getByRole('link', { name: 'some-file.txt' }).click();
		const download: Download = await downloadPromise;
		const path: string = join(__dirname, download.suggestedFilename());
		await download.saveAs(path);
		expect(readFileContent(path)).toStrictEqual(
			readFileContent(join(__dirname, 'test_data/test_data_17.txt')),
		);
	});
});
