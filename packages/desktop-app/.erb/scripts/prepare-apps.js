/* eslint-disable @typescript-eslint/no-var-requires */
const { existsSync, mkdirSync, unlinkSync, rmSync } = require('fs');
const fs = require('fs-extra');
const path = require('path');
const { zip } = require('zip-a-folder');

const appBuildFolder = path.resolve(__dirname, '../../release/build');
const packagesPath = path.resolve(__dirname, '../../../');

const appDarwin64 = path.resolve(appBuildFolder, 'mac');
const appDarwin64Package = path.resolve(packagesPath, 'darwin-x64/app');
const appDarwin64Zip = path.resolve(appDarwin64Package, 'app.zip');

const appDarwinArm64 = path.resolve(appBuildFolder, 'mac-arm64');
const appDarwinArm64Package = path.resolve(packagesPath, 'darwin-arm64/app');
const appDarwinArm64Zip = path.resolve(appDarwinArm64Package, 'app.zip');

const cliPackage = path.resolve(packagesPath, 'cli/README.md');
const readme = path.resolve(__dirname, '../../../../README.md');

if (existsSync(cliPackage)) {
	unlinkSync(cliPackage);
}
fs.copy(readme, cliPackage).then(() => console.log('README copied!!'));

if (!existsSync(appDarwin64Package)) {
	mkdirSync(appDarwin64Package, { recursive: true });
}
if (existsSync(appDarwin64Package)) {
	rmSync(appDarwin64Package, { recursive: true });
	mkdirSync(appDarwin64Package);
}
zip(appDarwin64, appDarwin64Zip).then(() => console.log('Compressed app'));

if (!existsSync(appDarwinArm64Package)) {
	mkdirSync(appDarwinArm64Package, { recursive: true });
}
if (existsSync(appDarwinArm64Package)) {
	rmSync(appDarwinArm64Package, { recursive: true });
	mkdirSync(appDarwinArm64Package);
}
zip(appDarwinArm64, appDarwinArm64Zip).then(() =>
	console.log('Compressed app')
);
