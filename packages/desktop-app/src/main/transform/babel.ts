import type { BabelFileResult } from '@babel/core';

import { BabelConfig } from '../../models/BabelConfig';
import { BabelModule } from '../../models/BabelModule';
import {
	FileTransform,
	TransformerConfig,
} from '../../renderer/pages/home/viewerContext/viewerContextReducer';
import { loadPlugins } from './babel/babelPluginLoader';
import { getModule } from './shared/packageManager';

type TransformArgs = {
	transformConfig: TransformerConfig<BabelConfig>;
	file: FileTransform;
};

export const transformBabel = async ({
	file,
	transformConfig,
}: TransformArgs) => {
	const { config, version } = transformConfig;
	const { code } = file;

	const babel = await getModule<BabelModule>({
		packageName: '@babel/core',
		version,
	});

	const plugins = await loadPlugins(config.plugins);
	const presets = await loadPlugins(config.presets);

	const transformed = (await babel.transformAsync(code, {
		...config,
		plugins,
		presets,
	})) as BabelFileResult;
	return transformed.code;
};
