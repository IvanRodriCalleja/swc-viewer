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
	const { versionsCount = 5 } = search;
	return useQuery(
		[resourceKey, search.packageName],
		() => fetchNpmPackageVersions(search),
		{
			...options,
			staleTime: Infinity,
			cacheTime: Infinity,
			select: (versions) => versions.slice(0, versionsCount),
		}
	);
};

export const prefetchNpmPackageVersions = (search: UseNpmPackageVersions) =>
	queryClient.prefetchQuery(
		[resourceKey, search],
		() => fetchNpmPackageVersions(search),
		{
			staleTime: Infinity,
			cacheTime: Infinity,
		}
	);
