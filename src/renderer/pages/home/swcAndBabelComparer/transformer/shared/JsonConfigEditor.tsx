import Editor, { OnChange, OnValidate, useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';
import type { JSONSchema6 } from 'json-schema';
import { editorOptions } from 'renderer/utils/baseEditorConfig';

type JsonConfigEditorProps = {
	path: string;
	schema: {
		uri: string;
		fileMatch: string[];
		schema: JSONSchema6;
	};
	value: string;
	onChange: OnChange;
	onValidate: OnValidate;
};

export const JsonConfigEditor = ({
	schema,
	path,
	value,
	onChange,
	onValidate,
}: JsonConfigEditorProps) => {
	const monaco = useMonaco();

	useEffect(() => {
		if (!monaco) {
			return;
		}

		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			validate: true,
			schemas: [schema],
		});
	}, [monaco, schema]);

	return (
		<Editor
			value={value}
			defaultLanguage="json"
			options={{
				...editorOptions,
				readOnly: false,
				scrollBeyondLastLine: false,
			}}
			path={path}
			theme="vs-dark"
			height="100%"
			onChange={onChange}
			onValidate={onValidate}
		/>
	);
};
