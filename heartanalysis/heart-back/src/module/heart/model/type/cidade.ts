import Estado from "./estado";

type Cidade = {
	// Atributos
	id: number;
	nome: string;
	createdAt: Date;
	updatedAt: Date;
	id_estado: number;

	// Relações
	estado: Estado;

	// Métodos
	getEstado(): Promise<Estado>;
	setEstado(value: number): Promise<void>;
	save(): Promise<Cidade>;
	destroy(): Promise<void>;
};

export default Cidade;
