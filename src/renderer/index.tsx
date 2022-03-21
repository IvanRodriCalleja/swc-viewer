import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { SwcViewerApp } from './SwcViewerApp';

import './styles/global.css';

const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
};

const theme = extendTheme({ config });

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
	<>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<SwcViewerApp />
		</ChakraProvider>
	</>
);
