import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import { useTransformSwc } from 'renderer/server-resources/useTransformSwc';

type SwcOutputProps = {
	tab: TabState;
};

export const SwcOutput = ({ tab }: SwcOutputProps) => {
	const { data, error } = useTransformSwc({
		file: tab.fileTransform,
		transformConfig: tab.comparerConfig.swc,
	});

	const code = data || (error as string);

	return <OutputEditor code={code} viewMode="javascript" />;
};
