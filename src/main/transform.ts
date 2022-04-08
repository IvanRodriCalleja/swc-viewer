import { ipcMain } from 'electron';
import {
	transformBabel as transformBabelAction,
	transformSwc as transformSwcAction,
} from '../ipcActions';
import { transformBabel } from './transform/babel';
import { transformSwc } from './transform/swc';

export const setUpTransformActions = () => {
	ipcMain.handle(transformSwcAction, async (_, args) => {
		return transformSwc(args);
	});

	ipcMain.handle(transformBabelAction, async (_, args) => {
		return transformBabel(args);
	});
};
