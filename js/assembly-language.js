import { x86AssemblerRegularExpressions } from "./x86-assembler.js";

export const assemblyLangId = 'assembly';
const keywords = ['mov', 'nop', 'hlt', 'db'];
const registers = ['ax', 'bx', 'cx', 'dx', 'ah', 'al', 'bh', 'bl', 'ch', 'cl', 'dh', 'dl'];

export function registerAssemblyLanguage() {
	monaco.languages.register({ id: assemblyLangId });
	monaco.languages.setMonarchTokensProvider(assemblyLangId, {
		defaultToken: '',
		tokenPostfix: '.asm',

		keywords: keywords,
		registers: registers,
		tokenizer: {
			root: [
				[new RegExp(x86AssemblerRegularExpressions.label), 'label'],
				[new RegExp(x86AssemblerRegularExpressions.literal), {
					cases: {
						'@keywords': 'keyword',
						'@registers': 'register',
						'@default': ''
					}
				}
				],
				[new RegExp(x86AssemblerRegularExpressions.number), 'number'],
				[new RegExp(x86AssemblerRegularExpressions.comment), 'comment']
			]
		}
	});
}
