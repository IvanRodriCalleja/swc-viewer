import { SwcConfig } from 'models/SwcConfig';
import { useQuery } from 'react-query';
import {
	FileTransform,
	TransformerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';

type TransformSwc = {
	transformConfig: TransformerConfig<SwcConfig>;
	file: FileTransform;
};

const resourceKey = 'transform-swc';

const transformSwc = (transform: TransformSwc) =>
	window.electron.ipcRenderer
		.invoke('transform-swc', transform)
		.then((result: string) => result)
		.catch((error) => console.log({ error }));

export const useTransformSwc = (transform: TransformSwc) => {
	return useQuery([resourceKey, transform], () => transformSwc(transform), {
		refetchOnMount: true,
	});
};
