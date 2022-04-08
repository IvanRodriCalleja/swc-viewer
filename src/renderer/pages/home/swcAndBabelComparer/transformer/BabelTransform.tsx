import { Box } from '@chakra-ui/react';
import { BabelLogo } from 'renderer/pages/shared/BabelLogo';

import { TabState } from '../../viewerContext/viewerContextReducer';
import { BabelConfigForm } from './babelTransform/BabelConfigForm';
import { BabelOutput } from './babelTransform/BabelOutput';
import { OutputContainer } from './shared/OutputContainer';
import { TransformHeader } from './shared/TransformHeader';

type BabelTransformProps = {
	tab: TabState;
};

export const BabelTransform = ({ tab }: BabelTransformProps) => {
	return (
		<Box width="full" height="full">
			<TransformHeader
				logo={<BabelLogo />}
				modalTitle="Babel configuration (.babelrc)"
			>
				{({ onClose }) => (
					<BabelConfigForm
						tab={tab}
						packageName="@babel/standalone"
						onSubmit={onClose}
					/>
				)}
			</TransformHeader>
			<OutputContainer>
				<BabelOutput tab={tab} />
			</OutputContainer>
		</Box>
	);
};
