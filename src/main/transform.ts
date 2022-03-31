import { ipcMain } from 'electron';
import { transformBabel } from './transform/babel';
import { transformSwc } from './transform/swc';

export const setUpTransformActions = () => {
	ipcMain.handle('transform-swc', async (_, args) => {
		return transformSwc(args);
	});

	ipcMain.handle('transform-babel', async (_, args) => {
		return transformBabel(args);
	});
};
