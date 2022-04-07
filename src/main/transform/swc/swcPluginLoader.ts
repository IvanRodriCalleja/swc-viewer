import { copyFileSync, existsSync, mkdirSync, rmdirSync } from 'fs';
import { basename, extname, resolve } from 'path';
import {
	downloadPackage,
	getPackageEntryPath,
	isPackageDownloaded,
	packageCacheFolder,
} from '../shared/packageManager';
import { Plugin } from '../../../models/SwcConfig';
import { getPackageLastVersion } from '../shared/cache';

const getPlugin = (plugin: Plugin): [string, unknown] => {
	let pluginName = '';
	let pluginConfig = {} as unknown;

	if (typeof plugin === 'string') {
		pluginName = plugin;
	}

	if (typeof plugin === 'object') {
		if (Array.isArray(plugin)) {
			[pluginName, pluginConfig] = plugin;
		}
	}

	return [pluginName, pluginConfig];
};

const downloadPlugin = async ([pluginName, pluginConfig]: [
	string,
	unknown
]) => {
	const version = await getPackageLastVersion(pluginName);

	if (!isPackageDownloaded({ packageName: pluginName, version })) {
		await downloadPackage({ packageName: pluginName, version });
	}

	return [
		getPackageEntryPath({ packageName: pluginName, version }),
		pluginConfig,
	] as Plugin;
};

const isLocalPlugin = ([pluginName]: [string, unknown]) =>
	pluginName.endsWith('.wasm');

export const loadLocalPlugins = ([pluginPath, pluginConfig]: [
	string,
	unknown
]) => {
	const pluginExtension = extname(pluginPath);
	const pluginName = basename(pluginPath, pluginExtension);

	const pluginCacheFolder = resolve(
		packageCacheFolder,
		`local-plugins/${pluginName}`
	);
	// This is done in order to avoid swc caching plugin binary between executions when it has been changed
	const pluginCachePath = resolve(pluginCacheFolder, `${Date.now()}.wasm`);

	if (existsSync(pluginCachePath)) {
		rmdirSync(pluginCachePath);
	}

	mkdirSync(pluginCacheFolder, { recursive: true });
	copyFileSync(pluginPath, pluginCachePath);

	return [pluginCachePath, pluginConfig] as Plugin;
};

export const loadPlugins = async (
	plugins: Plugin[] | null | undefined
): Promise<Plugin[]> => {
	if (!plugins) return [];

	const mappedPlugins = plugins.map(async (plugin) => {
		const swcPlugin = getPlugin(plugin);

		if (isLocalPlugin(swcPlugin)) {
			return loadLocalPlugins(swcPlugin);
		}

		return await downloadPlugin(swcPlugin);
	});

	return Promise.all(mappedPlugins);
};
