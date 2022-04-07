import { useMemo } from 'react';
import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';

export const useGetLocalSwcPlugins = (tab: TabState) => {
	return useMemo(() => {
		const swcPlugins =
			tab.comparerConfig.swc.config.jsc.experimental?.plugins || [];

		return swcPlugins
			.map((plugin) => {
				let pluginName = '';

				if (typeof plugin === 'string') {
					pluginName = plugin;
				}

				if (typeof plugin === 'object') {
					if (Array.isArray(plugin)) {
						[pluginName] = plugin;
					}
				}

				return pluginName;
			})
			.filter((pluginName) => pluginName.endsWith('.wasm'));
	}, [tab]);
};
