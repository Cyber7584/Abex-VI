type Treino = {
	// Atributos
	id: number;
	nome: string;
	serie: number;
	repeticao: number;
	dia: Date;
	id_aluno: number;
	createdAt: Date;
	updatedAt: Date;

	// Relações

	// Métodos

	save(): Promise<Treino>;
	destroy(): Promise<void>;
};

export default Treino;
