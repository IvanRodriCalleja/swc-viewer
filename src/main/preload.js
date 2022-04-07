const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	ipcRenderer: {
		invoke: ipcRenderer.invoke,
		send: ipcRenderer.send,
		removeListener: ipcRenderer.removeListener,
		on: (channel, fn) => {
			ipcRenderer.on(channel, fn);
		},
	},
});
