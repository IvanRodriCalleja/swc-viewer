import { Stack } from '@chakra-ui/react';
import { FileUploader } from './swcAndBabelComparer/FileUploader';
import { Transformer } from './swcAndBabelComparer/Transformer';
import { useViewerContext } from './ViewerContext';
import { TabState, ViewerAction } from './viewerContext/viewerContextReducer';

type SwcAndBabelComparerProps = {
	tab: TabState;
};

export const SwcAndBabelComparer = ({ tab }: SwcAndBabelComparerProps) => {
	const { dispatch } = useViewerContext();

	const onFileUpload = (event: ProgressEvent<FileReader>, file: File) => {
		dispatch({
			type: ViewerAction.ChangeFileTransform,
			payload: {
				tabId: tab.id,
				fileTransform: {
					name: file.name,
					path: file.path,
					code: event?.target?.result as string,
				},
			},
		});
	};

	return (
		<Stack
			as="main"
			display="flex"
			flexDirection="row"
			justifyContent="center"
			alignItems="center"
			height="full"
			width="full"
		>
			{tab.fileTransform.code ? (
				<Transformer tab={tab} />
			) : (
				<FileUploader onFileUpload={onFileUpload} />
			)}
		</Stack>
	);
};
