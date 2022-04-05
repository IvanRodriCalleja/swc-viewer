import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { OutputEditor } from 'renderer/pages/shared/OutputEditor';
import { useTransformBabel } from 'renderer/server-resources/useTransformBabel';

type BabelOutputProps = {
	tab: TabState;
};

export const BabelOutput = ({ tab }: BabelOutputProps) => {
	const { data, error } = useTransformBabel({
		file: tab.fileTransform,
		transformConfig: tab.comparerConfig.babel,
	});

	const code = data || (error as string);

	return <OutputEditor code={code} viewMode="javascript" />;
};
