global.electron = {
	ipcRenderer: {
		on: jest.fn(),
		once: jest.fn(),
		postMessage: jest.fn(),
		removeAllListeners: jest.fn(),
		removeListener: jest.fn(),
		send: jest.fn(),
		sendSync: jest.fn(),
		sendTo: jest.fn(),
		sendToHost: jest.fn(),
	},
};
