/* eslint-disable max-classes-per-file */
import EventEmitter from 'events';

export class BrowserWindow {}

class OnEmitter extends EventEmitter {}
const onEmitter = new OnEmitter();

export const ipcMain = {
	on: (key: string, callback: () => void) => onEmitter.on(key, callback),
	removeAllListeners: () => {
		onEmitter.removeAllListeners();
	},
};

export const ipcRenderer = {
	send: (key: string, args: unknown) => onEmitter.emit(key, args),
};
