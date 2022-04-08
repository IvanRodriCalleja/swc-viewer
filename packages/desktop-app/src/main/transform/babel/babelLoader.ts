import { BabelModule } from '../../../models/BabelModule';
import {
	downloadPackage,
	isPackageDownloaded,
	loadPackage,
} from '../shared/packageManager';

const babelPackageName = '@babel/standalone';

const babelMemoryCache: { [version: string]: BabelModule } = {};

const loadBabel = async (version: string) => {
	if (!isPackageDownloaded({ packageName: babelPackageName, version })) {
		await downloadPackage({ packageName: babelPackageName, version });
	}

	const babel = await loadPackage<BabelModule>({
		packageName: babelPackageName,
		version,
	});
	babelMemoryCache[version] = babel;
};

export const getBabel = async (version: string) => {
	if (!babelMemoryCache[version]) {
		await loadBabel(version);
	}

	return babelMemoryCache[version];
};
