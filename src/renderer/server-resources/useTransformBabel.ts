import { BabelConfig } from 'models/BabelConfig';
import { useQuery } from 'react-query';
import {
	FileTransform,
	TransformerConfig,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';

type TransformBabel = {
	transformConfig: TransformerConfig<BabelConfig>;
	file: FileTransform;
};

const resourceKey = 'transform-babel';

const transformBabel = (transform: TransformBabel) =>
	window.electron.ipcRenderer
		.invoke('transform-babel', transform)
		.then((result: string) => result)
		.catch((error) => error.toString());

export const useTransformBabel = (transform: TransformBabel) => {
	return useQuery([resourceKey, transform], () => transformBabel(transform), {
		refetchOnMount: true,
	});
};
