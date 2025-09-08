import { test, expect } from './fixtures/baseTest';

test.describe('Key presses', () => {
	test.use({ testPath: 'key_presses' });

	const PLAYWRIGHT_KEYS = {
		Alt: 'ALT',
		AltLeft: 'ALT',
		AltRight: 'ALT',
		ArrowDown: 'DOWN',
		ArrowLeft: 'LEFT',
		ArrowRight: 'RIGHT',
		ArrowUp: 'UP',
		Backspace: 'BACK_SPACE',
		CapsLock: 'CAPS_LOCK',
		Control: 'CONTROL',
		ControlLeft: 'CONTROL',
		ControlRight: 'CONTROL',
		Delete: 'DELETE',
		End: 'END',
		Escape: 'ESCAPE',
		F1: 'F1',
		F2: 'F2',
		F3: 'F3',
		F4: 'F4',
		F5: 'F5',
		F6: 'F6',
		F7: 'F7',
		F8: 'F8',
		F9: 'F9',
		F10: 'F10',
		F11: 'F11',
		F12: 'F12',
		Home: 'HOME',
		Insert: 'INSERT',
		PageDown: 'PAGE_DOWN',
		PageUp: 'PAGE_UP',
		Pause: 'PAUSE',
		Shift: 'SHIFT',
		ShiftLeft: 'SHIFT',
		ShiftRight: 'SHIFT',
		Tab: 'TAB',
		NumLock: 'NUM_LOCK',
		Numpad0: 'INSERT',
		Numpad1: 'END',
		Numpad2: 'DOWN',
		Numpad3: 'PAGE_DOWN',
		Numpad4: 'LEFT',
		Numpad5: 'CLEAR',
		Numpad6: 'RIGHT',
		Numpad7: 'HOME',
		Numpad8: 'UP',
		Numpad9: 'PAGE_UP',
		NumpadAdd: 'ADD',
		NumpadDecimal: 'DELETE',
		NumpadDivide: 'DIVIDE',
		NumpadMultiply: 'MULTIPLY',
		NumpadSubtract: 'SUBTRACT',
		ScrollLock: 'SCROLL_LOCK',
		PrintScreen: 'PRINTSCREEN',
		ContextMenu: 'CONTEXT_MENU',
		Space: 'SPACE',
		KeyA: 'A',
		KeyB: 'B',
		KeyC: 'C',
		KeyD: 'D',
		KeyE: 'E',
		KeyF: 'F',
		KeyG: 'G',
		KeyH: 'H',
		KeyI: 'I',
		KeyJ: 'J',
		KeyK: 'K',
		KeyL: 'L',
		KeyM: 'M',
		KeyN: 'N',
		KeyO: 'O',
		KeyP: 'P',
		KeyQ: 'Q',
		KeyR: 'R',
		KeyS: 'S',
		KeyT: 'T',
		KeyU: 'U',
		KeyV: 'V',
		KeyW: 'W',
		KeyX: 'X',
		KeyY: 'Y',
		KeyZ: 'Z',
		Digit0: '0',
		Digit1: '1',
		Digit2: '2',
		Digit3: '3',
		Digit4: '4',
		Digit5: '5',
		Digit6: '6',
		Digit7: '7',
		Digit8: '8',
		Digit9: '9',
		BracketLeft: 'OPEN_BRACKET',
		BracketRight: 'CLOSE_BRACKET',
		Backslash: 'BACK_SLASH',
		Quote: 'QUOTE',
		Backquote: 'BACK_QUOTE',
		Comma: 'COMMA',
		Period: 'PERIOD',
		Slash: 'SLASH',
	};

	const getResult = async (page: Page): Promise<string> => {
		const resultText = await page.locator('#result').textContent();
		if (!resultText) {
			throw new Error('Result text is empty');
		}
		return resultText.slice(13);
	};

	test('key presses', async ({ page }) => {
		for (const key in PLAYWRIGHT_KEYS) {
			await page.keyboard.press(key);
			const result = await getResult(page);
			expect(result).toStrictEqual(PLAYWRIGHT_KEYS[key]);
		}
	});
});
