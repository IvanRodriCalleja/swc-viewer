import { newFileVersion, watchFiles } from 'ipcActions';
import { useEffect } from 'react';

type UseWatch = {
	filePaths: string[];
	onChange: () => void;
};

export const useWatchFileChange = ({ filePaths, onChange }: UseWatch) => {
	useEffect(() => {
		window.electron.ipcRenderer.send(watchFiles, filePaths);

		const onNewFileVersion = () => {
			onChange();
		};

		window.electron.ipcRenderer.on(newFileVersion, onNewFileVersion);

		return () => {
			window.electron.ipcRenderer.removeListener(
				newFileVersion,
				onNewFileVersion
			);
		};
	}, [filePaths, onChange]);
};
