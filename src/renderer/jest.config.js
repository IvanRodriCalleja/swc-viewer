module.exports = {
	name: 'renderer',
	displayName: 'Renderer Tests',
	testURL: 'http://localhost/',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	transform: {
		'\\.(ts|tsx|js|jsx)$': 'ts-jest',
	},
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/.erb/mocks/fileMock.js',
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'^renderer/(.*)': '<rootDir>/$1',
		'^ipcActions$': '<rootDir>/../ipcActions.ts',
	},
	moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
	moduleDirectories: ['node_modules', 'release/app/node_modules'],
	testPathIgnorePatterns: ['release/app/dist'],
	setupFiles: ['../../.erb/scripts/check-build-exists.ts'],
	roots: ['<rootDir>'],
};
