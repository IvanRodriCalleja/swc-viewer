import { SwcConfig } from 'models/SwcConfig';

export const swcBaseConfig: SwcConfig = {
	sourceMaps: false,
	jsc: {
		parser: {
			syntax: 'ecmascript',
		},
		target: 'es2022',
	},
};
