import { useColorModeValue, Box } from '@chakra-ui/react';
import { toggleMaximization } from '../../../ipcActions';

export const TopDraggableAppBar = () => {
	const bg = useColorModeValue('gray.100', 'gray.900');

	const onToggleMaximization = () => {
		window.electron.ipcRenderer.send(toggleMaximization);
	};

	return (
		<Box
			h="40px"
			w="100%"
			position="fixed"
			bg={bg}
			id="app-top-bar"
			data-testid="app-top-bar"
			onDoubleClick={onToggleMaximization}
		/>
	);
};
