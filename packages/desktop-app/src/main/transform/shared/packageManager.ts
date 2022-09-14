/* eslint-disable @typescript-eslint/no-var-requires */
import { existsSync, mkdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { exec } from 'child_process';

const homedir = require('os').homedir();

const cacheFolderName =
	process.env.NODE_ENV === 'test'
		? '.swc_viewer_cache_test'
		: '.swc_viewer_cache';

export const packageCacheFolder = join(homedir, cacheFolderName);
const modulesMemoryCache: { [key: string]: unknown } = {};

export type Package = {
	packageName: string;
	version: string;
};

export const getPackagePath = ({ packageName, version }: Package) =>
	join(packageCacheFolder, packageName, version);

export const installPackage = (pkg: Package) => {
	const { packageName, version } = pkg;
	const subPackageName = packageName.split('/').pop();
	const packagePath = getPackagePath(pkg);
	mkdirSync(packagePath, { recursive: true });

	console.log(
		`yarn add https://registry.npmjs.org/${packageName}/-/${subPackageName}-${version}.tgz`
	);

	return new Promise<void>((resolve, reject) => {
		exec(
			`yarn init --yes`,
			{
				cwd: packagePath,
			},
			(error) => {
				if (error) {
					reject(error);
					return;
				}
			}
		);
		exec(
			`yarn add https://registry.npmjs.org/${packageName}/-/${subPackageName}-${version}.tgz`,
			{
				cwd: packagePath,
			},
			(error) => {
				if (error) {
					reject(error);
					return;
				}
				resolve();
			}
		);
	});
};

export const getPackageEntryPath = (args: Package) => {
	const packageFolder = getPackagePath(args);
	const packageModule = resolve(
		packageFolder,
		`node_modules/${args.packageName}`
	);
	const pkgJsonPath = join(packageModule, 'package.json');
	const packageJson = readFileSync(pkgJsonPath, {
		encoding: 'utf-8',
	});
	const pkgJson = JSON.parse(packageJson);

	return join(packageModule, pkgJson.main);
};

const getPackageCacheKey = (pkg: Package) =>
	`${pkg.packageName}/${pkg.version}`;

export const isPackageDownloaded = (pkg: Package) =>
	existsSync(join(getPackagePath(pkg), 'node_modules'));

const importModule = async <T>(pkg: Package) => {
	const entryPath = getPackageEntryPath(pkg);
	const module: T = await import(entryPath);
	return module;
};

export const getModule = async <T>(pkg: Package) => {
	if (!isPackageDownloaded(pkg)) {
		await installPackage(pkg);
	}

	const packageKey = getPackageCacheKey(pkg);
	if (!modulesMemoryCache[packageKey]) {
		const module = importModule<T>(pkg);
		modulesMemoryCache[packageKey] = module;
		return module;
	}

	return modulesMemoryCache[packageKey] as T;
};
