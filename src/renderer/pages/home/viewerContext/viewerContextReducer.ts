import { BabelConfig } from 'models/BabelConfig';
import { SwcConfig } from 'models/SwcConfig';
import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';

export enum TabType {
	SwcBabelPluginComparer,
}

export type FileTransform = {
	name: string;
	path: string;
	code: string;
};

export type TranspilerConfig<T> = {
	version: string;
	config: T;
};

export type ComparerConfig = {
	babel: TranspilerConfig<BabelConfig>;
	swc: TranspilerConfig<SwcConfig>;
};

export type TabState = {
	id: number;
	type: TabType;
	fileTransform: FileTransform;
	comparerConfig: ComparerConfig;
};

export type ViewerState = {
	lastSwcVersion: string;
	activeTabId: number | null;
	tabs: TabState[];
};

export enum ViewerAction {
	AddTab,
	DeleteTab,
	ActivateTab,
	UpdateTabType,
	UpdateFileTransform,
	UpdateBabelVersion,
	UpdateSwcVersion,
	UpdateSwcConfig,
}

export type ViewerActionType =
	| {
			type: ViewerAction.AddTab;
	  }
	| {
			type: ViewerAction.DeleteTab;
			payload: number;
	  }
	| {
			type: ViewerAction.ActivateTab;
			payload: number;
	  }
	| {
			type: ViewerAction.UpdateTabType;
			payload: {
				tabId: number;
				type: TabType;
			};
	  }
	| {
			type: ViewerAction.UpdateFileTransform;
			payload: {
				tabId: number;
				fileTransform: FileTransform;
			};
	  }
	| {
			type: ViewerAction.UpdateBabelVersion;
			payload: {
				tabId: number;
				version: string;
			};
	  }
	| {
			type: ViewerAction.UpdateSwcVersion;
			payload: {
				tabId: number;
				version: string;
			};
	  }
	| {
			type: ViewerAction.UpdateSwcConfig;
			payload: {
				tabId: number;
				config: TranspilerConfig<SwcConfig>;
			};
	  };

type ViewerReducer = (
	state: ViewerState,
	action: ViewerActionType
) => ViewerState;

export const viewerReducer: ViewerReducer = (state, action) => {
	switch (action.type) {
		case ViewerAction.AddTab: {
			const tabId =
				state.tabs.length === 0 ? 1 : state.tabs[state.tabs.length - 1].id + 1;

			return {
				...state,
				activeTabId: tabId,
				tabs: [
					...state.tabs,
					{
						id: tabId,
						type: TabType.SwcBabelPluginComparer,
						fileTransform: {
							name: `Untitled-${tabId}`,
							path: `Untitled-${tabId}`,
							code: '',
						},
						comparerConfig: {
							swc: {
								version: state.lastSwcVersion,
								config: swcBaseConfig,
							},
							babel: {
								version: '',
								config: babelBaseConfig,
							},
						},
					},
				],
			};
		}
		case ViewerAction.DeleteTab: {
			const newTabs = state.tabs.filter(({ id }) => id !== action.payload);
			const newActiveTab =
				newTabs.length === 0
					? null
					: state.activeTabId === action.payload
					? newTabs[newTabs.length - 1].id
					: state.activeTabId;
			return {
				...state,
				activeTabId: newActiveTab,
				tabs: newTabs,
			};
		}
		case ViewerAction.ActivateTab:
			if (!state.tabs.some(({ id }) => id === action.payload)) return state;
			return {
				...state,
				activeTabId: action.payload,
			};
		case ViewerAction.UpdateTabType: {
			return {
				...state,
				tabs: state.tabs.map((tab) =>
					tab.id === action.payload.tabId
						? { ...tab, type: action.payload.type }
						: tab
				),
			};
		}
		case ViewerAction.UpdateFileTransform: {
			return {
				...state,
				tabs: state.tabs.map((tab) =>
					tab.id === action.payload.tabId
						? { ...tab, fileTransform: action.payload.fileTransform }
						: tab
				),
			};
		}
		case ViewerAction.UpdateBabelVersion: {
			return {
				...state,
				tabs: state.tabs.map((tab) =>
					tab.id === action.payload.tabId
						? {
								...tab,
								comparerConfig: {
									...tab.comparerConfig,
									babel: {
										...tab.comparerConfig.babel,
										version: action.payload.version,
									},
								},
						  }
						: tab
				),
			};
		}
		case ViewerAction.UpdateSwcConfig: {
			return {
				...state,
				tabs: state.tabs.map((tab) =>
					tab.id === action.payload.tabId
						? {
								...tab,
								comparerConfig: {
									...tab.comparerConfig,
									swc: action.payload.config,
								},
						  }
						: tab
				),
			};
		}
		case ViewerAction.UpdateSwcVersion: {
			return {
				...state,
				tabs: state.tabs.map((tab) =>
					tab.id === action.payload.tabId
						? {
								...tab,
								comparerConfig: {
									...tab.comparerConfig,
									swc: {
										...tab.comparerConfig.swc,
										version: action.payload.version,
									},
								},
						  }
						: tab
				),
			};
		}
		default:
			return state;
	}
};
