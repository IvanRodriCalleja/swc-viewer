import type { JSONSchema6 } from 'json-schema';

export const swcJsonSchema: JSONSchema6 = {
	type: 'object',
	required: ['jsc'],
	properties: {
		jsc: {
			type: 'object',
			required: ['parser'],
			properties: {
				parser: {
					type: 'object',
					required: ['syntax'],
					oneOf: [
						{
							type: 'object',
							properties: {
								syntax: {
									type: 'string',
									enum: ['ecmascript'],
								},
								jsx: { type: 'boolean' },
								functionBind: { type: 'boolean' },
								decorators: { type: 'boolean' },
								decoratorsBeforeExport: { type: 'boolean' },
								exportDefaultFrom: { type: 'boolean' },
								importAssertions: { type: 'boolean' },
								staticBlocks: { type: 'boolean' },
								privateInObject: { type: 'boolean' },
							},
							additionalProperties: false,
						},
						{
							type: 'object',
							properties: {
								syntax: {
									type: 'string',
									enum: ['typescript'],
								},
								tsx: { type: 'boolean' },
								decorators: { type: 'boolean' },
							},
							additionalProperties: false,
						},
					],
				},
				target: {
					type: 'string',
					enum: [
						'es3',
						'es5',
						'es2015',
						'es2016',
						'es2017',
						'es2018',
						'es2019',
						'es2020',
						'es2021',
						'es2022',
					],
				},
				loose: { type: 'boolean' },
				minify: {
					type: 'object',
					properties: {
						compress: {
							anyOf: [
								{ type: 'boolean' },
								{
									type: 'object',
									properties: {
										arguments: { type: 'boolean' },
										arrows: { type: 'boolean' },
										booleans: { type: 'boolean' },
										booleans_as_integers: { type: 'boolean' },
										collapse_vars: { type: 'boolean' },
										comparisons: { type: 'boolean' },
										computed_props: { type: 'boolean' },
										conditionals: { type: 'boolean' },
										dead_code: { type: 'boolean' },
										defaults: { type: 'boolean', default: true },
										directives: { type: 'boolean' },
										drop_console: { type: 'boolean' },
										drop_debugger: { type: 'boolean' },
										ecma: {
											anyOf: [
												{ type: 'integer', minimum: 0 },
												{ type: 'string' },
											],
										},
										evaluate: { type: 'boolean' },
										expression: { type: 'boolean' },
										global_defs: { type: 'object' },
										hoist_funs: { type: 'boolean' },
										hoist_props: { type: 'boolean' },
										hoist_vars: { type: 'boolean' },
										ie8: { type: 'boolean' },
										if_return: { type: 'boolean' },
										inline: {
											anyOf: [
												{ type: 'boolean' },
												{ type: 'integer', minimum: 0, maximum: 255 },
											],
										},
										join_vars: { type: 'boolean' },
										keep_classnames: { type: 'boolean' },
										keep_fargs: { type: 'boolean' },
										keep_fnames: { type: 'boolean' },
										keep_infinity: { type: 'boolean' },
										loops: { type: 'boolean' },
										negate_iife: { type: 'boolean' },
										passes: { type: 'integer', minimum: 0 },
										properties: { type: 'boolean' },
										pure_getters: {
											anyOf: [
												{ type: 'boolean' },
												{ type: 'string', enum: ['strict'] },
												{ type: 'string' },
											],
										},
										pure_funcs: { type: 'array', items: { type: 'string' } },
										reduce_funcs: { type: 'boolean' },
										reduce_vars: { type: 'boolean' },
										sequences: {
											anyOf: [
												{ type: 'boolean' },
												{ type: 'integer', minimum: 0, maximum: 255 },
											],
										},
										side_effects: { type: 'boolean' },
										switches: { type: 'boolean' },
										top_retain: {
											anyOf: [
												{ type: 'array', items: { type: 'string' } },
												{ type: 'string' },
												{ type: 'null' },
											],
										},
										toplevel: {
											anyOf: [{ type: 'boolean' }, { type: 'string' }],
										},
										typeofs: { type: 'boolean' },
										unsafe: { type: 'boolean' },
										unsafe_arrows: { type: 'boolean' },
										unsafe_comps: { type: 'boolean' },
										unsafe_Function: { type: 'boolean' },
										unsafe_math: { type: 'boolean' },
										unsafe_symbols: { type: 'boolean' },
										unsafe_methods: { type: 'boolean' },
										unsafe_proto: { type: 'boolean' },
										unsafe_regexp: { type: 'boolean' },
										unsafe_undefined: { type: 'boolean' },
										unused: { type: 'boolean' },
										module: { type: 'boolean' },
									},
									additionalProperties: false,
								},
							],
						},
						mangle: {
							anyOf: [
								{ type: 'boolean' },
								{
									type: 'object',
									properties: {
										props: {
											type: 'object',
											properties: {
												reserved: { type: 'array', items: { type: 'string' } },
												undeclared: { type: 'boolean' },
												regex: {
													anyOf: [{ type: 'null' }, { type: 'string' }],
												},
											},
											additionalProperties: false,
										},
										toplevel: { type: 'boolean' },
										keep_classnames: { type: 'boolean' },
										keep_fnames: { type: 'boolean' },
										keep_private_props: { type: 'boolean' },
										ie8: { type: 'boolean' },
										safari10: { type: 'boolean' },
									},
									additionalProperties: false,
								},
							],
						},
						format: { type: 'object' },
						ecma: {
							anyOf: [{ type: 'integer', minimum: 0 }, { type: 'string' }],
						},
						keepClassnames: { type: 'boolean' },
						keepFnames: { type: 'boolean' },
						module: { type: 'boolean' },
						safari10: { type: 'boolean' },
						toplevel: { type: 'boolean' },
						sourceMap: {
							type: 'object',
							properties: {
								filename: { type: 'string' },
								url: { type: 'string' },
								root: { type: 'string' },
								content: { type: 'string' },
							},
							additionalProperties: false,
						},
						outputPath: { type: 'string' },
						inlineSourcesContent: { type: 'boolean', default: true },
					},
					additionalProperties: false,
				},
				transform: {
					type: 'object',
					properties: {
						react: {
							type: 'object',
							properties: {
								runtime: {
									type: 'string',
									enum: ['automatic', 'classic'],
								},
								importSource: { type: 'string' },
								pragma: { type: 'string' },
								pragmaFrag: { type: 'string' },
								throwIfNamespace: { type: 'boolean' },
								development: { type: 'boolean' },
								useSpread: { type: 'boolean' },
								refresh: {
									type: 'object',
									properties: {
										refreshReg: { type: 'string' },
										refreshSig: { type: 'string' },
										emitFullSignatures: { type: 'boolean' },
									},
									additionalProperties: false,
								},
							},
							additionalProperties: false,
						},
						constModules: {
							type: 'object',
							properties: {
								globals: {
									type: 'object',
									additionalProperties: {
										type: 'object',
										additionalProperties: {
											type: 'string',
										},
									},
								},
							},
							additionalProperties: false,
						},
						optimizer: {
							type: 'object',
							properties: {
								globals: {
									type: 'object',
									properties: {
										vars: {
											type: 'object',
											additionalProperties: { type: 'string' },
										},
										envs: {
											anyOf: [
												{ type: 'array', items: { type: 'string' } },
												{
													type: 'object',
													additionalProperties: { type: 'string' },
												},
											],
										},
										typeofs: {
											type: 'object',
											additionalProperties: { type: 'string' },
										},
									},
									additionalProperties: false,
								},
								simplify: { type: 'boolean' },
								jsonify: {
									type: 'object',
									properties: { minCost: { type: 'integer', default: 1024 } },
									additionalProperties: false,
								},
							},
							additionalProperties: false,
						},
						legacyDecorator: { type: 'boolean' },
						decoratorMetadata: { type: 'boolean' },
					},
					additionalProperties: false,
				},
				externalHelpers: { type: 'boolean', default: false },
				keepClassNames: { type: 'boolean', default: false },
				baseUrl: { type: 'string' },
				paths: {
					type: 'object',
					additionalProperties: { type: 'array', items: { type: 'string' } },
				},
				experimental: {
					type: 'object',
					additionalProperties: false,
					properties: {
						plugins: {
							description: 'List of plugins to load and use',
							type: 'array',
							items: {
								type: ['string', 'array'],
								items: [
									{
										description: 'The name of the plugin.',
										type: 'string',
									},
									{
										description: 'The options of the plugin.',
										type: 'object',
									},
								],
							},
						},
					},
				},
			},
			additionalProperties: false,
		},
		module: {
			type: 'object',
			anyOf: [
				{
					type: 'object',
					required: ['type'],
					properties: {
						type: {
							type: 'string',
							enum: ['es6'],
						},
						strict: { type: 'boolean', default: false },
						strictMode: { type: 'boolean', default: true },
						lazy: { type: 'boolean', default: false },
						noInterop: { type: 'boolean', default: false },
					},
					additionalProperties: false,
				},
				{
					type: 'object',
					required: ['type'],
					properties: {
						type: {
							type: 'string',
							enum: ['commonjs'],
						},
						strict: { type: 'boolean', default: false },
						strictMode: { type: 'boolean', default: true },
						lazy: { type: 'boolean', default: false },
						noInterop: { type: 'boolean', default: false },
					},
					additionalProperties: false,
				},
				{
					type: 'object',
					required: ['type'],
					properties: {
						type: {
							type: 'string',
							enum: ['amd'],
						},
						moduleId: { type: 'string' },
						strict: { type: 'boolean', default: false },
						strictMode: { type: 'boolean', default: true },
						lazy: { type: 'boolean', default: false },
						noInterop: { type: 'boolean', default: false },
					},
					additionalProperties: false,
				},
				{
					type: 'object',
					required: ['type'],
					properties: {
						type: {
							type: 'string',
							enum: ['umd'],
						},
						globals: {
							type: 'object',
							additionalProperties: { type: 'string' },
						},
						strict: { type: 'boolean', default: false },
						strictMode: { type: 'boolean', default: true },
						lazy: { type: 'boolean', default: false },
						noInterop: { type: 'boolean', default: false },
					},
					additionalProperties: false,
				},
			],
		},
		minify: {
			type: 'boolean',
		},
		isModule: {
			type: 'boolean',
		},
		env: {
			type: 'object',
			properties: {
				targets: {
					anyOf: [
						{ type: 'string' },
						{ type: 'array', items: { type: 'string' } },
						{
							type: 'object',
							properties: {
								chrome: { type: 'string' },
								opera: { type: 'string' },
								edge: { type: 'string' },
								firefox: { type: 'string' },
								safari: { type: 'string' },
								ie: { type: 'string' },
								ios: { type: 'string' },
								android: { type: 'string' },
								node: { type: 'string' },
								electron: { type: 'string' },
							},
						},
					],
				},
				mode: { type: 'string', enum: ['usage', 'entry'] },
				skip: { type: 'array', items: { type: 'string' } },
				dynamicImport: { type: 'boolean' },
				loose: { type: 'boolean' },
				include: { type: 'array', items: { type: 'string' } },
				exclude: { type: 'array', items: { type: 'string' } },
				coreJs: { type: 'integer', enum: [2, 3] },
				shippedProposals: { type: 'boolean' },
				forceAllTransforms: { type: 'boolean' },
				bugfixes: { type: 'boolean' },
			},
			additionalProperties: false,
		},
		filename: { type: 'string' },
		sourceMaps: {
			anyOf: [{ type: 'boolean' }, { type: 'string', enum: ['inline'] }],
		},
		inlineSourcesContent: { type: 'boolean' },
	},
	additionalProperties: false,
};
