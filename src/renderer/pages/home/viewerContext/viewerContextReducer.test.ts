import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';
import {
	ViewerState,
	viewerReducer,
	TabType,
	TabState,
	ViewerActionType,
	ViewerAction,
} from './viewerContextReducer';

const baseTab: TabState = {
	id: 1,
	type: TabType.Initial,
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
				activeTabId: 1,
				tabs: [baseTab],
			};

			const newState = viewerReducer(initialState, action);
			const newTab = newState.tabs[1];

			expect(newTab).toEqual({
				id: 2,
				type: TabType.Initial,
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
						version: '',
						config: swcBaseConfig,
					},
				},
			});
		});

		it('Should add tab when no tabs exist', () => {
			const initialState: ViewerState = {
				activeTabId: null,
				tabs: [],
			};

			const newState = viewerReducer(initialState, action);
			const newTab = newState.tabs[0];

			expect(newTab).toEqual({
				id: 1,
				type: TabType.Initial,
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
						version: '',
						config: swcBaseConfig,
					},
				},
			});
		});

		it('Should add tab when multiple tabs exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };

			const initialState: ViewerState = {
				activeTabId: null,
				tabs: [baseTab, secondBaseTab],
			};

			const newState = viewerReducer(initialState, action);
			const newTab = newState.tabs[2];

			expect(newTab).toEqual({
				id: 3,
				type: TabType.Initial,
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
						version: '',
						config: swcBaseConfig,
					},
				},
			});
		});
	});

	describe('DeleteTab action', () => {
		it('Should delete tab when only exist', () => {
			const initialState: ViewerState = {
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
					type: TabType.Initial,
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
					type: TabType.Initial,
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

		it('Should not change state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
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
		it('Should change activated tab', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
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

		it('Should not change state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
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

	describe('ChangeTabType action', () => {
		it('Should change tab type', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToChange = 1;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeTabType,
				payload: {
					tabId: tabIdToChange,
					type: TabType.SwcBabelPluginComparer,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].type).toEqual(TabType.SwcBabelPluginComparer);
		});

		it('Should not change state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToChange = 200;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeTabType,
				payload: {
					tabId: tabIdToChange,
					type: TabType.SwcBabelPluginComparer,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('ChangeFileTransform action', () => {
		it('Should change tab babel version', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const fileTransform = {
				code: 'test-code',
				name: 'test-name',
				path: 'test-path',
			};

			const tabIdToChange = 1;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeFileTransform,
				payload: {
					tabId: tabIdToChange,
					fileTransform,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].fileTransform).toEqual(fileTransform);
		});

		it('Should not change state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const fileTransform = {
				code: 'test-code',
				name: 'test-name',
				path: 'test-path',
			};

			const tabIdToChange = 200;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeFileTransform,
				payload: {
					tabId: tabIdToChange,
					fileTransform,
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('ChangeBabelVersion action', () => {
		it('Should change tab file transform', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToChange = 1;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeBabelVersion,
				payload: {
					tabId: tabIdToChange,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].comparerConfig.babel.version).toEqual('1.1.1');
		});

		it('Should not change state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToChange = 200;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeBabelVersion,
				payload: {
					tabId: tabIdToChange,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});

	describe('ChangeSwcVersion action', () => {
		it('Should change tab swc version', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToChange = 1;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeSwcVersion,
				payload: {
					tabId: tabIdToChange,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState.tabs[0].comparerConfig.swc.version).toEqual('1.1.1');
		});

		it('Should not change state when tab id does not exist', () => {
			const secondBaseTab = { ...baseTab, id: 2 };
			const initialState: ViewerState = {
				activeTabId: 1,
				tabs: [baseTab, secondBaseTab],
			};

			const tabIdToChange = 200;
			const action: ViewerActionType = {
				type: ViewerAction.ChangeSwcVersion,
				payload: {
					tabId: tabIdToChange,
					version: '1.1.1',
				},
			};

			const newState = viewerReducer(initialState, action);
			expect(newState).toEqual(initialState);
		});
	});
});
