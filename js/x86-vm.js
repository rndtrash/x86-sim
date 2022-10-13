export const x86VMState = {
	RUNNING: 0,
	HALT: 1
};
Object.freeze(x86VMState);

export const x86OpCodes = {
	JMP_16: 0xE9,
	JMP_ABSOLUTE: 0xEA,
	JMP_8: 0xEB,
	HLT: 0xF4
};
Object.freeze(x86OpCodes);

export class x86VM {
	#state = x86VMState.HALT;
	memory = new Uint8Array(0x200); // 128 килобайт памяти хватит всем!
	registers = {
		ax: 0,
		bx: 0,
		cx: 0,
		dx: 0,

		sp: 0x100,
		bp: 0
	};

	constructor() {
		this.reset();
	}

	get state() {
		return this.#state;
	}

	load(program) {
		if (program.length > this.memory.length)
			throw "Программа слишком большая!";
		this.memory.set(program);
	}

	reset() {
		this.registers.ip = 0xFFFF0;
		// Остальные регистры оставим как есть для симуляции оставшегося в памяти рандомного мусора
	}

	run() {
		console.log('DEBUG: Run');
		this.#state = x86VMState.RUNNING;

		const f = () => {
			this.step();
			if (this.#state == x86VMState.RUNNING)
				setTimeout(f, 0);
		}
		f();
	}

	stop() {
		console.log('DEBUG: Stop');
		this.#state = x86VMState.HALT;
	}

	#fetchByte(address) {
		address &= 0xFFFFF; // подгоняем под 20 бит
		if (address < this.memory.length)
			return this.memory[address];
		if (address >= 0xFFFF0)
		{
			const bootcode = new Uint8Array([0xEA, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]); // Простейший BIOS, прыгает на начало кода
			return bootcode[address & 0xF];
		}
		throw 'Invalid address!';
	}

	static #offsetSegmentToAbsolute(offset, segment) {
		return (segment << 16) + offset;
	}

	step() {
		let currentPosition = this.registers.ip;
		const fetchByte = () => this.#fetchByte(currentPosition++);
		const fetchWord = () => this.#fetchByte(currentPosition++) & (this.#fetchByte(currentPosition++) << 8);
		let opcode = fetchByte();

		switch (opcode) {
			case x86OpCodes.JMP_ABSOLUTE:
				{
					this.registers.ip = x86VM.#offsetSegmentToAbsolute(fetchWord(), fetchWord());
				}
				break;
			case x86OpCodes.JMP_8:
				{
					let increment = fetchByte();
					this.registers.ip += increment;
					this.registers.ip += 2; // размер инструкции
				}
				break;
			case x86OpCodes.HLT:
				{
					this.#state = x86VMState.HALT;
				}
				break;
			default:
				throw `Opcode {opcode} is not implemented yet!`;
		}
	}
}
