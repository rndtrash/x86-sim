const translations = {
	'en-US': {
		'example-code': '# hello, world!\nstart:mov 7000h, ax #move 0x7000 to the AX register\n\thlt',
		'vm.error.program-too-big': 'The program can\'t fit into the memory! (overflow by % bytes)',
		'vm.error.invalid-address': 'Invalid address "%"!',
		'vm.error.opcode-not-implemented': 'Opcode "%" is not implemented yet!',
	},

	'ru-RU': {
		'example-code': '# привет, мир!\nначало:mov 7000h, ax #загружаем число 0x7000 в регистр AX\n\thlt',
		'vm.error.program-too-big': 'Программа не помещается в оперативную память! (переполнение на % байт(а/ов))',
		'vm.error.invalid-address': 'Неправильный адрес "%"!',
		'vm.error.opcode-not-implemented': 'Опкод "%" ещё не реализован в виртуальной машине!',
	}
};

const defaultLanguage = 'en-US';
var language = defaultLanguage;

export function setLanguage(lang) {
	if (translations[lang] === undefined)
		lang = defaultLanguage;
	language = lang;
}

export function $l(string, ...args) {
	// god gracious why doesnt js have something like sprintf
	return args.reduce((p, c) => p.replace(/(?<!\\)(?:\\\\)*%/, `${c}`), translations[language][string] || translations[defaultLanguage][string]);
}
