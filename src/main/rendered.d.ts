import type { IpcRenderer } from 'electron';

export type Electron = {
	ipcRenderer: IpcRenderer;
};

declare global {
	const electron: Electron;
	interface Window {
		electron: Electron;
	}
}
