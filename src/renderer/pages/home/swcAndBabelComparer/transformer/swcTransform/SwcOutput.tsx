import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import { useTransformSwc } from 'renderer/server-resources/useTransformSwc';

type SwcOutputProps = {
	tab: TabState;
};

export const SwcOutput = ({ tab }: SwcOutputProps) => {
	const { data } = useTransformSwc({
		file: tab.fileTransform,
		transformConfig: tab.comparerConfig.swc,
	});

	return <OutputEditor code={data as string} viewMode="javascript" />;
};
