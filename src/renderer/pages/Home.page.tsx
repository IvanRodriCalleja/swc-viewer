import { ViewerProvider } from './home/ViewerContext';

export const HomePage = () => {
	return (
		<ViewerProvider>
			<div>Page</div>
		</ViewerProvider>
	);
};
