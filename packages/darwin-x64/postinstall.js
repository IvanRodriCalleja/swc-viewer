/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { existsSync, rmSync } = require('fs');
const decompress = require('decompress');

const compressedApp = path.resolve(__dirname, 'app/app.zip');
const appOutput = path.resolve(__dirname, 'app/swc-viewer.app');

if (existsSync(appOutput)) {
	rmSync(appOutput, { recursive: true });
}

if (existsSync(compressedApp)) {
	decompress(compressedApp, path.resolve(__dirname, 'app')).then(() => {
		console.log('App unziped');
	});
}
