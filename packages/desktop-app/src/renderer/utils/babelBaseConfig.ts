import { BabelConfig } from '../../models/BabelConfig';

export const babelBaseConfig: BabelConfig = {
	babelrc: false,
	configFile: false,
	ast: false,
	presets: ['@babel/preset-react'],
};
