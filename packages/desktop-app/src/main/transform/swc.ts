import { SwcConfig } from '../../models/SwcConfig';
import { SwcModule } from '../../models/SwcModule';
import {
	FileTransform,
	OutputType,
	TransformerConfig,
} from '../../renderer/pages/home/viewerContext/viewerContextReducer';
import { getModule } from './shared/packageManager';
import { getPlugins } from './swc/swcPluginLoader';

const handleSwcError = (error: unknown): string => {
	if (typeof error === 'string') {
		return error;
	}
	if (error instanceof Error) {
		return `${error.toString()}\n\n${error.stack}`;
	}
	return String(error);
};

export type TransformSwc = {
	transformConfig: TransformerConfig<SwcConfig>;
	file: FileTransform;
	outputType: OutputType;
};

export const transformSwc = async ({ transformConfig, file }: TransformSwc) => {
	const { config, version } = transformConfig;
	const { code } = file;
	const experimental = config?.jsc?.experimental || {};

	const swc = await getModule<SwcModule>({ packageName: '@swc/core', version });
	const plugins = await getPlugins(experimental.plugins);

	try {
		const transformed = await swc.transform(code, {
			...config,
			jsc: {
				...config.jsc,
				experimental: {
					...experimental,
					plugins,
				},
			},
		});
		return transformed.code;
	} catch (error) {
		throw handleSwcError(error);
	}
};

type ParseSwc = {
	transformConfig: TransformerConfig<SwcConfig>;
	transformedCode: string;
};

export const parseSwc = async ({
	transformConfig,
	transformedCode,
}: ParseSwc) => {
	const { config, version } = transformConfig;

	const swc = await getModule<SwcModule>({ packageName: '@swc/core', version });
	const ast = await swc.parseSync(transformedCode, config.jsc.parser);

	return JSON.stringify(ast, null, 2);
};
