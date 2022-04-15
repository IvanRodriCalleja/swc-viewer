import { SwcConfig } from '../../models/SwcConfig';

export const swcBaseConfig: SwcConfig = {
	sourceMaps: false,
	jsc: {
		parser: {
			syntax: 'ecmascript',
			jsx: true,
		},
		target: 'es2022',
	},
};
