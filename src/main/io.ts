import { BrowserWindow, ipcMain } from 'electron';
import chokidar from 'chokidar';
import { existsSync } from 'fs';
import { newFileVersion, watchFiles } from '../ipcActions';

let watcher: chokidar.FSWatcher;

export const setupFileWatcher = (mainWindow: BrowserWindow) => {
	ipcMain.on(watchFiles, (_, filePaths: string[]) => {
		const existingPaths = filePaths.filter((fillePath) =>
			existsSync(fillePath)
		);

		if (existingPaths.length === 0) return;

		if (!watcher) {
			watcher = chokidar.watch(existingPaths, { binaryInterval: 300 });
			watcher.on('change', (file) => {
				mainWindow.webContents.send(newFileVersion, { file });
			});
		} else {
			watcher.add(filePaths);
		}
	});

	ipcMain.on('unwatch-file', (_, filePath) => {
		watcher.unwatch(filePath);
	});
};
