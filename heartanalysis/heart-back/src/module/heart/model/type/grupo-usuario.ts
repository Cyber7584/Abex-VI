type GrupoUsuario = {
	// Atributos
	id: number;
	descricao: string;
	createdAt: Date;
	updatedAt: Date;

	// Relações

	// Métodos

	save(): Promise<GrupoUsuario>;
	destroy(): Promise<void>;
};

export default GrupoUsuario;
