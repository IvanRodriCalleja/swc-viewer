import { BabelConfig } from 'models/BabelConfig';
import { useQuery } from 'react-query';
import {
	FileTransform,
	OutputType,
	TransformerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { transformBabel as transformBabelAction } from 'ipcActions';
import { SwcConfig } from 'models/SwcConfig';

type TransformBabel = {
	transformConfig: TransformerConfig<BabelConfig>;
	file: FileTransform;
	outputType: OutputType;
	swcTransformConfig: TransformerConfig<SwcConfig>;
};

export type TransformBabelResult = {
	code: string;
	transformedAt: Date;
};

const resourceKey = 'transform-babel';

const transformBabel = (
	transform: TransformBabel
): Promise<TransformBabelResult> =>
	window.electron.ipcRenderer
		.invoke(transformBabelAction, transform)
		.then((code: string) => ({
			code,
			transformedAt: new Date(),
		}))
		.catch((error) => ({
			code: error.toString(),
			transformedAt: new Date(),
		}));

export const useTransformBabel = (transform: TransformBabel) => {
	const transformKey = getTransformBabelKey(transform);

	return useQuery(
		[resourceKey, transformKey],
		() => transformBabel(transform),
		{
			refetchOnMount: true,
			keepPreviousData: true,
		}
	);
};

const getTransformBabelKey = (transform: TransformBabel) => {
	if (transform.outputType === OutputType.AST) return transform;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { swcTransformConfig, ...key } = transform;
	return key;
};
