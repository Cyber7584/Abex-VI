import Permissao from "./permissao";

type CategoriaPermissao = {
	// Atributos
	id: string;
	descricao: string;
	ordem: number;
	createdAt: Date;
	updatedAt: Date;

	// Relações
	permissoes: Permissao[];

	// Métodos
	getPermissoes(): Promise<Permissao[]>;
	setPermissoes(value: number[]): Promise<void>;
	save(): Promise<CategoriaPermissao>;
	destroy(): Promise<void>;
};

export default CategoriaPermissao;
