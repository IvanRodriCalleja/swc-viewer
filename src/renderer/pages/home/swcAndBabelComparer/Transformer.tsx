import { Stack } from '@chakra-ui/react';
import { TabState } from '../viewerContext/viewerContextReducer';
import { BabelTransform } from './transformer/BabelTransform';
import { SwcTransform } from './transformer/SwcTransform';
import { UploadedContent } from './transformer/UploadedContent';

type TransformerProps = {
	tab: TabState;
};

export const Transformer = ({ tab }: TransformerProps) => (
	<Stack
		data-testid="transformer"
		width="full"
		height="full"
		direction="row"
		position="relative"
	>
		<Stack direction="row" width="full" height="full" spacing="6">
			<SwcTransform tab={tab} />
			<BabelTransform tab={tab} />
		</Stack>
		<UploadedContent fileTransform={tab.fileTransform} />
	</Stack>
);
