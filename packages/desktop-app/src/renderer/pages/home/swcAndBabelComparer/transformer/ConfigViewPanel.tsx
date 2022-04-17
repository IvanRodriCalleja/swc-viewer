import { Box, Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useViewerContext } from '../../ViewerContext';
import {
	OutputType,
	TabState,
	ViewerAction,
} from '../../viewerContext/viewerContextReducer';

type ConfigViewPanelProps = {
	tab: TabState;
};

export const ConfigViewPanel = ({ tab }: ConfigViewPanelProps) => {
	const { dispatch } = useViewerContext();

	const onOutputTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: ViewerAction.UpdateOutputType,
			payload: {
				outputType: event.target.value as OutputType,
				tabId: tab.id,
			},
		});
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			marginTop="-20px"
			marginBottom="16px"
		>
			<Box
				bg="orange.200"
				width="132px"
				height="24px"
				borderRadius="12px"
				borderTopRightRadius="0"
				borderTopLeftRadius="0"
			>
				<Select
					onChange={onOutputTypeChange}
					value={tab.outputType}
					height="24px"
					fontSize="12px"
					color="gray.800"
					border="none"
					boxShadow="none !important"
				>
					{Object.values(OutputType).map((outputType) => (
						<option key={outputType} value={outputType}>
							{outputType}
						</option>
					))}
				</Select>
			</Box>
		</Box>
	);
};
