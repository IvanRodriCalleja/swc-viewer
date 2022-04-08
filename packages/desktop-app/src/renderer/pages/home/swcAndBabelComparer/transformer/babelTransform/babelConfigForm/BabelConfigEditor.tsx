import { Box } from '@chakra-ui/react';
import { useField } from 'formik';
import { editor } from 'monaco-editor';
import { useRef } from 'react';
import { TabState } from 'renderer/pages/home/viewerContext/viewerContextReducer';
import { babelJsonSchema } from 'renderer/utils/babelJsonSchema';
import { JsonConfigEditor } from '../../shared/JsonConfigEditor';

type BabelConfigEditorProps = {
	tab: TabState;
};

export const BabelConfigEditor = ({ tab }: BabelConfigEditorProps) => {
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

	const filePath = `${tab.id}/.babelrc`;

	return (
		<>
			<Box h="calc(100% - 32px)">
				<JsonConfigEditor
					path={filePath}
					schema={{
						uri: 'http://server/babelrc-schema.json',
						fileMatch: [filePath],
						schema: babelJsonSchema,
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
