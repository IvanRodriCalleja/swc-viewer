import {
	FileTransform,
	TranspilerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { SwcConfig } from '../../models/SwcConfig';
import { getSwc } from './swc/swcLoader';
import { loadPlugins } from './swc/swcPluginLoader';

const handleSwcError = (error: unknown): string => {
	if (typeof error === 'string') {
		return error;
	}
	if (error instanceof Error) {
		return `${error.toString()}\n\n${error.stack}`;
	}
	return String(error);
};

type TransformSwc = {
	transformConfig: TranspilerConfig<SwcConfig>;
	file: FileTransform;
};

export const transformSwc = async ({ transformConfig, file }: TransformSwc) => {
	const { config, version } = transformConfig;
	const { code } = file;

	const swc = await getSwc(version);

	const experimental = config?.jsc?.experimental || {};
	const plugins = await loadPlugins(experimental.plugins);

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
		return handleSwcError(error);
	}
};
