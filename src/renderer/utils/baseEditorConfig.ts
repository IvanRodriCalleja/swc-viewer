import { editor } from 'monaco-editor';

export const editorOptions: editor.IStandaloneEditorConstructionOptions = {
	fontFamily:
		'"Cascadia Code", "Jetbrains Mono", "Fira Code", "Menlo", "Consolas", monospace',
	fontLigatures: true,
	fontSize: 14,
	lineHeight: 24,
	readOnly: true,
	wordWrap: 'wordWrapColumn',
	tabSize: 2,
	minimap: { enabled: false },
};
