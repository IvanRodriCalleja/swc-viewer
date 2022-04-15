import { copyFileSync, existsSync, mkdirSync, rmdirSync } from 'fs';
import { basename, extname, resolve } from 'path';
import { Plugin } from '../../../models/SwcConfig';
import {
	getPlugin,
	isLocalPlugin,
	isWasmFile,
} from '../../../shared/swcPluginUtils';
import { getPackageLastVersion } from '../shared/packageVersioncache';
import {
	getPackageEntryPath,
	installPackage,
	isPackageDownloaded,
	packageCacheFolder,
} from '../shared/packageManager';

export type SwcPlugin = [string, unknown];

export const loadLocalPlugins = ([pluginPath, pluginConfig]: SwcPlugin) => {
	const pluginExtension = extname(pluginPath);
	const pluginName = basename(pluginPath, pluginExtension);

	const pluginCacheFolder = resolve(
		packageCacheFolder,
		`local-plugins/${pluginName}`
	);
	// This is done in order to avoid swc caching plugin binary between executions when it has been changed
	const pluginCachePath = resolve(pluginCacheFolder, `${Date.now()}.wasm`);

	if (existsSync(pluginCacheFolder)) {
		rmdirSync(pluginCacheFolder, { recursive: true });
	}

	mkdirSync(pluginCacheFolder, { recursive: true });
	copyFileSync(pluginPath, pluginCachePath);

	return [pluginCachePath, pluginConfig] as SwcPlugin;
};

export const loadPluginPackage = async ([
	pluginName,
	pluginConfig,
]: SwcPlugin) => {
	const version = await getPackageLastVersion(pluginName);

	if (!isPackageDownloaded({ packageName: pluginName, version })) {
		await installPackage({ packageName: pluginName, version });
	}

	return [
		getPackageEntryPath({ packageName: pluginName, version }),
		pluginConfig,
	] as SwcPlugin;
};

export const getPlugins = async (plugins: Plugin[] | null | undefined) => {
	if (!plugins) return [];

	const mappedPlugins = plugins.map(async (plugin) => {
		const swcPlugin = getPlugin(plugin);

		if (isLocalPlugin(swcPlugin) && isWasmFile(swcPlugin)) {
			if (!existsSync(swcPlugin[0])) return undefined;
			return loadLocalPlugins(swcPlugin);
		}

		return await loadPluginPackage(swcPlugin);
	});

	return (await Promise.all(mappedPlugins)).filter(Boolean) as Plugin[];
};
