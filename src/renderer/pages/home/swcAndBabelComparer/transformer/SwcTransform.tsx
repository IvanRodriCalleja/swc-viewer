import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import { TabState } from '../../viewerContext/viewerContextReducer';
import { SwcTransformHeader } from './swcTransform/SwcTransformHeader';

type SwcTransformProps = {
	tab: TabState;
};

export const SwcTransform = ({ tab }: SwcTransformProps) => {
	const [state] = useState('');

	return (
		<Box width="full" height="full">
			<SwcTransformHeader tab={tab} packageName="@swc/core" />
			<Box width="full" height="calc(100% - 56px)" borderWidth="1px">
				<OutputEditor code={state} viewMode="javascript" />
			</Box>
		</Box>
	);
};
