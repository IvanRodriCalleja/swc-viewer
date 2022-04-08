import { fireEvent, render } from '@testing-library/react';
import { FileUploader } from './FileUploader';

const fakeOnFileUpload = jest.fn();

const pauseFor = (milliseconds: number) =>
	new Promise((resolve) => setTimeout(resolve, milliseconds));

describe('FileUploader', () => {
	afterEach(() => jest.resetAllMocks());
	it('Should render file updater', () => {
		const { getByText } = render(
			<FileUploader onFileUpload={fakeOnFileUpload} />
		);
		const text = getByText('Drag and drop', { exact: false });

		expect(text).toBeTruthy();
	});

	it('Should read change when input file change when input type is valid', async () => {
		const { getByTestId } = render(
			<FileUploader onFileUpload={fakeOnFileUpload} />
		);
		const file = new File(['const a = null;'], 'test.js', {
			type: 'text/javascript',
		});
		const imageFile = getByTestId('upload-file');
		fireEvent.change(imageFile, { target: { files: [file] } });

		await pauseFor(1000);
		expect(fakeOnFileUpload).toHaveBeenCalled();
	});

	it('Should not read change when input file change when input type is invalid', async () => {
		const { getByTestId } = render(
			<FileUploader onFileUpload={fakeOnFileUpload} />
		);
		const file = new File(['const a = null;'], 'test.txt', {
			type: 'text',
		});
		const imageFile = getByTestId('upload-file');
		fireEvent.change(imageFile, { target: { files: [file] } });

		await pauseFor(1000);
		expect(fakeOnFileUpload).not.toHaveBeenCalled();
	});
});
