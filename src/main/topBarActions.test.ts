import { BrowserWindow, ipcRenderer, ipcMain } from 'electron';
import { toggleMaximization } from 'ipcActions';
import { setUpTopBarActions } from './topBarActions';

let isMaximized = false;
const mainWindow = new BrowserWindow();
mainWindow.unmaximize = jest.fn(() => {
	isMaximized = false;
});

mainWindow.maximize = jest.fn(() => {
	isMaximized = true;
});

mainWindow.isMaximized = jest.fn(() => isMaximized);

describe('topBarActions', () => {
	beforeEach(() => {
		ipcMain.removeAllListeners();
	});

	it('Should maximize app window', () => {
		isMaximized = false;
		setUpTopBarActions(mainWindow);

		ipcRenderer.send(toggleMaximization);
		expect(mainWindow.maximize).toHaveBeenCalled();
	});

	it('Should unmaximize app window', () => {
		isMaximized = true;
		setUpTopBarActions(mainWindow);

		ipcRenderer.send(toggleMaximization);
		expect(mainWindow.unmaximize).toHaveBeenCalled();
	});
});
