import { test, expect, Page, Locator } from './fixtures/baseTest';

test.describe('Checkboxes', () => {
	test.use({ testPath: 'checkboxes' });

	// I am going to create a new class for the checkboxes, it is entirely unnecessary, but I want to practice classes.
	class Checkbox {
		private locator: Locator;
		private checked: boolean;

		constructor(locator: Locator, checked: boolean = false) {
			this.locator = locator;
			this.checked = checked;
		}

		isChecked(): boolean {
			return this.checked;
		}

		async checkIfChecked(): Promise<boolean> {
			return this.locator.isChecked();
		}

		async toggle(): Promise<void> {
			await this.locator.click();
			this.checked = !this.checked;
		}

		async check(): Promise<void> {
			if (!this.checked) {
				await this.toggle();
			}
		}

		async uncheck(): Promise<void> {
			if (this.checked) {
				await this.toggle();
			}
		}
	}

	async function getCheckbox(page: Page, index: number) {
		const checkboxLocator = page.getByRole('checkbox').nth(index);
		return new Checkbox(checkboxLocator, await checkboxLocator.isChecked());
	}

	test('Checkbox 1 is unchecked by default', async ({ page }) => {
		const cb1 = await getCheckbox(page, 0);
		expect(await cb1.checkIfChecked()).toBe(false);
	});

	test('Checkbox 2 is checked by default', async ({ page }) => {
		const cb2 = await getCheckbox(page, 1);
		expect(await cb2.checkIfChecked()).toBe(true);
	});

	test('Toggle checkbox 1', async ({ page }) => {
		const cb1 = await getCheckbox(page, 0);
		expect(await cb1.checkIfChecked()).toBe(cb1.isChecked());
		await cb1.toggle();
		expect(await cb1.checkIfChecked()).toBe(cb1.isChecked());
		await cb1.toggle();
		expect(await cb1.checkIfChecked()).toBe(cb1.isChecked());
	});

	test('Toggle checkbox 2', async ({ page }) => {
		const cb2 = await getCheckbox(page, 1);
		expect(await cb2.checkIfChecked()).toBe(cb2.isChecked());
		await cb2.toggle();
		expect(await cb2.checkIfChecked()).toBe(cb2.isChecked());
		await cb2.toggle();
		expect(await cb2.checkIfChecked()).toBe(cb2.isChecked());
	});
});
