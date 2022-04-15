import { babelPackageName } from '../../../../packages';
import { useNpmPackageVersions } from '../../../server-resources/useNpmPackageVersions';

export const useGetLastBabelVersion = () => {
	const versions = useNpmPackageVersions({
		packageName: babelPackageName,
		versionsCount: 1,
	});

	const data = versions.data as string[];

	return data[0] as string;
};
