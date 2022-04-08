import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { SwcViewerApp } from './SwcViewerApp';

describe('SwcViewerApp', () => {
	it('should render', () => {
		expect(render(<SwcViewerApp />)).toBeTruthy();
	});
});
