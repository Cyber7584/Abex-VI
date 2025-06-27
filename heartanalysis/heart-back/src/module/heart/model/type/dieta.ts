type Dieta = {
	// Atributos
	id: number;
	id_aluno: number;
	alimento: string;
	peso: any;
	createdAt: Date;
	updatedAt: Date;

	// Relações

	// Métodos

	save(): Promise<Dieta>;
	destroy(): Promise<void>;
};

export default Dieta;
