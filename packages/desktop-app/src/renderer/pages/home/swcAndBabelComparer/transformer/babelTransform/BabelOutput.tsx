import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import {
	TransformBabelResult,
	useTransformBabel,
} from 'renderer/server-resources/useTransformBabel';
import { getViewMode } from '../shared/getViewMode';
import { TransformStatus } from '../shared/TransformStatus';

type BabelOutputProps = {
	tab: TabState;
};

export const BabelOutput = ({ tab }: BabelOutputProps) => {
	const { data, error, isRefetching, isFetching } = useTransformBabel({
		file: tab.fileTransform,
		transformConfig: tab.comparerConfig.babel,
		outputType: tab.outputType,
		swcTransformConfig: tab.comparerConfig.swc,
	});

	const { code } = (data || error) as TransformBabelResult;

	const viewMode = getViewMode({
		fileName: tab.fileTransform.name,
		outputType: tab.outputType,
	});

	return (
		<>
			<TransformStatus isLoading={isFetching || isRefetching} />
			<OutputEditor code={code} viewMode={viewMode} />
		</>
	);
};
