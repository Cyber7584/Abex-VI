import TipoOTPEnum from "@heart/enum/otp-method-enum";
import GrupoUsuario from "./grupo-usuario";
import RequisicaoRecuperacaoSenha from "./requisicao-recuperacao-senha";

type Usuario = {
	// Atributos
	id: number;
	nome: string;
	email: string;
	senha: string;
	otp_habilitado: boolean;
	otp_secret: string;
	otp_tipo: TipoOTPEnum;
	otp_login_code: string;
	createdAt: Date;
	updatedAt: Date;
	id_grupo_usuario: number;

	// Relações
	grupo_usuario: GrupoUsuario;
	requisicoes_recuperacao_senha: RequisicaoRecuperacaoSenha[];

	// Métodos
	getGrupo_usuario(): Promise<GrupoUsuario>;
	setGrupo_usuario(value: number): Promise<void>;
	getRequisicoes_recuperacao_senha(): Promise<RequisicaoRecuperacaoSenha[]>;
	setRequisicoes_recuperacao_senha(value: number[]): Promise<void>;
	save(): Promise<Usuario>;
	update(values: any): Promise<Usuario>;
	destroy(): Promise<void>;
};

export default Usuario;
