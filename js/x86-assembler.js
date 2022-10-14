const x86AssemblerTokens = {
	LABEL: 0,
	INSTRUCTION: 1,
	LITERAL: 2,
	COMMA: 3
};
Object.freeze(x86AssemblerTokens);

export const x86AssemblerRegularExpressions = {
	label: '[a-zA-Zа-яёА-ЯЁ_][a-zA-Zа-яёА-ЯЁ_\d]*:',
	literal: '[a-zA-Z_][a-zA-Z_\d]*',
	number: '-?((0[bdthoqxyBDTHOQXY][0-9A-Fa-f]+)|([0-9A-Fa-f]+[bdthoqxyBDTHOQXY]?)|(\$0[0-9A-Fa-f]*))', // FIXME: $0123 doesn't work
	comment: '(^#.*$)',
	whitespace: '[\s\t]*'
};
Object.freeze(x86AssemblerRegularExpressions);

export class x86Assembler {
	#log = "";

	constructor() {
	}

	get log() {
		return this.#log;
	}

	compile(source) {
		this.#log = "";
		return this.#assemble(this.#parse(this.#tokenize(source)));
	}

	#tokenize(source) {
//		const whitespace = new Set([' ', '\t']);
// oh god
//		const regexp = new RegExp(`^${x86AssemblerRegularExpressions.whitespace}((${x86AssemblerRegularExpressions.label})?${x86AssemblerRegularExpressions.whitespace}(${x86AssemblerRegularExpressions.literal}${x86AssemblerRegularExpressions.whitespace}(((${x86AssemblerRegularExpressions.literal}|${x86AssemblerRegularExpressions.number})(,)${x86AssemblerRegularExpressions.whitespace})*((${x86AssemblerRegularExpressions.literal}|${x86AssemblerRegularExpressions.number})))?)?)?(${x86AssemblerRegularExpressions.comment})?$`);

//		let cursor = 0;
//		let tokens = [];

//		while (cursor < source.length) {
//			console.log(regexp.exec(source));
//			cursor++;
//		}

//		return tokens;

		throw 'Not implemented yet!';
	}

	#parse(tokens) {
		throw 'Not implemented yet!';
	}

	#assemble(ast) {
		throw 'Not implemented yet!';
	}
}
