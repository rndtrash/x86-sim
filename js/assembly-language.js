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
				[/[a-zA-Zа-яёА-ЯЁ_][a-zA-Zа-яёА-ЯЁ_\d]*:/, 'label'],
				[/[a-zA-Z_][a-zA-Z_\d]*/, {
					cases: {
						'@keywords': 'keyword',
						'@registers': 'register',
						'@default': ''
					}
				}
				],
				[/-?(0[box][0-9]+|[0-9]+[bdho]?)/, 'number'],
				[/(^#.*$)/, 'comment']
			]
		}
	});
}
