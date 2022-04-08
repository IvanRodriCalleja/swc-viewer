import { AddTabButton } from './shared/tabs/AddTabButton';
import { Tabs } from './shared/Tabs';
import { TabList } from './shared/tabs/TabList';
import { Tab } from './shared/tabs/Tab';
import { TabPanel } from './shared/tabs/TabPanel';
import { useViewerContext } from './home/ViewerContext';
import {
	TabState,
	ViewerAction,
} from './home/viewerContext/viewerContextReducer';
import { SwcAndBabelComparer } from './home/SwcAndBabelComparer';

export type TabContentProps = {
	tab: TabState;
};

export const HomePage = () => {
	const { state, dispatch } = useViewerContext();
	const activeTab = state.tabs.find(
		(tab) => tab.id === state.activeTabId
	) as TabState;

	const onAddTab = () => dispatch({ type: ViewerAction.AddTab });
	const onDeleteTab = (id: number) =>
		dispatch({ type: ViewerAction.DeleteTab, payload: id });
	const onActivateTab = (id: number) =>
		dispatch({ type: ViewerAction.ActivateTab, payload: id });

	const canDelete = state.tabs.length > 1;

	return (
		<Tabs>
			<TabList fixedRightActions={<AddTabButton onAddTab={onAddTab} />}>
				{state.tabs.map((tab) => (
					<Tab
						key={tab.id}
						tabId={tab.id}
						title={tab.fileTransform.path}
						onDeleteTab={onDeleteTab}
						onActivateTab={onActivateTab}
						canDelete={canDelete}
						isActive={tab.id === state.activeTabId}
					>
						{tab.fileTransform.name}
					</Tab>
				))}
			</TabList>
			<TabPanel>
				<SwcAndBabelComparer tab={activeTab} />
			</TabPanel>
		</Tabs>
	);
};
