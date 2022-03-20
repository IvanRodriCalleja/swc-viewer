import type { IpcRenderer } from 'electron';

export type Electron = {
	ipcRenderer: IpcRenderer;
};

declare global {
	interface Window {
		electron: Electron;
	}
}
