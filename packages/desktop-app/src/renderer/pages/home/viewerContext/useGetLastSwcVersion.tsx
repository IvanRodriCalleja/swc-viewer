import { useNpmPackageVersions } from 'renderer/server-resources/useNpmPackageVersions';

export const useGetLastSwcVersion = () => {
	const versions = useNpmPackageVersions({
		packageName: '@swc/core',
		versionsCount: 1,
	});

	const data = versions.data as string[];

	return data[0] as string;
};
