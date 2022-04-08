import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});

export const QueryCache: FC<unknown> = ({ children }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
