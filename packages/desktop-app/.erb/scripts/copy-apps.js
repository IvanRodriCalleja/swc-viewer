/* eslint-disable @typescript-eslint/no-var-requires */
const { existsSync, mkdirSync, unlinkSync, rmSync } = require('fs');
const fs = require('fs-extra');
const path = require('path');

const appBuildFolder = path.resolve(__dirname, '../../release/build');
const packagesPath = path.resolve(__dirname, '../../../');

const appDarwin64 = path.resolve(appBuildFolder, 'mac');
const appDarwin64Package = path.resolve(packagesPath, 'darwin-x64/app');

const appDarwinArm64 = path.resolve(appBuildFolder, 'mac-arm64');
const appDarwinArm64Package = path.resolve(packagesPath, 'darwin-arm64/app');

const cliPackage = path.resolve(packagesPath, 'cli/README.md');
const readme = path.resolve(__dirname, '../../../../README.md');

if (existsSync(cliPackage)) {
	unlinkSync(cliPackage);
}
fs.copy(readme, cliPackage).then(() => console.log('README copied!!'));

if (existsSync(appDarwin64Package)) {
	rmSync(appDarwin64Package, { recursive: true });
	mkdirSync(appDarwin64Package);
}
fs.copy(appDarwin64, appDarwin64Package).then(() =>
	console.log('darwin-x64 version copied!!')
);

if (existsSync(appDarwinArm64Package)) {
	rmSync(appDarwinArm64Package, { recursive: true });
	mkdirSync(appDarwinArm64Package);
}
fs.copy(appDarwinArm64, appDarwinArm64Package).then(() =>
	console.log('darwin-arm64 version copied!!')
);
