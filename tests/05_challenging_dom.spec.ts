import {
	expect,
	test,
	Locator,
	Page,
	ElementHandle,
} from './fixtures/baseTest';
import { readFileSync } from 'fs';
import { join } from 'path';
import Tesseract from 'tesseract.js';

test.describe('Challenging DOM', () => {
	test.use({
		testPath: 'challenging_dom',
	});

	const readExpected = (): string[][] => {
		const path: string = join(__dirname, '/test_data/test_5.csv');
		const fileContent: string = readFileSync(path, { encoding: 'utf-8' });
		return fileContent
			.replace(/\r/g, '')
			.trim()
			.split('\n')
			.map((row) => row.split(','));
	};

	const readNumberFromDOM = async (page: Page): Promise<string> => {
		const scripts: Locator[] = await page.locator('script').all();
		for (const script of scripts) {
			const scriptContent: string = await script.evaluate(
				(element) => element.innerHTML,
			);
			if (scriptContent.includes('Answer: ')) {
				return scriptContent
					.split('Answer: ')[1]
					.split("'")[0]
					.replace(',', '');
			}
		}
		throw new Error('Number not found in scripts');
	};

	const recognizeNumber = async (image: string): Promise<string> => {
		const result = await Tesseract.recognize(image, 'eng');
		return result.data.text.split(': ')[1].trim();
	};

	test('Buttons should have random IDs', async ({ page }) => {
		const buttons: Locator[] = await page
			.locator('//a[contains(@class, "button")]')
			.all();
		for (const button of buttons) {
			const button_id: string | null = await button.getAttribute('id');
			await button.click();
			expect(button.getAttribute('id')).not.toBe(button_id);
		}
	});

	test('Table should have correct data', async ({ page }) => {
		let tableData: string[][] = [];
		const rows: Locator[] = await page.getByRole('row').all();
		for (const row of rows) {
			const cells: Locator[] = await row.locator('td, th').all();
			const cellData: string[] = [];
			for (const cell of cells) {
				const cellContent: string | null = await cell.textContent();
				const cellContentTrimmed: string | undefined =
					cellContent?.replace(/\s+/g, '');
				cellData.push(cellContentTrimmed || '');
			}
			tableData.push(cellData);
		}
		expect(tableData).toStrictEqual(readExpected());
	});

	test('Image displays correct number', async ({ page }) => {
		const canvas: ElementHandle<SVGElement | HTMLElement> | null =
			await page.locator('//canvas').elementHandle();
		const imgBase64: string = await page.evaluate((canvas) => {
			// @ts-ignore
			return canvas.toDataURL('image/png');
		}, canvas);
		const numberFromImage: string = await recognizeNumber(imgBase64);
		expect(numberFromImage).toStrictEqual(await readNumberFromDOM(page));
	});
});
