/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');

const appPaths = {
	darwin: {
		x64: '@swc/viewer-darwin-x64',
		arm64: '@swc/viewer-darwin-arm64',
	},
};

const appPackage = appPaths[process.platform][process.arch];
const { appExecutable } = require(appPackage);

exec(`open -n "${appExecutable}"`);
