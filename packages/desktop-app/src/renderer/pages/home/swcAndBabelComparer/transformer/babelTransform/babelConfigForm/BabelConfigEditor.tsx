import { Box } from '@chakra-ui/react';
import { useField } from 'formik';
import { editor } from 'monaco-editor';
import { useRef } from 'react';
import { babelJsonSchema } from '../../../../../../utils/babelJsonSchema';
import { TabState } from '../../../../viewerContext/viewerContextReducer';

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
			<Box data-testid="config-editor" h="full">
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
				<Box
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
