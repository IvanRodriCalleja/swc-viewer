import {
	AST,
	ParserOptions,
	SwcConfig,
	TransformationOutput,
} from './SwcConfig';

export interface SwcModule {
	version: string;
	default(): Promise<unknown>;
	parseSync(code: string, options: ParserOptions): AST;
	transform(code: string, options: SwcConfig): Promise<TransformationOutput>;
	transformSync(code: string, options: SwcConfig): TransformationOutput;
}
