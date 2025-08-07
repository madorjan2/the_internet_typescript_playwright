import { test as base } from '@playwright/test';

type CustomFixtures = {
    testPath: string;
}

export const test = base.extend<CustomFixtures>({
    testPath: ['', {option: true}],

    page: async ({ page, testPath }, use) => {
        await page.goto('/' + testPath || '/');
        await use(page);
    }
})

export { expect, Page } from '@playwright/test';