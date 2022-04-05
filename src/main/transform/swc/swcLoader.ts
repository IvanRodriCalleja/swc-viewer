import fetch from 'node-fetch';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { SwcModule } from '../../../models/SwcModule';
import {
	downloadPackage,
	isPackageDownloaded,
	loadPackage,
	packageCacheFolder,
} from '../shared/packageManager';

const binaryBinding = {
	android: {
		arm64: 'swc.android-arm64.node',
		arm: 'swc.android-arm-eabi.node',
	},
	win32: {
		x64: 'swc.win32-x64-msvc.node',
		ia32: 'swc.win32-ia32-msvc.node',
		arm64: 'swc.win32-arm64-msvc.node',
	},
	darwin: {
		x64: 'swc.darwin-x64.node',
		arm64: 'swc.darwin-arm64.node',
	},
	linux: {
		x64: {
			isMusl: 'swc.linux-x64-musl.node',
			notMusl: 'swc.linux-x64-gnu.node',
		},
		arm64: {
			isMusl: 'swc.linux-arm64-musl.node',
			notMusl: 'swc.linux-arm64-gnu.node',
		},
		arm: 'swc.linux-arm-gnueabihf.node',
	},
};

const isMusl = () => {
	// For Node 10
	if (!process.report || typeof process.report.getReport !== 'function') {
		try {
			return readFileSync('/usr/bin/ldd', 'utf8').includes('musl');
		} catch (e) {
			return true;
		}
	} else {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const { glibcVersionRuntime } = process.report.getReport().header;
		return !glibcVersionRuntime;
	}
};

const swcPackageName = '@swc/core';

const downloadSwc = async (version: string) => {
	await downloadPackage({ packageName: swcPackageName, version });

	// TODO: Add to packageManager when moore binaties need to be loaded
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	let binaryToLoad = binaryBinding[process.platform][process.arch] as string;
	if (typeof binaryToLoad === 'object') {
		binaryToLoad = binaryToLoad[isMusl() ? 'isMusl' : 'notMusl'];
	}

	if (!binaryToLoad) {
		throw Error('Platform not supported by SWC');
	}

	const packageName = binaryToLoad.split('.')[1];

	const binary = await fetch(
		`https://unpkg.com/@swc/core-${packageName}@${version}/${binaryToLoad}`
	)
		.then((response) => response.arrayBuffer())
		.then((x) => Buffer.from(x));

	writeFileSync(
		join(packageCacheFolder, swcPackageName, version, binaryToLoad),
		binary
	);
};

const swcMemoryCache: { [version: string]: SwcModule } = {};

const loadSwc = async (version: string) => {
	if (!isPackageDownloaded({ packageName: swcPackageName, version })) {
		await downloadSwc(version);
	}

	// TODO: Add check for binary to load
	const swc = await loadPackage<SwcModule>({
		packageName: swcPackageName,
		version,
	});
	swcMemoryCache[version] = swc;
};

export const getSwc = async (version: string) => {
	if (!swcMemoryCache[version]) {
		await loadSwc(version);
	}

	return swcMemoryCache[version];
};
