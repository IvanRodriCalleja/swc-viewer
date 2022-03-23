import { TabState } from './viewerContext/viewerContextReducer';

type SwcAndBabelComparerProps = {
	tab: TabState;
};

export const SwcAndBabelComparer = ({ tab }: SwcAndBabelComparerProps) => (
	<div data-testid="swc-and-babel-comparer">{JSON.stringify(tab, null, 2)}</div>
);
