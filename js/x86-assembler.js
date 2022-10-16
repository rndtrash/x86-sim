import { $l } from './l10n.js';

const x86AssemblerTokens = {
	INVALID: -1,
	LITERAL: 0,
	NUMBER: 1,
	COMMA: 2,
	COLON: 3,
	NEW_LINE: 4,
};
Object.freeze(x86AssemblerTokens);

export const x86AssemblerRegularExpressions = {
	label: /[a-zA-Zа-яёА-ЯЁ_][a-zA-Zа-яёА-ЯЁ_\d]*:/,
	literal: /[a-zA-Z_][a-zA-Z_\d]*/,
	number: /-?((0[bdthoqxyBDTHOQXY][0-9A-Fa-f]+)|([0-9A-Fa-f]+[bdthoqxyBDTHOQXY]?)|(\$0[0-9A-Fa-f]*))/,
	comment: /(^;.*$)/,
	whitespace: /[ \t]*/
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
		class Token {
			static get type() { return x86AssemblerTokens.INVALID; }

			constructor() { }

			static parse(string) {
				return { token: undefined, length: 0 };
			}
		}

		class Whitespace {
			static parse(string) {
				return { token: undefined, length: x86AssemblerRegularExpressions.whitespace.exec(string)[0].length }; // implying that this regexp would always match even when there are no whitespaces at all
			}
		}

		class Comment extends Token {
			static parse(string) {
				if (string[0] == ';') {
					let pos = 1;
					while (pos < string.length) {
						if (string[pos] == '\n') {
							return { token: undefined, length: pos };
						}
						pos++;
					}

					return { token: undefined, length: pos };
				}

				return super.parse(string);
			}
		}

		class SingleCharacterToken extends Token {
			static get character() { return undefined; }

			static parse(string) {
				if (string[0] == this.character)
					return { token: new this(), length: 1 };

				return super.parse(string);
			}
		}

		class NewLine extends SingleCharacterToken {
			static get type() { return x86AssemblerTokens.NEW_LINE; }
			static get character() { return '\n'; }
		}

		class Comma extends SingleCharacterToken {
			static get type() { return x86AssemblerTokens.COMMA; }
			static get character() { return ','; }
		}

		class Colon extends SingleCharacterToken {
			static get type() { return x86AssemblerTokens.COLON; }
			static get character() { return ':'; }
		}

		class TokenWithValue extends Token {
			value;

			constructor(value) {
				super();

				this.value = value;
			}
		}

		class Literal extends TokenWithValue {
			static get type() { return x86AssemblerTokens.LITERAL; }
			static regexp = new RegExp(`^${x86AssemblerRegularExpressions.literal.source}`);

			static parse(string) {
				let exec = this.regexp.exec(string);
				if (exec) {
					return { token: new this(exec[0]), length: exec[0].length };
				}

				return super.parse(string);
			}
		}

		const PARSE_ORDER = [
			(s) => Whitespace.parse(s),
			(s) => NewLine.parse(s),
			(s) => Comma.parse(s),
			(s) => Colon.parse(s),
			(s) => Comment.parse(s),
			(s) => Literal.parse(s),
			// TODO: (s) => Number.parse(s),
		];

		let tokens = [];
		let position = 0;
		let parser = 0;
		while (parser < PARSE_ORDER.length && position < source.length) {
			let result = PARSE_ORDER[parser](source.slice(position));
			if (result && result.length != 0) {
				if (result.token)
					tokens.push(result.token);
				position += result.length;
				parser = 0;
			} else
				parser++;
		}
		if (position != source.length)
			throw $l('asm.error.tokenizer.failed-to-parse', source.slice(position));

		return tokens;
	}

	#parse(tokens) {
		console.log(tokens);

		throw 'Not implemented yet!';
	}

	#assemble(ast) {
		throw 'Not implemented yet!';
	}
}
