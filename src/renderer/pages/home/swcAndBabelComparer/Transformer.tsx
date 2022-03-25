import { TabState } from '../viewerContext/viewerContextReducer';

type TransformerProps = {
	tab: TabState;
};

export const Transformer = ({ tab }: TransformerProps) => (
	<div data-testid="transformer">{JSON.stringify(tab, null, 2)}</div>
);
