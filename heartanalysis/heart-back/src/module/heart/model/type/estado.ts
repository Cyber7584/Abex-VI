type Estado = {
	// Atributos
	id: number;
	nome: string;
	sigla: string;
	createdAt: Date;
	updatedAt: Date;

	// Relações

	// Métodos

	save(): Promise<Estado>;
	destroy(): Promise<void>;
};

export default Estado;
