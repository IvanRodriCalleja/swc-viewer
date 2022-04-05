import type { BabelFileResult } from '@babel/core';
import {
	FileTransform,
	TransformerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { BabelConfig } from '../../models/BabelConfig';
import { getBabel } from './babel/babelLoader';
import { loadPlugins } from './babel/babelPluginLoader';

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

	const babel = await getBabel(version);

	const plugins = await loadPlugins(config.plugins);
	const transformed = (await babel.transform(code, {
		...config,
		plugins,
	})) as BabelFileResult;
	return transformed.code;
};
