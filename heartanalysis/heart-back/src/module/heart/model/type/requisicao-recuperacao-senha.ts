import Usuario from "./usuario";

type RequisicaoRecuperacaoSenha = {
	// Atributos
	id: number;
	data_expiracao: Date;
	codigo_verificacao: string;
	createdAt: Date;
	updatedAt: Date;
	id_usuario: number;

	// Relações
	usuario: Usuario;

	// Métodos
	getUsuario(): Promise<Usuario>;
	setUsuario(value: number): Promise<void>;
	save(): Promise<RequisicaoRecuperacaoSenha>;
	destroy(): Promise<void>;
};

export default RequisicaoRecuperacaoSenha;
