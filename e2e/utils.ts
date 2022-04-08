import { Page, _electron as electron } from 'playwright';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const executablePath = resolve(
	__dirname,
	'../packages/desktop-app/release/build/mac/swc-viewer.app/Contents/MacOS/swc-viewer'
);

const mainPath = resolve(
	__dirname,
	'../packages/desktop-app/release/build/mac/swc-viewer.app/Contents/Resources/app.asar/dist/main/main.js'
);

export const launchSwcViewer = async () => {
	const electronApp = await electron.launch({
		args: [mainPath],
		executablePath,
	});

	electronApp.on('window', async (page) => {
		const filename = page.url()?.split('/').pop();
		console.log(`Window opened: ${filename}`);

		// capture errors
		page.on('pageerror', (error) => {
			console.error(error);
		});
		// capture console messages
		page.on('console', (msg) => {
			console.log(msg.text());
		});
	});

	return electronApp;
};

export const uploadFile = async (filePath: string, page: Page) => {
	const fileName = filePath.split('/').pop();
	const buffer = readFileSync(filePath);
	const [fileChooser] = await Promise.all([
		// It is important to call waitForEvent before click to set up waiting.
		page.waitForEvent('filechooser'),
		// Opens the file chooser.
		page
			.locator('[data-testid="file-uploader"] input[data-testid="upload-file"]')
			.click(),
	]);
	return await fileChooser.setFiles({
		name: fileName,
		buffer,
		mimeType: 'application/pdf',
	});
};
