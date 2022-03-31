import { SwcConfig } from 'models/SwcConfig';
import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';

import {
	ViewerState,
	viewerReducer,
	TabType,
	TabState,
	ViewerActionType,
	ViewerAction,
	TranspilerConfig,
} from './viewerContextReducer';

const baseTab: TabState = {
	id: 1,
	type: TabType.SwcBabelPluginComparer,
	fileTransform: {
		path: '',
		name: '',
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

describe('viewerContextReducer', () => {
	describe('AddTab action', () => {
		const action: ViewerActionType = { type: ViewerAction.AddTab };
		it('Should add tab', () => {
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab],
			};

			const newState = viewerReducer(initialState, action);
			const newTab = newState.tabs[1];

			expect(newTab).toEqual({
				id: 2,
				type: TabType.SwcBabelPluginComparer,
				fileTransform: {
					path: 'Untitled-2',
					name: 'Untitled-2',
					code: '',
				},
				comparerConfig: {
					babel: {
						version: '',
						config: babelBaseConfig,
					},
					swc: {
						version: '1.2.3',
						config: swcBaseConfig,
					},
				},
			});
		});

		it('Should add tab when no tabs exist', () => {
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: null,
				tabs: [],
			};

			const newState = viewerReducer(initialState, action);
			const newTab = newState.tabs[0];

			expect(newTab).toEqual({
				id: 1,
				type: TabType.SwcBabelPluginComparer,
				fileTransform: {
					path: 'Untitled-1',
					name: 'Untitled-1',
					code: '',
				},
				comparerConfig: {
					babel: {
						version: '',
						config: babelBaseConfig,
					},
					swc: {
						version: '1.2.3',
						config: swcBaseConfig,
					},
				},
			});
		});

		it('Should add tab when multiple tabs exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };

			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: null,
				tabs: [baseTab, secondBaseTab],
			};

			const newState = viewerReducer(initialState, action);
			const newTab = newState.tabs[2];

			expect(newTab).toEqual({
				id: 3,
				type: TabType.SwcBabelPluginComparer,
				fileTransform: {
					path: 'Untitled-3',
					name: 'Untitled-3',
					code: '',
				},
				comparerConfig: {
					babel: {
						version: '',
						config: babelBaseConfig,
					},
					swc: {
						version: '1.2.3',
						config: swcBaseConfig,
					},
				},
			});
		});
	});

	describe('DeleteTab action', () => {
		it('Should delete tab when only exist', () => {
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: null,
				tabs: [baseTab],
			};

			const tabIdToRemove = 1;
			const action: ViewerActionType = {
				type: ViewerAction.DeleteTab,
				payload: tabIdToRemove,
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs).toEqual([]);
			expect(newState.activeTabId).toEqual(null);
		});

		it('Should delete tab type', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 2,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToRemove = 1;
			const action: ViewerActionType = {
				type: ViewerAction.DeleteTab,
				payload: tabIdToRemove,
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs).toEqual([
				{
					id: 2,
					type: TabType.SwcBabelPluginComparer,
					fileTransform: {
						path: '',
						name: '',
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
			]);
			expect(newState.activeTabId).toEqual(2);
		});

		it('Should delete selected tab type', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToRemove = 1;
			const action: ViewerActionType = {
				type: ViewerAction.DeleteTab,
				payload: tabIdToRemove,
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs).toEqual([
				{
					id: 2,
					type: TabType.SwcBabelPluginComparer,
					fileTransform: {
						path: '',
						name: '',
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
			]);
			expect(newState.activeTabId).toEqual(2);
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToRemove = 200;
			const action: ViewerActionType = {
				type: ViewerAction.DeleteTab,
				payload: tabIdToRemove,
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('ActivateTab action', () => {
		it('Should update activated tab', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToActivate = 2;
			const action: ViewerActionType = {
				type: ViewerAction.ActivateTab,
				payload: tabIdToActivate,
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.activeTabId).toEqual(2);
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToActivate = 200;
			const action: ViewerActionType = {
				type: ViewerAction.ActivateTab,
				payload: tabIdToActivate,
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.activeTabId).toEqual(1);
		});
	});

	describe('UpdateTabType action', () => {
		it('Should update tab type', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToUpdate = 1;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateTabType,
				payload: {
					tabId: tabIdToUpdate,
					type: TabType.SwcBabelPluginComparer,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].type).toEqual(TabType.SwcBabelPluginComparer);
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToUpdate = 200;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateTabType,
				payload: {
					tabId: tabIdToUpdate,
					type: TabType.SwcBabelPluginComparer,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('UpdateFileTransform action', () => {
		it('Should update tab babel version', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const fileTransform = {
				code: 'test-code',
				name: 'test-name',
				path: 'test-path',
			};

			const tabIdToUpdate = 1;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateFileTransform,
				payload: {
					tabId: tabIdToUpdate,
					fileTransform,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].fileTransform).toEqual(fileTransform);
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const fileTransform = {
				code: 'test-code',
				name: 'test-name',
				path: 'test-path',
			};

			const tabIdToUpdate = 200;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateFileTransform,
				payload: {
					tabId: tabIdToUpdate,
					fileTransform,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('UpdateBabelVersion action', () => {
		it('Should update tab file transform', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToUpdate = 1;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateBabelVersion,
				payload: {
					tabId: tabIdToUpdate,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].comparerConfig.babel.version).toEqual('1.1.1');
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToUpdate = 200;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateBabelVersion,
				payload: {
					tabId: tabIdToUpdate,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('UpdateSwcVersion action', () => {
		it('Should update tab swc version', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToUpdate = 1;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateSwcVersion,
				payload: {
					tabId: tabIdToUpdate,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].comparerConfig.swc.version).toEqual('1.1.1');
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToUpdate = 200;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateSwcVersion,
				payload: {
					tabId: tabIdToUpdate,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('UpdateSwcConfig action', () => {
		it('Should update tab swc version', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const updateConfig: TranspilerConfig<SwcConfig> = {
				version: '1.1.1',
				config: {
					jsc: {
						parser: {
							syntax: 'ecmascript',
						},
					},
				},
			};

			const tabIdToUpdate = 1;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateSwcConfig,
				payload: {
					tabId: tabIdToUpdate,
					config: updateConfig,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].comparerConfig.swc).toEqual(updateConfig);
		});

		it('Should not update state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				lastSwcVersion: '1.2.3',
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const updateConfig: TranspilerConfig<SwcConfig> = {
				version: '1.1.1',
				config: {
					jsc: {
						parser: {
							syntax: 'ecmascript',
						},
					},
				},
			};

			const tabIdToUpdate = 200;
			const action: ViewerActionType = {
				type: ViewerAction.UpdateSwcConfig,
				payload: {
					tabId: tabIdToUpdate,
					config: updateConfig,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});
});
