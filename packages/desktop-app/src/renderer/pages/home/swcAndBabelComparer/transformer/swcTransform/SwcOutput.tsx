import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import {
	TransformSwcResult,
	useTransformSwc,
} from 'renderer/server-resources/useTransformSwc';
import { getViewMode } from '../shared/getViewMode';
import { TransformStatus } from '../shared/TransformStatus';
import { useGetLocalSwcPlugins } from './swccOutput/useGetLocalSwcPlugins';
import { useWatchFileChange } from './swccOutput/useWatchFileChange';

type SwcOutputProps = {
	tab: TabState;
};

export const SwcOutput = ({ tab }: SwcOutputProps) => {
	const { data, error, refetch, isRefetching, isFetching } = useTransformSwc({
		file: tab.fileTransform,
		transformConfig: tab.comparerConfig.swc,
		outputType: tab.outputType,
	});

	const filePaths = useGetLocalSwcPlugins(tab);
	useWatchFileChange({ onChange: refetch, filePaths });
	const { code } = (data || error) as TransformSwcResult;

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
