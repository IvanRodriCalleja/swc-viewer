type UnpkgSearchResponse = {
	versions: {
		[key: string]: {
			version: string;
		};
	};
};

type FetchNpmPackageVersions = {
	packageName: string;
};

export const fetchNpmPackageVersions = ({
	packageName,
}: FetchNpmPackageVersions) =>
	new Promise<string[]>((resolve, reject) =>
		fetch(
			`https://www.unpkgsearch.com/package/${encodeURIComponent(
				packageName
			)}?_data=routes%2Fpackage%2F%24name`
		)
			.then((response) => {
				if (!response.ok) {
					reject();
				}

				return response.json();
			})
			.then((npmPackage: UnpkgSearchResponse) => {
				const versionsArr = Object.values(npmPackage.versions);
				const versions = versionsArr.map(({ version }) => version).reverse();
				resolve(versions);
				return versions;
			})
			.catch((error) => reject(error))
	);
