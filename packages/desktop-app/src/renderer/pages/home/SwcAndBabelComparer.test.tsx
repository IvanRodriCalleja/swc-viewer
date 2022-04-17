import { fireEvent, render } from '@testing-library/react';
import { babelBaseConfig } from 'renderer/utils/babelBaseConfig';
import { swcBaseConfig } from 'renderer/utils/swcBaseConfig';
import { SwcAndBabelComparer } from './SwcAndBabelComparer';
import {
	OutputType,
	TabState,
	TabType,
	ViewerAction,
} from './viewerContext/viewerContextReducer';
import * as viewerContext from './ViewerContext';
import { FileUploaderProps } from './swcAndBabelComparer/FileUploader';
import * as uploader from './swcAndBabelComparer/FileUploader';

const tab: TabState = {
	id: 1,
	type: TabType.SwcBabelPluginComparer,
	outputType: OutputType.Code,
	fileTransform: {
		name: `Untitled-0`,
		path: `Untitled-0`,
		code: '',
	},
	comparerConfig: {
		babel: {
			version: '1.1.1',
			config: babelBaseConfig,
		},
		swc: {
			version: '1.1.1',
			config: swcBaseConfig,
		},
	},
};

const MockFileUploader = ({ onFileUpload }: FileUploaderProps) => {
	const onClick = () => {
		const event = {
			target: {
				result: 'fake-result',
			},
		};

		const fakeFile = new File(['const a = null;'], 'test.js', {
			type: 'text/javascript',
		});

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		onFileUpload(event, fakeFile);
	};

	return (
		<button
			type="button"
			data-testid="file-upload-fake-change"
			onClick={onClick}
		>
			change
		</button>
	);
};

describe('SwcAndBabelComparer', () => {
	it('Should render File uploader when no file uploaded', () => {
		const { getByTestId } = render(<SwcAndBabelComparer tab={tab} />);
		const fileUploader = getByTestId('file-uploader');

		expect(fileUploader).toBeTruthy();
	});

	it.skip('Should render transformer when file is uploaded', () => {
		const tabWithFile: TabState = {
			...tab,
			fileTransform: {
				code: 'fake-code',
				name: 'fake-name',
				path: 'fake-path',
			},
		};
		const { getByTestId } = render(<SwcAndBabelComparer tab={tabWithFile} />);
		const transformer = getByTestId('transformer');

		expect(transformer).toBeTruthy();
	});

	it('Should dispatch fileTransform correctly', () => {
		jest.spyOn(uploader, 'FileUploader').mockImplementation(MockFileUploader);

		const contextMock = jest
			.spyOn(viewerContext, 'useViewerContext')
			.mockImplementation(() => ({
				dispatch: jest.fn(),
				state: {
					lastSwcVersion: '1.1.1',
					lastBabelVersion: '1.1.1',
					activeTabId: 1,
					tabs: [],
				},
			}));

		const { getByTestId } = render(<SwcAndBabelComparer tab={tab} />);
		const mockedChange = getByTestId('file-upload-fake-change');
		fireEvent.click(mockedChange);

		const { dispatch } = contextMock.mock.results[0]
			.value as viewerContext.ViewerContextValue;
		expect(dispatch).toHaveBeenCalledWith({
			type: ViewerAction.UpdateFileTransform,
			payload: {
				fileTransform: {
					code: 'fake-result',
					name: 'test.js',
					path: undefined,
				},
				tabId: 1,
			},
		});
	});
});
