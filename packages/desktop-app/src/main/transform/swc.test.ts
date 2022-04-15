import { TransformSwc, transformSwc } from './swc';
import * as packageVersionCache from './shared/packageVersioncache';
const mockPackageVersion = (mockResult: string) => {
	jest
		.spyOn(packageVersionCache, 'getPackageLastVersion')
		.mockImplementation(() => Promise.resolve(mockResult));
};

describe('swc', () => {
	it('Should transform code with swc', async () => {
		const transform: TransformSwc = {
			transformConfig: {
				version: '1.2.161',
				config: {
					jsc: {
						parser: {
							syntax: 'ecmascript',
						},
					},
				},
			},
			file: {
				code: 'const a = () => null',
				name: 'random.js',
				path: 'random.js',
			},
		};

		const transformed = await transformSwc(transform);
		expect(transformed).toBe('var a = function() {\n    return null;\n};\n');
	});

	it('Should transform code with plugin', async () => {
		mockPackageVersion('0.4.0');

		const transform: TransformSwc = {
			transformConfig: {
				version: '1.2.165',
				config: {
					jsc: {
						parser: {
							syntax: 'ecmascript',
							jsx: true,
						},
						experimental: {
							plugins: ['@swc/plugin-styled-components'],
						},
					},
				},
			},
			file: {
				code: 'const StaticString = p => <p css="flex: 1;">A</p>',
				name: 'random.js',
				path: 'random.js',
			},
		};

		const transformed = await transformSwc(transform);
		expect(transformed).toBe(
			'function _taggedTemplateLiteral(strings, raw) {\n' +
				'    if (!raw) {\n' +
				'        raw = strings.slice(0);\n' +
				'    }\n' +
				'    return Object.freeze(Object.defineProperties(strings, {\n' +
				'        raw: {\n' +
				'            value: Object.freeze(raw)\n' +
				'        }\n' +
				'    }));\n' +
				'}\n' +
				'function _templateObject() {\n' +
				'    var data = _taggedTemplateLiteral([\n' +
				'        void 0\n' +
				'    ]);\n' +
				'    _templateObject = function _templateObject() {\n' +
				'        return data;\n' +
				'    };\n' +
				'    return data;\n' +
				'}\n' +
				'import _styled from "styled-components";\n' +
				'var StaticString = function(p) {\n' +
				'    return /*#__PURE__*/ React.createElement(_StyledP, null, "A");\n' +
				'};\n' +
				'var _StyledP = _styled("p")(_templateObject());\n'
		);
	});
});
