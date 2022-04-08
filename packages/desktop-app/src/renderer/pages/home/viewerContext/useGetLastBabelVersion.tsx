import { useNpmPackageVersions } from 'renderer/server-resources/useNpmPackageVersions';

export const useGetLastBabelVersion = () => {
	const versions = useNpmPackageVersions({
		packageName: '@babel/standalone',
		versionsCount: 1,
	});

	const data = versions.data as string[];

	return data[0] as string;
};
