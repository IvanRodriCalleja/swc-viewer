import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { BabelLogo } from 'renderer/pages/shared/BabelLogo';

import { TabState } from '../../viewerContext/viewerContextReducer';
import { BabelConfigForm } from './babelTransform/BabelConfigForm';
import { BabelOutput } from './babelTransform/BabelOutput';
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
						packageName="@babel/core"
						onSubmit={onClose}
					/>
				)}
			</TransformHeader>
			<Box width="full" height="calc(100% - 56px)" borderWidth="1px">
				<Suspense fallback={<div>Loading...</div>}>
					<BabelOutput tab={tab} />
				</Suspense>
			</Box>
		</Box>
	);
};
