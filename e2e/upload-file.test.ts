import { ElectronApplication, Page } from 'playwright';
import { test, expect } from '@playwright/test';
import { launchSwcViewer, uploadFile } from './utils';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
	electronApp = await launchSwcViewer();
});

test.afterAll(async () => {
	await electronApp.close();
});

const allowedFiles = ['.js', '.jsx', '.ts', '.tsx'];

test.describe('Check tabs behavior', () => {
	test.beforeAll(async () => {
		page = await electronApp.firstWindow();
		await page.waitForSelector('[data-testid="active-panel-tab"]');
	});

	test.beforeEach(async () => {
		await page.reload();
		await page.waitForSelector('[data-testid="active-panel-tab"]');
	});

	allowedFiles.forEach((fileExtension) => {
		test(`Should allow upload ${fileExtension} file`, async () => {
			await uploadFile(`./files/basic${fileExtension}`, page);

			await page.waitForSelector('[data-testid="swc-transform"] textarea');
			const swcOutput = await page.inputValue(
				'[data-testid="swc-transform"] textarea'
			);
			expect(swcOutput).toBe('export const myFunction = ()=>null\n;\n');

			await page.waitForSelector('[data-testid="babel-transform"] textarea');
			const babelOutput = await page.inputValue(
				'[data-testid="babel-transform"] textarea'
			);
			expect(babelOutput).toBe('export const myFunction = () => null;');
		});
	});

	test(`Should not allow upload file with extension different from ${allowedFiles.join(
		' '
	)}`, async () => {
		await uploadFile(`./files/basic.txt`, page);
		const toastErrorTitle = await (await page.$('#toast-1-title')).innerText();
		expect(toastErrorTitle).toBe('Unsupported file type');
		await expect(page.locator('[data-testid="file-uploader"]')).toHaveCount(1);
	});

	test('Should change tab title by the uploaded file', async () => {
		await uploadFile(`./files/basic.tsx`, page);
		const tabZero = await page.$('[data-testid^="tab-0"] p');
		const tabZeroTitle = await tabZero.innerText();
		expect(tabZeroTitle).toBe('basic.tsx');
	});
});
