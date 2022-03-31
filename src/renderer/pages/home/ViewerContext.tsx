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
import { useGetLastSwcVersion } from './viewerContext/useGetLastSwcVersion';

import {
	viewerReducer,
	ViewerState,
	ViewerActionType,
	TabType,
	TabState,
} from './viewerContext/viewerContextReducer';

export type ViewerContextValue = {
	state: ViewerState;
	dispatch: Dispatch<ViewerActionType>;
};

const defaultTabState: TabState = {
	id: 0,
	type: TabType.SwcBabelPluginComparer,
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

	const initialState: ViewerState = useMemo(
		() => ({
			...defaultState,
			lastSwcVersion,
			tabs: [
				{
					...defaultTabState,
					comparerConfig: {
						babel: {
							version: '',
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
		[lastSwcVersion]
	);

	const [state, dispatch] = useReducer(viewerReducer, initialState);

	return (
		<ViewerContext.Provider value={{ state, dispatch }}>
			{children}
		</ViewerContext.Provider>
	);
};

export const useViewerContext = () => useContext(ViewerContext);
