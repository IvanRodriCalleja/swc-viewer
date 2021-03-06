import { createRoot } from 'react-dom/client';
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react';
import { Suspense } from 'react';
import { SwcViewerApp } from './SwcViewerApp';

import './styles/global.css';
import { ViewerProvider } from './pages/home/ViewerContext';
import { prefetchNpmPackageVersions } from './server-resources/useNpmPackageVersions';
import { QueryCache } from './server-resources/QueryCache';
import { babelPackageName } from '../packages';

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
			<QueryCache>
				<Suspense fallback={<div />}>
					<ViewerProvider>
						<SwcViewerApp />
					</ViewerProvider>
				</Suspense>
			</QueryCache>
		</ChakraProvider>
	</>
);

prefetchNpmPackageVersions({ packageName: babelPackageName });
prefetchNpmPackageVersions({ packageName: '@swc/core' });
