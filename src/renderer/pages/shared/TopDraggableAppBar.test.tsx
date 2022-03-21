import { fireEvent, render } from '@testing-library/react';
import { toggleMaximization } from '../../../ipcActions';
import { TopDraggableAppBar } from './TopDraggableAppBar';

describe('TopDraggableAppBar', () => {
	it('should render', () => {
		const { getByTestId } = render(<TopDraggableAppBar />);

		const topBar = getByTestId('app-top-bar');
		expect(topBar.children).toHaveLength(0);
	});

	it('Should handle maximization', () => {
		const { getByTestId } = render(<TopDraggableAppBar />);

		const topBar = getByTestId('app-top-bar');
		fireEvent.doubleClick(topBar);

		expect(window.electron.ipcRenderer.send).toHaveBeenCalledTimes(1);
		expect(window.electron.ipcRenderer.send).toHaveBeenCalledWith(
			toggleMaximization
		);
	});
});
