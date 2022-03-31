import { ipcMain } from 'electron';
import { transformSwc } from './transform/swc';

export const setUpTransformActions = () => {
	ipcMain.handle('transpile-swc', async (_, args) => {
		return transformSwc(args);
	});
};
