type Cupom = {
	// Atributos
	id: number;
	validade: Date;
	status: number;
	id_aluno: number;
	id_professor: number;
	createdAt: Date;
	updatedAt: Date;

	// Relações

	// Métodos

	save(): Promise<Cupom>;
	destroy(): Promise<void>;
};

export default Cupom;
