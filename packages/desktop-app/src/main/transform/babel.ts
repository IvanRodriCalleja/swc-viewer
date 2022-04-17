import type { BabelFileResult } from '@babel/core';

import { BabelConfig } from '../../models/BabelConfig';
import { BabelModule } from '../../models/BabelModule';
import {
	FileTransform,
	OutputType,
	TransformerConfig,
} from '../../renderer/pages/home/viewerContext/viewerContextReducer';
import { loadPlugins } from './babel/babelPluginLoader';
import { getModule } from './shared/packageManager';

export type TransformBabel = {
	transformConfig: TransformerConfig<BabelConfig>;
	file: FileTransform;
	outputType: OutputType;
};

export const transformBabel = async ({
	file,
	transformConfig,
}: TransformBabel) => {
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
	return transformed.code as string;
};
