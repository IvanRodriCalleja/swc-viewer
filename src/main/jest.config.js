module.exports = {
	name: 'main',
	displayName: 'Main Tests',
	testURL: 'http://localhost/',
	testEnvironment: 'node',
	transform: {
		'\\.(ts|js)$': 'ts-jest',
	},
	moduleFileExtensions: ['js', 'ts', 'json'],
	moduleDirectories: ['node_modules', 'release/app/node_modules'],
	testPathIgnorePatterns: ['release/app/dist'],
	setupFiles: ['../../.erb/scripts/check-build-exists.ts'],
	roots: ['<rootDir>'],
	moduleNameMapper: {
		electron: '<rootDir>/test-utils/electron.ts',
	},
};
