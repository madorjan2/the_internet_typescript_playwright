import { test, expect, Dialog } from './fixtures/baseTest';

test.describe('Javascript alerts', () => {
	test.use({ testPath: 'javascript_alerts' });

	const acceptDialog = async (dialog: Dialog, text = ''): Promise<void> => {
		if (dialog.type() === 'prompt') {
			await dialog.accept(text);
		} else {
			await dialog.accept();
		}
	};

	const dismissDialog = async (dialog: Dialog): Promise<void> => {
		await dialog.dismiss();
	};

	test('accepting simple alert', async ({ page }) => {
		page.on('dialog', acceptDialog);
		await page.getByRole('button', { name: 'Click for JS Alert' }).click();
		await expect(page.locator('#result')).toContainText(
			'You successfuly clicked an alert',
		);
	});

	test('accepting confirm alert', async ({ page }) => {
		page.on('dialog', acceptDialog);
		await page
			.getByRole('button', { name: 'Click for JS Confirm' })
			.click();
		await expect(page.locator('#result')).toContainText('You clicked: Ok');
	});

	test('dismissing confirm alert', async ({ page }) => {
		page.on('dialog', dismissDialog);
		await page
			.getByRole('button', { name: 'Click for JS Confirm' })
			.click();
		await expect(page.locator('#result')).toContainText(
			'You clicked: Cancel',
		);
	});

	test('accepting prompt alert with text', async ({ page }) => {
		const msg: string = 'You are indeed a JS prompt.';
		page.on('dialog', (dialog) => acceptDialog(dialog, msg));
		await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
		await expect(page.locator('#result')).toContainText(
			`You entered: ${msg}`,
		);
	});

	test('accepting prompt alert with empty text', async ({ page }) => {
		page.on('dialog', acceptDialog);
		await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
		await expect(page.locator('#result')).toContainText('You entered:');
	});

	test('dismissing prompt alert', async ({ page }) => {
		page.on('dialog', dismissDialog);
		await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
		await expect(page.locator('#result')).toContainText(
			'You entered: null',
		);
	});
});
