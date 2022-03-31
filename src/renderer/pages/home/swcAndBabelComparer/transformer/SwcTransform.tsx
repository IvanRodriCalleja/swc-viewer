import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { SwcLogo } from 'renderer/pages/shared/SwcLogo';
import { TabState } from '../../viewerContext/viewerContextReducer';
import { TransformHeader } from './shared/TransformHeader';
import { SwcOutput } from './swcTransform/SwcOutput';
import { SwcConfigForm } from './swcTransform/SwcConfigForm';

type SwcTransformProps = {
	tab: TabState;
};

export const SwcTransform = ({ tab }: SwcTransformProps) => {
	return (
		<Box width="full" height="full">
			<TransformHeader
				logo={<SwcLogo />}
				modalTitle="SWC configuration (.swcrc)"
			>
				{({ onClose }) => (
					<SwcConfigForm tab={tab} packageName="@swc/core" onSubmit={onClose} />
				)}
			</TransformHeader>

			<Box width="full" height="calc(100% - 56px)" borderWidth="1px">
				<Suspense fallback={<div>Loading...</div>}>
					<SwcOutput tab={tab} />
				</Suspense>
			</Box>
		</Box>
	);
};
