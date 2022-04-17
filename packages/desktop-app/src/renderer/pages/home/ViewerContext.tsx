import {
	createContext,
	Dispatch,
	FC,
	useReducer,
	useContext,
	useMemo,
} from 'react';
import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';
import { useGetLastBabelVersion } from './viewerContext/useGetLastBabelVersion';
import { useGetLastSwcVersion } from './viewerContext/useGetLastSwcVersion';

import {
	viewerReducer,
	ViewerState,
	ViewerActionType,
	TabType,
	TabState,
	OutputType,
} from './viewerContext/viewerContextReducer';

export type ViewerContextValue = {
	state: ViewerState;
	dispatch: Dispatch<ViewerActionType>;
};

const defaultTabState: TabState = {
	id: 0,
	type: TabType.SwcBabelPluginComparer,
	outputType: OutputType.Code,
	fileTransform: {
		name: 'Untitled-0',
		path: 'Untitled-0',
		code: '',
	},
	comparerConfig: {
		babel: {
			version: '',
			config: babelBaseConfig,
		},
		swc: {
			version: '',
			config: swcBaseConfig,
		},
	},
};

const defaultState: ViewerState = {
	lastSwcVersion: '',
	lastBabelVersion: '',
	activeTabId: 0,
	tabs: [defaultTabState],
};

const initialValue: ViewerContextValue = {
	state: defaultState,
	dispatch: () => null,
};

const ViewerContext = createContext<ViewerContextValue>(initialValue);

export const ViewerProvider: FC<unknown> = ({ children }) => {
	const lastSwcVersion = useGetLastSwcVersion();
	const lastBabelVersion = useGetLastBabelVersion();

	const initialState: ViewerState = useMemo(
		() => ({
			...defaultState,
			lastSwcVersion,
			lastBabelVersion,
			tabs: [
				{
					...defaultTabState,
					comparerConfig: {
						babel: {
							version: lastBabelVersion,
							config: babelBaseConfig,
						},
						swc: {
							version: lastSwcVersion,
							config: swcBaseConfig,
						},
					},
				},
			],
		}),
		[lastSwcVersion, lastBabelVersion]
	);

	const [state, dispatch] = useReducer(viewerReducer, initialState);

	return (
		<ViewerContext.Provider value={{ state, dispatch }}>
			{children}
		</ViewerContext.Provider>
	);
};

export const useViewerContext = () => useContext(ViewerContext);
