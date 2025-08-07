import { test, expect } from './fixtures/baseTest';

test.describe('Smoke test', () => {
    test('Title should be correct', async ({ page }) => {
        await expect(page.getByRole('heading', {name: "Welcome to the-internet"})).toBeVisible();
    })

    test('Item list should have 44 elements', async ({ page }) => {
        await expect(page.getByRole('listitem')).toHaveCount(44)
    })


})