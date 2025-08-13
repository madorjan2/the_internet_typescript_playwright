import { test, expect, Page } from './fixtures/baseTest';

test.describe('Add or remove element', () => {
	test.use({ testPath: 'add_remove_elements/' });

	async function addElement(page: Page): Promise<void> {
		await page.getByRole('button', { name: 'Add Element' }).click();
	}

	async function clickFirstDeleteButton(page: Page): Promise<void> {
		await page.getByRole('button', { name: 'Delete' }).first().click();
	}

	test('Add element', async ({ page }) => {
		await addElement(page);
		await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(
			1,
		);
		await addElement(page);
		await addElement(page);
		await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(
			3,
		);
	});

	test('Remove element', async ({ page }) => {
		await addElement(page);
		await addElement(page);
		await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(
			2,
		);

		await clickFirstDeleteButton(page);
		await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(
			1,
		);

		await clickFirstDeleteButton(page);
		await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(
			0,
		);
	});
});
