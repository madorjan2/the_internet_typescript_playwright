import { test as base } from '@playwright/test';

type CustomFixtures = {
    testPath: string;
    headers?: Record<string, string>;
}

export const test = base.extend<CustomFixtures>({
    testPath: ['', {option: true}],
    headers: [undefined, {option: true}],

    page: async ({ page, testPath, headers }, use) => {
        if (headers) {
            await page.route('**/*', async route => {
                const newHeaders = {
                    ...route.request().headers(),
                    ...headers
                };
                await route.continue({ headers: newHeaders });
            });
        }
        await page.goto('/' + testPath || '/');
        await use(page);
    }
})

export { expect, Page, Locator } from '@playwright/test';