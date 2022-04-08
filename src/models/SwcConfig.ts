export type ParserOptions =
	| {
			syntax: 'ecmascript';
			jsx?: boolean;
			functionBind?: boolean;
			decorators?: boolean;
			decoratorsBeforeExport?: boolean;
			exportDefaultFrom?: boolean;
			importAssertions?: boolean;
			staticBlocks?: boolean;
			privateInObject?: boolean;
	  }
	| {
			syntax: 'typescript';
			tsx?: boolean;
			decorators?: boolean;
	  };

export type EsVersion =
	| 'es3'
	| 'es5'
	| 'es2015'
	| 'es2016'
	| 'es2017'
	| 'es2018'
	| 'es2019'
	| 'es2020'
	| 'es2021'
	| 'es2022';

export type ModuleOptions =
	| {
			type: 'es6';
			strict?: boolean;
			strictMode?: boolean;
			lazy?: boolean;
			noInterop?: boolean;
	  }
	| {
			type: 'commonjs';
			strict?: boolean;
			strictMode?: boolean;
			lazy?: boolean;
			noInterop?: boolean;
	  }
	| {
			type: 'amd';
			moduleId?: string;
			strict?: boolean;
			strictMode?: boolean;
			lazy?: boolean;
			noInterop?: boolean;
	  }
	| {
			type: 'umd';
			globals?: Record<string, string>;
			strict?: boolean;
			strictMode?: boolean;
			lazy?: boolean;
			noInterop?: boolean;
	  };

export interface CompressOptions {
	arguments?: boolean;
	arrows?: boolean;
	booleans?: boolean;
	booleans_as_integers?: boolean;
	collapse_vars?: boolean;
	comparisons?: boolean;
	computed_props?: boolean;
	conditionals?: boolean;
	dead_code?: boolean;
	defaults?: boolean;
	directives?: boolean;
	drop_console?: boolean;
	drop_debugger?: boolean;
	ecma?: number | string;
	evaluate?: boolean;
	expression?: boolean;
	global_defs?: Record<string, unknown>;
	hoist_funs?: boolean;
	hoist_props?: boolean;
	hoist_vars?: boolean;
	ie8?: boolean;
	if_return?: boolean;
	inline?: boolean | number;
	join_vars?: boolean;
	keep_classnames?: boolean;
	keep_fargs?: boolean;
	keep_fnames?: boolean;
	keep_infinity?: boolean;
	loops?: boolean;
	negate_iife?: boolean;
	passes?: number;
	properties?: boolean;
	pure_getters?: boolean | 'strict' | string;
	pure_funcs?: string[];
	reduce_funcs?: boolean;
	reduce_vars?: boolean;
	sequences?: boolean | number;
	side_effects?: boolean;
	switches?: boolean;
	top_retain?: string[] | string | null;
	toplevel?: boolean | string;
	typeofs?: boolean;
	unsafe?: boolean;
	unsafe_arrows?: boolean;
	unsafe_comps?: boolean;
	unsafe_Function?: boolean;
	unsafe_math?: boolean;
	unsafe_symbols?: boolean;
	unsafe_methods?: boolean;
	unsafe_proto?: boolean;
	unsafe_regexp?: boolean;
	unsafe_undefined?: boolean;
	unused?: boolean;
	module?: boolean;
}

export interface MangleOptions {
	props?: {
		reserved?: string[];
		undeclared?: boolean;
		regex?: null | string;
	};
	toplevel?: boolean;
	keep_classnames?: boolean;
	keep_fnames?: boolean;
	keep_private_props?: boolean;
	ie8?: boolean;
	safari10?: boolean;
}

export interface TransformOptions {
	react?: {
		runtime?: 'automatic' | 'classic';
		importSource?: string;
		pragma?: string;
		pragmaFrag?: string;
		throwIfNamespace?: boolean;
		development?: boolean;
		useSpread?: boolean;
		refresh?: {
			refreshReg?: string;
			refreshSig?: string;
			emitFullSignatures?: boolean;
		};
	};
	constModules?: {
		globals?: Record<string, Record<string, string>>;
	};
	optimizer?: {
		globals?: {
			vars?: Record<string, string>;
			envs?: string[] | Record<string, string>;
			typeofs?: Record<string, string>;
		};
		simplify?: boolean;
		jsonify?: {
			minCost?: number;
		};
	};
	legacyDecorator?: boolean;
	decoratorMetadata?: boolean;
}

export interface EnvOptions {
	targets?:
		| string
		| string[]
		| Record<
				| 'chrome'
				| 'opera'
				| 'edge'
				| 'firefox'
				| 'safari'
				| 'ie'
				| 'ios'
				| 'android'
				| 'node'
				| 'electron',
				string
		  >;
	mode?: 'usage' | 'entry';
	skip?: string[];
	dynamicImport?: boolean;
	loose?: boolean;
	include?: string[];
	exclude?: string[];
	coreJs?: 2 | 3;
	shippedProposals?: boolean;
	forceAllTransforms?: boolean;
	bugfixes?: boolean;
}

export interface AST {
	type: 'Module' | 'Script';
	body: unknown;
	span: { start: number; end: number; ctxt: number };
}

export interface TransformationOutput {
	code: string;
}

export type Plugin = string | [string, unknown];

export interface SwcConfig {
	jsc: {
		parser: ParserOptions;
		target?: EsVersion;
		loose?: boolean;
		experimental?: {
			plugins?: Plugin[];
		};
		minify?: {
			compress?: boolean | CompressOptions;
			mangle?: boolean | MangleOptions;
			format?: Record<string, unknown>;
			ecma?: number | string;
			keepClassnames?: boolean;
			keepFnames?: boolean;
			module?: boolean;
			safari10?: boolean;
			toplevel?: boolean;
			sourceMap?: {
				filename?: string;
				url?: string;
				root?: string;
				content?: string;
			};
			outputPath?: string;
			inlineSourcesContent?: boolean;
		};
		transform?: TransformOptions;
		externalHelpers?: boolean;
		keepClassNames?: boolean;
		baseUrl?: string;
		paths?: Record<string, string[]>;
	};
	module?: ModuleOptions;
	minify?: boolean;
	env?: EnvOptions;
	isModule?: boolean;
	sourceMaps?: boolean | 'inline';
	inlineSourcesContent?: boolean;
	experimental?: Record<never, never>;
	filename?: string;
}
