import { test, expect } from './fixtures/baseTest';

test.describe('Context Menus', () => {
    test.use({testPath: 'context_menu'});

    test('Right click on the box', async ({ page }) => {

        let alertText: string = '';

        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            alertText = dialog.message();
            await dialog.accept();
            return alertText;
        });

        await page.locator('#hot-spot').click({button: 'right'});
        expect(alertText).toBe('You selected a context menu');
    })


});