import type { IpcRendererEvent } from 'electron';

export type Electron = {
	ipcRenderer: {
		invoke(channel: string, ...args: any[]): Promise<any>;
		on(
			channel: string,
			listener: (event: IpcRendererEvent, ...args: any[]) => void
		): this;
		removeListener(channel: string, listener: (...args: any[]) => void): this;
		send(channel: string, ...args: any[]): void;
	};
};

declare global {
	interface Window {
		electron: Electron;
	}
}
