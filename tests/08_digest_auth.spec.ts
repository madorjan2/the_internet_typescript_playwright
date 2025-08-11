// We are importing the Playwright test module instead of baseTest because implementing the entire digest auth logic would be too complex for this example.
// Idea from: https://medium.com/@thananjayan1988/web-authentication-with-playwright-basic-and-digest-explained-aab9ce78dc3e
import { test, expect } from '@playwright/test';
import { request, RequestOptions } from 'urllib';

test.describe('Digest Auth', () => {

	const options: RequestOptions ={
		digestAuth: 'admin:admin',
		method: 'GET'
	}

	test('Digest Authetication ', async({page}) =>{

		await page.route('**/digest_auth', async(route, req)=>{
			const { res, data }= await request(req.url(), options);
			const headers:any ={
				... res.headers
			}
			await route.fulfill({
				status: res.statusCode,
				headers: headers,
				contentType: res.headers['content-type'],
				body: data
			});
		})

		await page.goto('/digest_auth');
		await expect(page.getByRole('heading', { name: 'Digest Auth'})).toBeVisible()
	})
});
