import { QueryClient } from 'react-query';
import { fetchNpmPackageVersions } from '../../../services/fetchNpmPackageVersions';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

export const getPackageLastVersion = async (
	packageName: string
): Promise<string> => {
	const cachedData = queryClient.getQueryData<string[]>(packageName);
	if (cachedData) {
		return cachedData[0];
	}

	await queryClient.prefetchQuery(packageName, () =>
		fetchNpmPackageVersions({ packageName })
	);
	const versions = queryClient.getQueryData<string[]>(packageName) as string[];

	return versions[0];
};
