import { existsSync, mkdirSync, rmSync } from 'fs';
import { SwcModule } from 'models/SwcModule';
import {
	getModule,
	getPackageEntryPath,
	getPackagePath,
	installPackage,
	isPackageDownloaded,
	Package,
	packageCacheFolder,
} from './packageManager';

import * as packageManagerModule from './packageManager';

const removeSwcViewerCacheFolder = () => {
	if (existsSync(packageCacheFolder)) {
		rmSync(packageCacheFolder, { recursive: true, force: true });
	}
};

const fakePackageInstallation = (pkg: Package) => {
	const packagePath = getPackagePath(pkg);
	mkdirSync(packagePath, { recursive: true });
};

describe('PackageManager', () => {
	beforeAll(() => {
		removeSwcViewerCacheFolder();
		jest.setTimeout(10000);
	});

	describe('installPackage', () => {
		it('Should install package', async () => {
			const pkg: Package = {
				packageName: '@babel/core',
				version: '7.17.9',
			};

			await installPackage(pkg);
			const entryPath = getPackageEntryPath(pkg);
			const existEntryPath = existsSync(entryPath);
			expect(existEntryPath).toBe(true);
		});

		it('Should not fail if package is already installed', async () => {
			const pkg: Package = {
				packageName: '@babel/core',
				version: '7.17.9',
			};

			await installPackage(pkg);
			await installPackage(pkg);
			const entryPath = getPackageEntryPath(pkg);
			const existEntryPath = existsSync(entryPath);
			expect(existEntryPath).toBe(true);
		});

		it('Should install package with binaries', async () => {
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.161',
			};

			await installPackage(pkg);
			const entryPath = getPackageEntryPath(pkg);
			const existEntryPath = existsSync(entryPath);
			expect(existEntryPath).toBe(true);
		});
	});

	describe('isPackageDownloaded', () => {
		it("Should return false when package hasn't been downloaded", () => {
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.160',
			};

			const isDownloaded = isPackageDownloaded(pkg);
			expect(isDownloaded).toBe(false);
		});

		it('Should return false when package installation has failed', () => {
			// This case can happens if npm installation fails but folders have been created for installation
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.159',
			};
			fakePackageInstallation(pkg);

			const isDownloaded = isPackageDownloaded(pkg);
			expect(isDownloaded).toBe(false);
		});

		it('Should return true when package has been installed successfully', async () => {
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.158',
			};
			await installPackage(pkg);

			const isDownloaded = isPackageDownloaded(pkg);
			expect(isDownloaded).toBe(true);
		});
	});

	describe('getPackageEntryPath', () => {
		it('Should return entry path of installed package', async () => {
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.157',
			};
			await installPackage(pkg);
			const entryPath = getPackageEntryPath(pkg);

			expect(entryPath).toContain(
				'@swc/core/1.2.157/node_modules/@swc/core/index.js'
			);
		});
	});

	describe('getModule', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('Should install package and return the module', async () => {
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.156',
			};

			const installPackageSpy = jest.spyOn(
				packageManagerModule,
				'installPackage'
			);

			const isDownloadedBeforeLoad = isPackageDownloaded(pkg);
			expect(isDownloadedBeforeLoad).toBe(false);
			const module = await getModule<SwcModule>(pkg);

			expect(module).not.toBeNull();
			expect(module.version).toBe('1.2.156');
			expect(installPackageSpy).toHaveBeenCalled();

			const isDownloadedAfterLoad = isPackageDownloaded(pkg);
			expect(isDownloadedAfterLoad).toBe(true);
		});

		it('Should return the module without installing when package is already installed', async () => {
			const pkg: Package = {
				packageName: '@swc/core',
				version: '1.2.155',
			};

			await installPackage(pkg);
			jest.clearAllMocks();
			const installPackageSpy = jest.spyOn(
				packageManagerModule,
				'installPackage'
			);

			const module = await getModule<SwcModule>(pkg);

			expect(module).not.toBeNull();
			expect(module.version).toBe('1.2.155');
			expect(installPackageSpy).not.toHaveBeenCalled();
		});
	});
});
