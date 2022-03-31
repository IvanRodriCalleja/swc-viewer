import { SwcConfig } from 'models/SwcConfig';
import { useQuery } from 'react-query';
import {
	FileTransform,
	TranspilerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';

type TranspileSwc = {
	transformConfig: TranspilerConfig<SwcConfig>;
	file: FileTransform;
};

const resourceKey = 'transpile-swc';

const transpileSwc = (transform: TranspileSwc) =>
	window.electron.ipcRenderer
		.invoke('transpile-swc', transform)
		.then((result: string) => result)
		.catch((error) => console.log({ error }));

export const useTranspileSwc = (transform: TranspileSwc) => {
	return useQuery([resourceKey, transform], () => transpileSwc(transform), {
		refetchOnMount: true,
	});
};
