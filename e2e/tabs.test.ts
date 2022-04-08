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

test.describe('Check tabs behavior', () => {
	test.beforeAll(async () => {
		page = await electronApp.firstWindow();
		await page.waitForSelector('[data-testid="tabs"]');
	});

	test.beforeEach(async () => {
		await page.reload();
		await page.waitForSelector('[data-testid="tabs"]');
	});
	test('Should not allow remove tab when only 1 exist', async () => {
		const tabs = await page.$$('[data-testid^="tab-"]');
		expect(tabs.length).toBe(1);

		const tab = await page.$(
			'[data-testid="tab-0"] [data-testid=close-button-tab]'
		);
		expect(tab).toBe(null);
	});

	test('Should allow remove any tab when more than 1 exist', async () => {
		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		const tabs = await page.$$('[data-testid^="tab-"]');
		expect(tabs.length).toBe(2);

		const closeTabs = await page.$$('[data-testid=close-button-tab]');
		expect(closeTabs.length).toBe(2);
	});

	test('Should allow add tabs', async () => {
		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-1"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-2"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-3"]');

		const tabs = await page.$$('[data-testid^="tab-"]');
		expect(tabs.length).toBe(4);
	});

	test('Should allow remove tabs', async () => {
		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-1"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-2"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-3"]');

		const tabs = await page.$$('[data-testid^="tab-"]');
		expect(tabs.length).toBe(4);

		const closeTabOne = await page.$(
			'[data-testid^="tab-1"] [data-testid=close-button-tab]'
		);
		await closeTabOne.click();

		const closeTabZero = await page.$(
			'[data-testid^="tab-0"] [data-testid=close-button-tab]'
		);
		await closeTabZero.click();

		const tabsAfter = await page.$$('[data-testid^="tab-"]');
		expect(tabsAfter.length).toBe(2);
	});

	test('Should create tabs with undefined title', async () => {
		const tabZero = await page.$('[data-testid^="tab-0"] p');
		const tabZeroTitle = await tabZero.innerText();
		expect(tabZeroTitle).toBe('Untitled-0');

		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();

		const tabOne = await page.$('[data-testid^="tab-1"] p');
		const tabOneTitle = await tabOne.innerText();
		expect(tabOneTitle).toBe('Untitled-1');
	});

	test('Should set new tab as active', async () => {
		const tabZeroActivated = await page.$(
			'[data-testid="tab-0"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabZeroActivated).not.toBe(null);

		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-1"]');
		const tabOneActivated = await page.$(
			'[data-testid="tab-1"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabOneActivated).not.toBe(null);

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-2"]');
		const tabTwoActivated = await page.$(
			'[data-testid="tab-2"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabTwoActivated).not.toBe(null);
	});

	test('Should set last tab as active if active tab is removed', async () => {
		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-1"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-2"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-3"]');

		const tabTwo = await page.locator('[data-testid^="tab-2"]');
		await tabTwo.click();
		const tabTwoActivated = await page.$(
			'[data-testid="tab-2"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabTwoActivated).not.toBe(null);

		const tabTwoCloseButton = await page.$(
			'[data-testid="tab-2"] [data-testid=close-button-tab]'
		);
		await tabTwoCloseButton.click();

		const tabThreeActivated = await page.$(
			'[data-testid="tab-3"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabThreeActivated).not.toBe(null);
	});

	test('Should change active tab', async () => {
		const tabZeroActivated = await page.locator(
			'[data-testid="tab-0"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabZeroActivated).toHaveCount(1);

		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-1"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-2"]');

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-3"]');

		const tabTwo = await page.locator('[data-testid^="tab-2"]');
		await tabTwo.click();

		const tabTwoActivated = await page.$(
			'[data-testid="tab-2"] [data-testid="activated-outer-left-border-radius"]'
		);
		expect(tabTwoActivated).not.toBe(null);
	});

	test('Should change panel of selected tab', async () => {
		const panelZeroTab = await page.$('#tab-panel-0');
		expect(panelZeroTab).not.toBe(null);

		const addButton = await page.$('[data-testid="add-button-tab"]');
		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-1"]');
		const panelOneTab = await page.$('#tab-panel-1');
		expect(panelOneTab).not.toBe(null);

		await addButton.click();
		await page.waitForSelector('[data-testid^="tab-2"]');
		const panelTwoTab = await page.$('#tab-panel-2');
		expect(panelTwoTab).not.toBe(null);

		const tabOne = await page.locator('[data-testid^="tab-1"]');
		await tabOne.click();
		await uploadFile('./files/basic.js', page);
		const panelOneActive = await page.$('#tab-panel-1');
		const panelOneTransformer = await page.$(
			'#tab-panel-1 [data-testid="transformer"]'
		);
		expect(panelOneActive).not.toBe(null);
		expect(panelOneTransformer).not.toBe(null);

		const tabZero = await page.locator('[data-testid^="tab-0"]');
		await tabZero.click();
		const panelZeroActive = await page.$('#tab-panel-0');
		const panelOneFileUploader = await page.$(
			'#tab-panel-0 [data-testid="file-uploader"]'
		);
		expect(panelOneFileUploader).not.toBe(null);
		expect(panelZeroActive).not.toBe(null);
	});
});
