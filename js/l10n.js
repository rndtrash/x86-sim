const translations = {
	'en-US': {
		'example-code': '; hello, world!\nstart:mov 7000h, ax ;move 0x7000 to the AX register\n\thlt',

		'asm.error.tokenizer.failed-to-parse': 'Failed to parse "%"!',

		'vm.error.program-too-big': 'The program can\'t fit into the memory! (overflow by % bytes)',
		'vm.error.invalid-address': 'Invalid address "%"!',
		'vm.error.opcode-not-implemented': 'Opcode "%" is not implemented yet!',
	},

	'ru-RU': {
		'example-code': '; привет, мир!\nначало:mov 7000h, ax ;загружаем число 0x7000 в регистр AX\n\thlt',

		'asm.error.tokenizer.failed-to-parse': 'Не удалось распознать "%"!',

		'vm.error.program-too-big': 'Программа не помещается в оперативную память! (переполнение на % байт(а/ов))',
		'vm.error.invalid-address': 'Неправильный адрес "%"!',
		'vm.error.opcode-not-implemented': 'Опкод "%" ещё не реализован в виртуальной машине!',
	}
};

const DEFAULT_LANGUAGE = 'en-US';
let language = DEFAULT_LANGUAGE;

export function setLanguage(lang) {
    language = translations.hasOwnProperty(lang) ? lang: DEFAULT_LANGUAGE;
}

export function $l(id, ...args) {
    const str = translations[language][id] || translations[DEFAULT_LANGUAGE][id];
    return str.replace(/(?<!\\)(?:\\\\)*%/g, () => args.shift()).replace(/\\%/g, '%');
}
