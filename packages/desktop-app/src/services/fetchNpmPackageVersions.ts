import fetch from 'node-fetch';

type UnpkgSearchResponse = {
	versions: {
		[key: string]: unknown;
	};
};

type FetchNpmPackageVersions = {
	packageName: string;
};

export const fetchNpmPackageVersions = ({
	packageName,
}: FetchNpmPackageVersions) =>
	new Promise<string[]>((resolve, reject) =>
		fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}`)
			.then((response) => {
				if (!response.ok) {
					reject();
				}

				return response.json();
			})
			.then((npmPackage: UnpkgSearchResponse) => {
				const versionsArr = Object.keys(npmPackage.versions);
				const versions = versionsArr.map((version) => version).reverse();
				resolve(versions);
				return versions;
			})
			.catch((error) => reject(error))
	);
