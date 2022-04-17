import { OutputType } from 'renderer/pages/home/viewerContext/viewerContextReducer';

type GetViewModel = {
	outputType: OutputType;
	fileName: string;
};

export const getViewMode = ({ outputType, fileName }: GetViewModel) => {
	if (outputType === OutputType.AST) return 'json';
	if (fileName.endsWith('.js') || fileName.endsWith('.jsx'))
		return 'javascript';

	return 'typescript';
};
