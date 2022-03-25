import { useQuery, UseQueryOptions } from 'react-query';
import { fetchNpmPackageVersions } from 'services/fetchNpmPackageVersions';
import { queryClient } from './QueryCache';

const resourceKey = 'npm-package';

type UseNpmPackageVersions = {
	packageName: string;
	versionsCount?: number;
};

export const useNpmPackageVersions = (
	search: UseNpmPackageVersions,
	options?: UseQueryOptions<string[], unknown, string[], any>
) => {
	return useQuery(
		[resourceKey, search],
		() => fetchNpmPackageVersions(search),
		{ ...options, staleTime: Infinity, cacheTime: Infinity }
	);
};

export const prefetchNpmPackageVersions = (search: UseNpmPackageVersions) =>
	queryClient.prefetchQuery(
		[resourceKey, search],
		() => fetchNpmPackageVersions(search),
		{ staleTime: Infinity, cacheTime: Infinity }
	);
