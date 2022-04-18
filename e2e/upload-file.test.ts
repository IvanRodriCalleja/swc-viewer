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

	test(`Should transform typescript file with types`, async () => {
		await uploadFile(`./files/typed.ts`, page);
		await page.waitForSelector('[data-testid="swc-transform"] textarea');
		const swcOutput = await page.inputValue(
			'[data-testid="swc-transform"] textarea'
		);
		expect(swcOutput).toBe('export const myFunction = (args)=>args\n;\n');

		await page.waitForSelector('[data-testid="babel-transform"] textarea');
		const babelOutput = await page.inputValue(
			'[data-testid="babel-transform"] textarea'
		);
		expect(babelOutput).toBe('export const myFunction = args => args;');
	});

	test('Should change tab title by the uploaded file', async () => {
		await uploadFile(`./files/basic.tsx`, page);
		const tabZero = await page.$('[data-testid^="tab-0"] p');
		const tabZeroTitle = await tabZero.innerText();
		expect(tabZeroTitle).toBe('basic.tsx');
	});

	test('Should set specific swc and babel config when is typescript file', async () => {
		await uploadFile(`./files/basic.tsx`, page);
		const swcConfigButton = await page.$(
			'[data-testid="swc-transform"] button[data-testid="open-config"]'
		);
		await swcConfigButton.click();
		await page.waitForSelector('[data-testid="config-editor"] textarea');
		const swcConfig = await page.inputValue(
			'[data-testid="config-editor"] textarea'
		);

		const closeModalButton = await page.$('button[aria-label="Close"]');
		await closeModalButton.click();

		const babelConfigButton = await page.$(
			'[data-testid="babel-transform"] button[data-testid="open-config"]'
		);
		await babelConfigButton.click();
		await page.waitForSelector('[data-testid="config-editor"] textarea');
		const babelConfig = await page.inputValue(
			'[data-testid="config-editor"] textarea'
		);

		expect(swcConfig).toBe(
			JSON.stringify(
				{
					sourceMaps: false,
					jsc: {
						parser: {
							syntax: 'typescript',
							tsx: true,
						},
						target: 'es2022',
					},
				},
				null,
				2
			)
		);

		expect(babelConfig).toBe(
			JSON.stringify(
				{
					babelrc: false,
					configFile: false,
					ast: false,
					presets: ['@babel/preset-react', '@babel/preset-typescript'],
					filename: 'basic.tsx',
				},
				null,
				2
			)
		);
	});

	test('Should set specific swc and babel config when is javascript file', async () => {
		await uploadFile(`./files/basic.jsx`, page);
		const swcConfigButton = await page.$(
			'[data-testid="swc-transform"] button[data-testid="open-config"]'
		);
		await swcConfigButton.click();
		await page.waitForSelector('[data-testid="config-editor"] textarea');
		const swcConfig = await page.inputValue(
			'[data-testid="config-editor"] textarea'
		);

		const closeModalButton = await page.$('button[aria-label="Close"]');
		await closeModalButton.click();

		const babelConfigButton = await page.$(
			'[data-testid="babel-transform"] button[data-testid="open-config"]'
		);
		await babelConfigButton.click();
		await page.waitForSelector('[data-testid="config-editor"] textarea');
		const babelConfig = await page.inputValue(
			'[data-testid="config-editor"] textarea'
		);

		expect(swcConfig).toBe(
			JSON.stringify(
				{
					sourceMaps: false,
					jsc: {
						parser: {
							syntax: 'ecmascript',
							jsx: true,
						},
						target: 'es2022',
					},
				},
				null,
				2
			)
		);

		expect(babelConfig).toBe(
			JSON.stringify(
				{
					babelrc: false,
					configFile: false,
					ast: false,
					presets: ['@babel/preset-react'],
				},
				null,
				2
			)
		);
	});
});
