import { Box } from '@chakra-ui/react';
import { useField } from 'formik';
import { editor } from 'monaco-editor';
import { useRef } from 'react';

import { SwcConfig } from '../../../../../../../models/SwcConfig';
import {
	getPlugin,
	isLocalPlugin,
	isWasmFile,
} from '../../../../../../../shared/swcPluginUtils';
import { swcJsonSchema } from '../../../../../../utils/swcJsonSchema';
import { TabState } from '../../../../viewerContext/viewerContextReducer';
import { JsonConfigEditor } from '../../shared/JsonConfigEditor';

type SwcConfigEditorProps = {
	tab: TabState;
};

export const SwcConfigEditor = ({ tab }: SwcConfigEditorProps) => {
	const validateEditor = useRef<() => editor.IMarker[]>(() => []);

	const [field, meta, helpers] = useField({
		name: 'config',
		validate: (value: string) => {
			return new Promise((resolve) => {
				console.log({ validation: validateEditor.current() });
				// This is done to avoid async validation of monaco-editor
				setTimeout(async () => {
					const validations = validateEditor.current();
					if (validations.length > 0) {
						resolve('Configuration is nor valid');
						return;
					}

					const config: SwcConfig = JSON.parse(value);
					if (config.jsc.experimental?.plugins) {
						const localPlugins = config.jsc.experimental?.plugins.filter(
							(plugin) => {
								const swcPlugin = getPlugin(plugin);
								return isLocalPlugin(swcPlugin);
							}
						);

						const pluginErrors = localPlugins.map(async (plugin) => {
							const swcPlugin = getPlugin(plugin);
							if (!isWasmFile(swcPlugin)) {
								return {
									isValid: false,
									error: 'Local plugin have to be a  .wasm file',
								};
							}

							const [pluginName] = swcPlugin;
							const exist = await window.electron.ipcRenderer.invoke(
								'file-exist',
								pluginName
							);

							if (!exist) {
								return {
									isValid: false,
									error: `Local plugin doesn't exist: ${pluginName}`,
								};
							}
							return {
								isValid: true,
								error: '',
							};
						});
						const validations = await Promise.all(pluginErrors);
						const error = validations.find((validation) => validation.error);
						if (error) {
							resolve(error.error);
							return;
						}

						resolve(undefined);
					}
					resolve(undefined);
				}, 500);
			});
		},
	});
	const onChange = (value: string | undefined) => {
		helpers.setValue(value);
	};

	const filePath = `/${tab.id}/.swcrc`;

	return (
		<>
			<Box data-testid="config-editor" h="full">
				<JsonConfigEditor
					path={filePath}
					schema={{
						uri: 'http://server/swcrc-schema.json',
						fileMatch: [filePath],
						schema: swcJsonSchema,
					}}
					value={field.value}
					validateRef={validateEditor}
					onChange={onChange}
				/>
			</Box>
			{meta.error && (
				<Box
					data-testid="swc-config-error"
					width="100%"
					padding="0 8px"
					paddingTop="8px"
					mt="8px"
					color="red.400"
					position="absolute"
					bottom="0"
					bg="gray.700"
				>
					{meta.error}
				</Box>
			)}
		</>
	);
};
