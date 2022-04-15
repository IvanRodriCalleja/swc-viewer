import { useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { editorOptions } from 'renderer/utils/baseEditorConfig';

type OutputEditorProps = {
	code: string;
	viewMode: 'javascript' | 'typescript';
};

export const OutputEditor = ({ viewMode, code }: OutputEditorProps) => {
	const borderColor = useColorModeValue('white', 'gray.700');
	const monaco = useMonaco();

	useEffect(() => {
		monaco?.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
			noSyntaxValidation: true,
			noSemanticValidation: true,
			noSuggestionDiagnostics: true,
		});
	}, [monaco]);

	return (
		<Box width="full" height="full" borderColor={borderColor} borderWidth="1px">
			<Editor
				height="100%"
				value={code}
				language={viewMode}
				options={editorOptions}
				theme="vs-dark"
			/>
		</Box>
	);
};
