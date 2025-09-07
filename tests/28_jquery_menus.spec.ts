import { test, expect, Locator, Page, Download } from './fixtures/baseTest';
import { join } from 'path';
import { existsSync } from 'node:fs';

test.describe('JQuery menus', () => {
	test.use({ testPath: 'jqueryui/menu' });

	type MenuElement = {
		fileName: string;
		elementID: string;
	};

	const menuOptions: MenuElement[] = [
		{ fileName: 'menu.pdf', elementID: 'ui-id-6' },
		{ fileName: 'menu.csv', elementID: 'ui-id-7' },
		{ fileName: 'menu.xls', elementID: 'ui-id-8' },
	];

	const clickJQueryElementByID = async (
		page: Page,
		elementId: string,
	): Promise<void> => {
		await page.evaluate((id) => {
			const el = document.getElementById(id);
			if (el) el.click();
		}, elementId);
	};

	test('first button is disabled', async ({ page }) => {
		const button: Locator = page
			.getByRole('menuitem', { name: 'Disabled' })
			.locator('..');
		await expect(button).toContainClass('ui-state-disabled');
	});

	menuOptions.forEach(async (option: MenuElement): Promise<void> => {
		test(`downloading ${option.fileName}`, async ({ page }) => {
			const downloadPromise: Promise<Download> =
				page.waitForEvent('download');
			await clickJQueryElementByID(page, 'ui-id-2');
			await clickJQueryElementByID(page, 'ui-id-4');
			await clickJQueryElementByID(page, option.elementID);
			const download: Download = await downloadPromise;
			const path: string = join(__dirname, download.suggestedFilename());
			await download.saveAs(path);
			expect(existsSync(path)).toBe(true);
		});
	});
});
