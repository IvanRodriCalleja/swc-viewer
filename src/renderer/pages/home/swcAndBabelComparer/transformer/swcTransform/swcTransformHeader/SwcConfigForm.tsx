import { Box } from '@chakra-ui/react';
import { Formik } from 'formik';
import {
	TabState,
	ViewerAction,
} from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { useViewerContext } from 'renderer/pages/home/ViewerContext';
import { SwcVersion } from './swcConfigForm/SwcVersion';
import { SwcConfigEditor } from './swcConfigForm/SwcConfigEditor';

type SwcConfigFormProps = {
	tab: TabState;
	packageName: string;
	onSubmit: () => void;
};

export const SwcConfigForm = ({
	tab,
	packageName,
	onSubmit,
}: SwcConfigFormProps) => {
	const { dispatch } = useViewerContext();
	const onFormSubmit = (swc: { version: string; config: string }) => {
		dispatch({
			type: ViewerAction.UpdateSwcConfig,
			payload: {
				tabId: tab.id,
				config: { ...swc, config: JSON.parse(swc.config) },
			},
		});
		onSubmit();
	};

	return (
		<Formik
			initialValues={{
				version: tab.comparerConfig.swc.version,
				config: JSON.stringify(tab.comparerConfig.swc.config, null, 2),
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
							<SwcVersion packageName={packageName} />
						</Box>

						<Box height="full" flexGrow={1}>
							<SwcConfigEditor tab={tab} />
						</Box>
					</Box>
				</form>
			)}
		</Formik>
	);
};
