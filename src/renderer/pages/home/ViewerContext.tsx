import { createContext, Dispatch, FC, useReducer, useContext } from 'react';
import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';

import {
	viewerReducer,
	ViewerState,
	ViewerActionType,
	TabType,
} from './viewerContext/viewerContextReducer';

export type ViewerContextValue = {
	state: ViewerState;
	dispatch: Dispatch<ViewerActionType>;
};

const initialState: ViewerState = {
	activeTabId: 0,
	tabs: [
		{
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
		},
	],
};

const initialValue: ViewerContextValue = {
	state: initialState,
	dispatch: () => null,
};

const ViewerContext = createContext<ViewerContextValue>(initialValue);

export const ViewerProvider: FC<unknown> = ({ children }) => {
	const [state, dispatch] = useReducer(viewerReducer, initialState);

	return (
		<ViewerContext.Provider value={{ state, dispatch }}>
			{children}
		</ViewerContext.Provider>
	);
};

export const useViewerContext = () => useContext(ViewerContext);
