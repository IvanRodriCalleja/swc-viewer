/* eslint-disable @typescript-eslint/no-var-requires */
import {
	existsSync,
	mkdirSync,
	readFileSync,
	renameSync,
	writeFileSync,
} from 'fs';
import { join } from 'path';
import tar from 'tar';
import fetch from 'node-fetch';

type DownloadPackageArgs = {
	packageName: string;
	version: string;
};

const homedir = require('os').homedir();

export const packageCacheFolder = join(homedir, '.swc_viewer_cache');

export const downloadPackage = async ({
	packageName,
	version,
}: DownloadPackageArgs) => {
	const subPackageName = packageName.split('/').pop();

	const buffer = await fetch(
		`https://registry.npmjs.org/${packageName}/-/${subPackageName}-${version}.tgz`
	).then((res) => res.arrayBuffer());

	const packageOutputFolder = join(packageCacheFolder, packageName);
	const packageTgzOutput = join(packageOutputFolder, `${version}.tgz`);

	if (!existsSync(packageOutputFolder)) {
		mkdirSync(packageOutputFolder, { recursive: true });
	}

	writeFileSync(packageTgzOutput, Buffer.from(buffer));

	await tar.x({
		file: packageTgzOutput,
		cwd: packageOutputFolder,
	});

	renameSync(
		join(packageOutputFolder, `package`),
		join(packageOutputFolder, version)
	);
};

export const isPackageDownloaded = ({
	packageName,
	version,
}: DownloadPackageArgs) =>
	existsSync(join(packageCacheFolder, packageName, version));

export const getPackagePath = ({ packageName, version }: DownloadPackageArgs) =>
	join(packageCacheFolder, packageName, version);

export const getPackageEntryPath = (args: DownloadPackageArgs) => {
	const packageFolder = getPackagePath(args);
	const pkgJsonPath = join(packageFolder, 'package.json');
	const packageJson = readFileSync(pkgJsonPath, {
		encoding: 'utf-8',
	});
	const pkgJson = JSON.parse(packageJson);

	return join(packageFolder, pkgJson.main);
};

export const loadPackage = async <T>(args: DownloadPackageArgs) => {
	const entryPath = getPackageEntryPath(args);

	const pkg: T = await import(entryPath);
	return pkg;
};
