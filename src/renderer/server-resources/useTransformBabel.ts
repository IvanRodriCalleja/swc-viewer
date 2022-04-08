import { BabelConfig } from 'models/BabelConfig';
import { useQuery } from 'react-query';
import {
	FileTransform,
	TransformerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { transformBabel as transformBabelAction } from 'ipcActions';

type TransformBabel = {
	transformConfig: TransformerConfig<BabelConfig>;
	file: FileTransform;
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
	return useQuery([resourceKey, transform], () => transformBabel(transform), {
		refetchOnMount: true,
		keepPreviousData: true,
	});
};
