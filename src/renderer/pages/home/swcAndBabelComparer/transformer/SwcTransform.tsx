import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import { useTranspileSwc } from 'renderer/server-resources/useTranspileSwc';
import { TabState } from '../../viewerContext/viewerContextReducer';
import { SwcTransformHeader } from './swcTransform/SwcTransformHeader';

type SwcTransformProps = {
	tab: TabState;
};

export const SwcTransform = ({ tab }: SwcTransformProps) => {
	return (
		<Box width="full" height="full">
			<SwcTransformHeader tab={tab} packageName="@swc/core" />
			<Box width="full" height="calc(100% - 56px)" borderWidth="1px">
				<Suspense fallback={<div>Loading...</div>}>
					<A tab={tab} />
				</Suspense>
			</Box>
		</Box>
	);
};

type AProps = {
	tab: TabState;
};

const A = ({ tab }: AProps) => {
	const { data } = useTranspileSwc({
		file: tab.fileTransform,
		transformConfig: tab.comparerConfig.swc,
	});

	return <OutputEditor code={data as string} viewMode="javascript" />;
};
