import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import {
	getPackagePath,
	Package,
	packageCacheFolder,
} from '../shared/packageManager';
import {
	getPlugins,
	loadLocalPlugins,
	loadPluginPackage,
	SwcPlugin,
} from './swcPluginLoader';
import * as packageVersionCache from '../shared/packageVersioncache';
import * as packageManagerModule from '../shared/packageManager';
import * as swcPluginLoader from './swcPluginLoader';

const fakePluginFolder = resolve(packageCacheFolder, 'fake-plugin');
const fakePluginPath = resolve(fakePluginFolder, 'test-plugin.wasm');

const writeFakeLocalPlugin = () => {
	if (!existsSync(fakePluginPath)) {
		mkdirSync(fakePluginFolder);
		writeFileSync(fakePluginPath, '');
	}
};

const mockLocalPluginName = (name: number) => (Date.now = jest.fn(() => name));

const mockPackageVersion = (mockResult: string) => {
	jest
		.spyOn(packageVersionCache, 'getPackageLastVersion')
		.mockImplementation(() => Promise.resolve(mockResult));
};

const removePluginFolder = (pkg: Package) => {
	const packagePath = getPackagePath(pkg);
	if (existsSync(packagePath)) {
		rmSync(packagePath, { recursive: true, force: true });
	}
};

describe('swcPluginLoader', () => {
	beforeAll(() => {
		writeFakeLocalPlugin();
	});
	describe('loadLocalPlugins', () => {
		it('Should copy local plugin with timestamp name to avoid SWC plugin system caching', () => {
			mockLocalPluginName(1);
			const plugin: SwcPlugin = [fakePluginPath, {}];
			const loadedPlugin = loadLocalPlugins(plugin);
			const [pluginName, pluginConfig] = loadedPlugin;
			const isPluginCopied = existsSync(pluginName);

			expect(isPluginCopied).toBe(true);
			expect(pluginName).toContain(
				'.swc_viewer_cache_test/local-plugins/test-plugin/1.wasm'
			);
			expect(pluginConfig).toEqual({});
		});

		it('Should remove old plugin version when new load is needed', () => {
			const plugin: SwcPlugin = [fakePluginPath, {}];

			mockLocalPluginName(2);
			const loadedPlugin = loadLocalPlugins(plugin);
			const [pluginName] = loadedPlugin;
			const isPluginCopied = existsSync(pluginName);

			expect(isPluginCopied).toBe(true);
			expect(pluginName).toContain(
				'.swc_viewer_cache_test/local-plugins/test-plugin/2.wasm'
			);

			mockLocalPluginName(3);
			const reLoadedPlugin = loadLocalPlugins(plugin);
			const [reLoadedPluginName] = reLoadedPlugin;
			const isReLoadedPluginCopied = existsSync(reLoadedPluginName);
			const isOldPluginCopied = existsSync(pluginName);

			expect(isReLoadedPluginCopied).toBe(true);
			expect(isOldPluginCopied).toBe(false);
			expect(reLoadedPluginName).toContain(
				'.swc_viewer_cache_test/local-plugins/test-plugin/3.wasm'
			);
		});

		it('Should pass configuration', () => {
			const pluginConfig = {
				myConfig: true,
			};

			const plugin: SwcPlugin = [fakePluginPath, pluginConfig];

			mockLocalPluginName(4);
			const loadedPlugin = loadLocalPlugins(plugin);
			expect(loadedPlugin[1]).toEqual(pluginConfig);
		});
	});

	describe('loadPluginPackage', () => {
		beforeAll(() => {
			jest.resetAllMocks();
		});

		it('Should install plugin and return entrypoint', async () => {
			const version = '0.4.0';
			const packageName = '@swc/plugin-styled-components';
			const plugin: SwcPlugin = [packageName, {}];
			removePluginFolder({ packageName, version });
			mockPackageVersion(version);

			const [pluginName, pluginConfig] = await loadPluginPackage(plugin);
			const existEntryPluginPath = existsSync(pluginName);

			expect(existEntryPluginPath).toBe(true);
			expect(pluginName).toContain(
				'/.swc_viewer_cache_test/@swc/plugin-styled-components/0.4.0/node_modules/@swc/plugin-styled-components/swc_plugin_styled_components.wasm'
			);
			expect(pluginConfig).toEqual({});
		});

		it('Should only resolve entry path if plugin is already installed', async () => {
			const version = '0.4.0';
			const packageName = '@swc/plugin-styled-components';
			const plugin: SwcPlugin = [packageName, {}];
			removePluginFolder({ packageName, version });
			mockPackageVersion(version);
			await loadPluginPackage(plugin);

			jest.clearAllMocks();
			const installPackageSpy = jest.spyOn(
				packageManagerModule,
				'installPackage'
			);

			const [pluginName, pluginConfig] = await loadPluginPackage(plugin);
			const existEntryPluginPath = existsSync(pluginName);

			expect(installPackageSpy).not.toHaveBeenCalled();
			expect(existEntryPluginPath).toBe(true);
			expect(pluginName).toContain(
				'/.swc_viewer_cache_test/@swc/plugin-styled-components/0.4.0/node_modules/@swc/plugin-styled-components/swc_plugin_styled_components.wasm'
			);
			expect(pluginConfig).toEqual({});
		});

		it('Should pass the conofig option', async () => {
			const version = '0.4.0';
			const packageName = '@swc/plugin-styled-components';
			const plugin: SwcPlugin = [
				packageName,
				{
					myConfig: true,
				},
			];
			removePluginFolder({ packageName, version });
			mockPackageVersion(version);

			const [pluginName, pluginConfig] = await loadPluginPackage(plugin);
			const existEntryPluginPath = existsSync(pluginName);

			expect(existEntryPluginPath).toBe(true);
			expect(pluginName).toContain(
				'/.swc_viewer_cache_test/@swc/plugin-styled-components/0.4.0/node_modules/@swc/plugin-styled-components/swc_plugin_styled_components.wasm'
			);
			expect(pluginConfig).toEqual({ myConfig: true });
		});
	});

	describe('getPlugins', () => {
		beforeAll(() => {
			jest.resetAllMocks();
		});

		it('Should return empty plugins when not exists', async () => {
			const pluginsUndefined = await getPlugins(undefined);
			expect(pluginsUndefined).toEqual([]);

			const pluginsNull = await getPlugins(null);
			expect(pluginsNull).toEqual([]);

			const pluginsEmptyArray = await getPlugins([]);
			expect(pluginsEmptyArray).toEqual([]);
		});

		it('Should return processed local plugin', async () => {
			mockLocalPluginName(1);
			const plugin: SwcPlugin = [fakePluginPath, {}];

			jest.clearAllMocks();
			const loadLocalPluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadLocalPlugins'
			);

			const plugins = await getPlugins([plugin]);

			expect(plugins.length).toBe(1);
			expect(loadLocalPluginsSpy).toHaveBeenCalledTimes(1);
		});

		it('Should process local plugin', async () => {
			mockLocalPluginName(1);
			const plugin: SwcPlugin = [fakePluginPath, {}];

			jest.clearAllMocks();
			const loadLocalPluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadLocalPlugins'
			);

			const plugins = await getPlugins([plugin]);

			expect(plugins.length).toBe(1);
			expect(loadLocalPluginsSpy).toHaveBeenCalledTimes(1);
		});

		it('Should process multiple local plugins', async () => {
			mockLocalPluginName(1);
			const plugin: SwcPlugin = [fakePluginPath, {}];

			jest.clearAllMocks();
			const loadLocalPluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadLocalPlugins'
			);

			const plugins = await getPlugins([plugin, plugin, plugin]);

			expect(plugins.length).toBe(3);
			expect(loadLocalPluginsSpy).toHaveBeenCalledTimes(3);
		});

		it('Should process package plugin', async () => {
			const version = '0.4.0';
			const packageName = '@swc/plugin-styled-components';
			const plugin: SwcPlugin = [packageName, {}];
			mockPackageVersion(version);

			jest.clearAllMocks();
			const packagePluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadPluginPackage'
			);

			const plugins = await getPlugins([plugin]);

			expect(plugins.length).toBe(1);
			expect(packagePluginsSpy).toHaveBeenCalledTimes(1);
		});

		it('Should process multiple package plugins', async () => {
			const version = '0.4.0';
			const packageName = '@swc/plugin-styled-components';
			const plugin: SwcPlugin = [packageName, {}];
			mockPackageVersion(version);

			jest.clearAllMocks();
			const packagePluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadPluginPackage'
			);

			const plugins = await getPlugins([plugin, plugin, plugin]);

			expect(plugins.length).toBe(3);
			expect(packagePluginsSpy).toHaveBeenCalledTimes(3);
		});

		it('Should process local and package plugins', async () => {
			const version = '0.4.0';
			const packageName = '@swc/plugin-styled-components';
			const packagePlugin: SwcPlugin = [packageName, {}];

			mockLocalPluginName(1);
			const localPlugin: SwcPlugin = [fakePluginPath, {}];
			mockPackageVersion(version);

			jest.clearAllMocks();
			const packagePluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadPluginPackage'
			);

			const loadLocalPluginsSpy = jest.spyOn(
				swcPluginLoader,
				'loadLocalPlugins'
			);

			const plugins = await getPlugins([
				packagePlugin,
				localPlugin,
				packagePlugin,
				localPlugin,
			]);

			expect(plugins.length).toBe(4);
			expect(loadLocalPluginsSpy).toHaveBeenCalledTimes(2);
			expect(packagePluginsSpy).toHaveBeenCalledTimes(2);
		});

		it('Should skip local plugin with wrong path', async () => {
			const wrongLocalPluginPath = '/my/fake/path.wasm';

			const plugin: SwcPlugin = [wrongLocalPluginPath, {}];

			const plugins = await getPlugins([plugin]);
			expect(plugins).toEqual([]);
		});
	});
});
