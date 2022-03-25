type UnpkgSearchResponse = {
	versions: {
		[key: string]: {
			version: string;
		};
	};
};

type FetchNpmPackageVersions = {
	packageName: string;
	versionsCount?: number;
};

export const fetchNpmPackageVersions = ({
	packageName,
	versionsCount = 5,
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
				const versions = versionsArr
					.slice(Math.max(versionsArr.length - versionsCount, 1))
					.map(({ version }) => version)
					.reverse();
				resolve(versions);
				return versions;
			})
			.catch((error) => reject(error))
	);
