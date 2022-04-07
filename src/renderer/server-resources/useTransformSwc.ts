import { SwcConfig } from 'models/SwcConfig';
import { useQuery } from 'react-query';
import {
	FileTransform,
	TransformerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { transformSwc as transformSwcAction } from 'ipcActions';

type TransformSwc = {
	transformConfig: TransformerConfig<SwcConfig>;
	file: FileTransform;
};

export type TransformSwcResult = {
	code: string;
	transformedAt: Date;
};

const resourceKey = 'transform-swc';

const transformSwc = (transform: TransformSwc): Promise<TransformSwcResult> =>
	window.electron.ipcRenderer
		.invoke(transformSwcAction, transform)
		.then((code: string) => ({
			code,
			transformedAt: new Date(),
		}))
		.catch((error) => ({
			code: error.toString(),
			transformedAt: new Date(),
		}));

export const useTransformSwc = (transform: TransformSwc) => {
	return useQuery([resourceKey, transform], () => transformSwc(transform), {
		refetchOnMount: true,
		keepPreviousData: true,
	});
};
