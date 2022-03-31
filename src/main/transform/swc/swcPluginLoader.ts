import {
	downloadPackage,
	getPackageEntryPath,
	isPackageDownloaded,
} from '../shared/packageManager';
import { Plugin } from '../../../models/SwcConfig';
import { getPackageLastVersion } from '../shared/cache';

export const loadPlugins = async (
	plugins: Plugin[] | null | undefined
): Promise<Plugin[]> => {
	if (!plugins) return [];

	const mappedPlugins = plugins.map(async (plugin) => {
		let pluginName = '';
		let pluginConfig = {};

		if (typeof plugin === 'string') {
			pluginName = plugin;
		}

		if (typeof plugin === 'object') {
			if (Array.isArray(plugin)) {
				[pluginName, pluginConfig] = plugin;
			}
		}

		const version = await getPackageLastVersion(pluginName);

		if (!isPackageDownloaded({ packageName: pluginName, version })) {
			await downloadPackage({ packageName: pluginName, version });
		}

		return [
			getPackageEntryPath({ packageName: pluginName, version }),
			pluginConfig,
		] as Plugin;
	});

	return Promise.all(mappedPlugins);
};
