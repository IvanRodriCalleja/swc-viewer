import { Plugin } from '../models/SwcConfig';

export const getPlugin = (plugin: Plugin): [string, unknown] => {
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

export const isLocalPlugin = ([pluginName]: [string, unknown]) =>
	/^(?:\/|[a-z]+:\/\/)/.test(pluginName);

export const isWasmFile = ([pluginName]: [string, unknown]) =>
	pluginName.endsWith('.wasm');
