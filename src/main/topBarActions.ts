import { BrowserWindow, ipcMain } from 'electron';
import { toggleMaximization } from 'ipcActions';

export const setUpTopBarActions = (mainWindow: BrowserWindow) => {
	ipcMain.on(toggleMaximization, () => {
		if (mainWindow.isMaximized()) {
			mainWindow.unmaximize();
		} else {
			mainWindow.maximize();
		}
	});
};
