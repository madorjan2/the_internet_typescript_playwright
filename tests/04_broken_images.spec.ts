import { test, expect } from './fixtures/baseTest';

test.describe('Broken Images', () => {
    test.use({
        testPath: 'broken_images',
    });

    const testCases: {index: number, expected: boolean}[] = [
        { index: 1, expected: true},
        { index: 2, expected: true},
        { index: 3, expected: false},
    ]

    testCases.forEach(({index, expected}) => {
        test(`image ${index} should ${expected ? '' : 'not '}be broken`, async ({ page }) => {
            const xpath_selector: string = `//div[@id="content"]//img[${index}]`;
            const is_broken: boolean = await page.evaluate(
                (selector: string) :boolean => {
                    const img = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    // @ts-ignore
                    return img ? img.naturalWidth === 0 : true;
                },
                xpath_selector
            )
            expect(is_broken).toEqual(expected);
        })
    })
});