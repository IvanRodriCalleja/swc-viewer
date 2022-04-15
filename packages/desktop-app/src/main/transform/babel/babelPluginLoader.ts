import type { PluginItem, PluginOptions } from '@babel/core';
import { getPackageLastVersion } from '../shared/packageVersioncache';
import {
	installPackage,
	getPackageEntryPath,
	isPackageDownloaded,
} from '../shared/packageManager';

export const loadPlugins = async (
	plugins: PluginItem[] | null | undefined
): Promise<PluginItem[]> => {
	if (!plugins) return [];

	const mappedPlugins = plugins.map(async (plugin) => {
		let pluginName = '';
		let pluginConfig: PluginOptions = {};

		// TODO: Implement all possible ways of declare plugin

		if (typeof plugin === 'string') {
			pluginName = plugin;
		}

		if (typeof plugin === 'object') {
			if (Array.isArray(plugin)) {
				[pluginName, pluginConfig] = plugin as [string, PluginOptions];
			}
		}

		const version = await getPackageLastVersion(pluginName);

		if (!isPackageDownloaded({ packageName: pluginName, version })) {
			await installPackage({ packageName: pluginName, version });
		}

		return [
			getPackageEntryPath({ packageName: pluginName, version }),
			pluginConfig,
		] as PluginItem;
	});

	return Promise.all(mappedPlugins);
};
