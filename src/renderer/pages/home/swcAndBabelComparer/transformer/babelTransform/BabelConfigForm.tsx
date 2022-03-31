import { Box } from '@chakra-ui/react';
import { Formik } from 'formik';
import {
	TabState,
	ViewerAction,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { useViewerContext } from 'renderer/pages/home/ViewerContext';
import { SelectVersion } from '../shared/SelectVersion';
import { BabelConfigEditor } from './babelConfigForm/BabelConfigEditor';

type BabelConfigFormProps = {
	tab: TabState;
	packageName: string;
	onSubmit: () => void;
};

export const BabelConfigForm = ({
	tab,
	packageName,
	onSubmit,
}: BabelConfigFormProps) => {
	const { dispatch } = useViewerContext();
	const onFormSubmit = (babel: { version: string; config: string }) => {
		dispatch({
			type: ViewerAction.UpdateBabelConfig,
			payload: {
				tabId: tab.id,
				config: { ...babel, config: JSON.parse(babel.config) },
			},
		});
		onSubmit();
	};

	return (
		<Formik
			initialValues={{
				version: tab.comparerConfig.babel.version,
				config: JSON.stringify(tab.comparerConfig.babel.config, null, 2),
			}}
			onSubmit={onFormSubmit}
			validateOnChange
		>
			{({ handleSubmit }) => (
				<form
					id="config-form"
					onSubmit={handleSubmit}
					style={{ height: '100%' }}
				>
					<Box display="flex" flexDirection="row" height="full" gap="16px">
						<Box width="232px">
							<SelectVersion packageName={packageName} />
						</Box>

						<Box height="full" flexGrow={1}>
							<BabelConfigEditor tab={tab} />
						</Box>
					</Box>
				</form>
			)}
		</Formik>
	);
};
