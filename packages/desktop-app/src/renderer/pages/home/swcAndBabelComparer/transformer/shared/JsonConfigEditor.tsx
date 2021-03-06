import { editor } from 'monaco-editor';
import Editor, { OnChange, useMonaco } from '@monaco-editor/react';
import { MutableRefObject, useEffect } from 'react';
import type { JSONSchema6 } from 'json-schema';
import { editorOptions } from '../../../../../utils/baseEditorConfig';

type JsonConfigEditorProps = {
	path: string;
	schema: {
		uri: string;
		fileMatch: string[];
		schema: JSONSchema6;
	};
	value: string;
	validateRef: MutableRefObject<() => editor.IMarker[] | undefined>;
	onChange: OnChange;
};

export const JsonConfigEditor = ({
	schema,
	path,
	value,
	validateRef,
	onChange,
}: JsonConfigEditorProps) => {
	const monaco = useMonaco();

	useEffect(() => {
		if (!monaco) {
			return;
		}

		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			schemas: [schema],
		});
	}, [monaco, schema]);

	useEffect(() => {
		validateRef.current = () => {
			const model = monaco?.editor
				.getModels()
				.find((model) => model.uri.path === path);
			return monaco?.editor.getModelMarkers({ resource: model?.uri });
		};
	}, [validateRef, monaco]);

	return (
		<Editor
			value={value}
			defaultLanguage="json"
			options={{
				...editorOptions,
				readOnly: false,
			}}
			path={path}
			theme="vs-dark"
			height="100%"
			onChange={onChange}
		/>
	);
};
