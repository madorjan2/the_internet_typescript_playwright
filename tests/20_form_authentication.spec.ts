import { test, expect, Page, Locator } from './fixtures/baseTest';

test.describe('Form Authentication', () => {
	test.use({ testPath: 'login' });

	const getLoginData = async (
		page: Page,
	): Promise<{ username: string; password: string }> => {
		const emps: Locator[] = await page.getByRole('emphasis').all();
		const username: string | null = await emps[0].textContent();
		const password: string | null = await emps[1].textContent();
		if (!username || !password) {
			throw new Error('Username or password not found on the page');
		}
		return { username, password };
	};

	const fillForm = async (
		page: Page,
		username?: string,
		password?: string,
	): Promise<void> => {
		if (!username || !password) {
			const loginData = await getLoginData(page);
			username = username || loginData.username;
			password = password || loginData.password;
		}
		await page.getByRole('textbox', { name: 'Username' }).fill(username);
		await page.getByRole('textbox', { name: 'Password' }).fill(password);
		await page.getByRole('button', { name: 'Login' }).click();
	};

	test('Login with correct credentials', async ({ page }) => {
		await fillForm(page);
		await expect(page.locator('#flash-messages')).toContainText(
			'You logged into a secure area!',
		);
	});

	test('Login with incorrect username', async ({ page }) => {
		await fillForm(page, 'wrong_username');
		await expect(page.locator('#flash-messages')).toContainText(
			'Your username is invalid!',
		);
	});

	test('Login with incorrect password', async ({ page }) => {
		await fillForm(page, undefined, 'wrong_password');
		await expect(page.locator('#flash-messages')).toContainText(
			'Your password is invalid!',
		);
	});
});
