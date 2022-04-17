import { ipcMain } from 'electron';
import {
	OutputType,
	TransformerConfig,
} from '../renderer/pages/home/viewerContext/viewerContextReducer';
import {
	transformBabel as transformBabelAction,
	transformSwc as transformSwcAction,
} from '../ipcActions';
import { TransformBabel, transformBabel } from './transform/babel';
import { parseSwc, TransformSwc, transformSwc } from './transform/swc';
import { SwcConfig } from 'models/SwcConfig';

type TransformBabelArgs = TransformBabel & {
	swcTransformConfig: TransformerConfig<SwcConfig>;
};

export const setUpTransformActions = () => {
	ipcMain.handle(transformSwcAction, async (_, args: TransformSwc) => {
		const transformedCode = await transformSwc(args);

		if (args.outputType === OutputType.Code) {
			return transformedCode;
		}

		return parseSwc({
			transformedCode,
			transformConfig: args.transformConfig,
		});
	});

	ipcMain.handle(transformBabelAction, async (_, args: TransformBabelArgs) => {
		const transformedCode = await transformBabel(args);

		if (args.outputType === OutputType.Code) {
			return transformedCode;
		}

		return parseSwc({
			transformedCode,
			transformConfig: args.swcTransformConfig,
		});
	});
};
