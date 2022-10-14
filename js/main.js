import { setLanguage, $l } from './l10n.js';
import { x86VM } from "./x86-vm.js";
import { registerAssemblyLanguage, assemblyLangId } from "./assembly-language.js";
import { x86Assembler } from "./x86-assembler.js";

/*var */VM = null;
var editor = null;
/*var */assembler = null;

function init() {
	setLanguage(window.navigator.language);

	VM = new x86VM();
	assembler = new x86Assembler();

	monaco.editor.defineTheme('x86-sim-theme', {
		base: 'vs',
		inherit: true,
		rules: [
			{ token: '', foreground: '#2f2f2f' },
			{ token: 'keyword', foreground: '#28728f', fontStyle: 'bold' },
			{ token: 'register', foreground: '#fa7b0c' },
			{ token: 'comment', foreground: '#949494' },
			{ token: 'number', foreground: '#28766e' },
			{ token: 'label', foreground: '#56724b' }
		],
		colors: {
			'editor.background': '#f9fbfd',
			'editor.foreground': '#2f2f2f'
		}
	});
	registerAssemblyLanguage();
	editor = monaco.editor.create(document.getElementById('code'), {
		value: $l('example-code'),
		language: assemblyLangId,
		theme: 'x86-sim-theme',
		automaticLayout: true
	});
}

window.onload = () => {
	init();
};
