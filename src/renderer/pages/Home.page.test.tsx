import { fireEvent, render, within } from '@testing-library/react';
import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';
import { HomePage } from './Home.page';
import * as viewerContext from './home/ViewerContext';
import {
	TabState,
	TabType,
	ViewerAction,
	ViewerState,
} from './home/viewerContext/viewerContextReducer';

const createFakeTabs = (count: number): TabState[] =>
	[...Array(count)].map((_, index) => ({
		id: index,
		type: TabType.SwcBabelPluginComparer,
		fileTransform: {
			name: `Untitled-${index}`,
			path: `Untitled-${index}`,
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
	}));

const mockViewerContext = (state: ViewerState) =>
	jest.spyOn(viewerContext, 'useViewerContext').mockImplementation(() => ({
		dispatch: jest.fn(),
		state,
	}));

describe('Home page', () => {
	describe('Tabs list', () => {
		afterEach(() => jest.resetAllMocks());
		it('Should render all tabs list', () => {
			const tabsToCreate = 5;
			const tabs = createFakeTabs(tabsToCreate);
			mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 1,
			});

			const { getAllByTestId } = render(<HomePage />);
			const tabElements = getAllByTestId('tab-', { exact: false });

			expect(tabElements.length).toBe(tabsToCreate);
		});

		it('Should render render tab as active', () => {
			const tabsToCreate = 5;
			const tabs = createFakeTabs(tabsToCreate);
			mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 1,
			});

			const { getByTestId } = render(<HomePage />);
			const activeTab = getByTestId('tab-1');
			const activeOuterBorder = within(activeTab).getByTestId(
				'activated-outer-right-border-radius'
			);

			expect(activeOuterBorder).not.toBeNull();
		});

		it('Should dispatch activate action', () => {
			const tabsToCreate = 5;
			const tabs = createFakeTabs(tabsToCreate);
			const contextMock = mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 0,
			});

			const { getByTestId } = render(<HomePage />);
			const tab = getByTestId('tab-3');
			fireEvent.click(tab);

			const { dispatch } = contextMock.mock.results[0]
				.value as viewerContext.ViewerContextValue;

			expect(dispatch).toHaveBeenCalledWith({
				type: ViewerAction.ActivateTab,
				payload: 3,
			});
		});

		it('Should render close tab when more than one tab exist', () => {
			const tabsToCreate = 5;
			const tabs = createFakeTabs(tabsToCreate);
			mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 1,
			});

			const { getAllByTestId } = render(<HomePage />);
			const closableTabs = getAllByTestId('close-button-tab');

			expect(closableTabs.length).toBe(5);
		});

		it('Should not render close tab when only one tab exist', () => {
			const tabsToCreate = 1;
			const tabs = createFakeTabs(tabsToCreate);
			mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 0,
			});

			const { queryAllByTestId } = render(<HomePage />);
			const closableTabs = queryAllByTestId('close-button-tab');

			expect(closableTabs.length).toBe(0);
		});

		it('Should dispatch close tab action', () => {
			const tabsToCreate = 5;
			const tabs = createFakeTabs(tabsToCreate);
			const contextMock = mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 0,
			});

			const { getByTestId } = render(<HomePage />);
			const tab = getByTestId('tab-3');
			const closeButton = within(tab).getByTestId('close-button-tab');
			fireEvent.click(closeButton);

			const { dispatch } = contextMock.mock.results[0]
				.value as viewerContext.ViewerContextValue;

			expect(dispatch).toHaveBeenCalledWith({
				type: ViewerAction.DeleteTab,
				payload: 3,
			});
		});

		it('Should render add tab button', () => {
			const tabsToCreate = 1;
			const tabs = createFakeTabs(tabsToCreate);
			mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 0,
			});

			const { getByTestId } = render(<HomePage />);
			const addTabButton = getByTestId('add-button-tab');

			expect(addTabButton).not.toBeNull();
		});

		it('Should dispatch add tab action', () => {
			const tabsToCreate = 1;
			const tabs = createFakeTabs(tabsToCreate);
			const contextMock = mockViewerContext({
				lastSwcVersion: '1.1.1',
				lastBabelVersion: '1.1.1',
				tabs,
				activeTabId: 0,
			});
			const { getByTestId } = render(<HomePage />);

			const addTabButton = getByTestId('add-button-tab');
			fireEvent.click(addTabButton);

			const { dispatch } = contextMock.mock.results[0]
				.value as viewerContext.ViewerContextValue;

			expect(dispatch).toHaveBeenCalledWith({ type: ViewerAction.AddTab });
		});
	});
});
