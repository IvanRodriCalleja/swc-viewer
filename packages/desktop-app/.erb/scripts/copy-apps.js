/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');

const appBuildFolder = path.resolve(__dirname, '../../release/build');
const packagesPath = path.resolve(__dirname, '../../../');

const appDarwin64 = path.resolve(appBuildFolder, 'mac');
const appDarwin64Package = path.resolve(packagesPath, 'darwin-x64/app');

const appDarwinArm64 = path.resolve(appBuildFolder, 'mac-arm64');
const appDarwinArm64Package = path.resolve(packagesPath, 'darwin-arm64/app');

fs.copy(appDarwin64, appDarwin64Package).then(() =>
	console.log('darwin-x64 version copied!!')
);

fs.copy(appDarwinArm64, appDarwinArm64Package).then(() =>
	console.log('darwin-arm64 version copied!!')
);
