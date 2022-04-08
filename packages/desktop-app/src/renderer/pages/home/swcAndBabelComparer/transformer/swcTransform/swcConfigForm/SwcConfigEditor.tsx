import { Box } from '@chakra-ui/react';
import { useField } from 'formik';
import { editor } from 'monaco-editor';
import { useRef } from 'react';
import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { swcJsonSchema } from 'renderer/utils/swcJsonSchema';
import { JsonConfigEditor } from '../../shared/JsonConfigEditor';

type SwcConfigEditorProps = {
	tab: TabState;
};

export const SwcConfigEditor = ({ tab }: SwcConfigEditorProps) => {
	const validateEditor = useRef<() => editor.IMarker[]>(() => []);

	const [field, meta, helpers] = useField({
		name: 'config',
		validate: () => {
			return new Promise((resolve) => {
				// This is done to avoid async validation of monaco-editor
				setTimeout(() => {
					const validations = validateEditor.current();
					const error =
						validations.length === 0 ? undefined : 'Configuration is nor valid';
					resolve(error);
				}, 500);
			});
		},
	});
	const onChange = (value: string | undefined) => {
		helpers.setValue(value);
	};

	const filePath = `${tab.id}/.swcrc`;

	return (
		<>
			<Box h="calc(100% - 32px)">
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
				<Box padding="0 8px" mt="8px" color="red.400">
					{meta.error}
				</Box>
			)}
		</>
	);
};
