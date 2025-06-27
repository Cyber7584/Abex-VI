import GrupoUsuario from "./grupo-usuario";
import Permissao from "./permissao";

type GrupoUsuarioPermissao = {
	// Atributos
	id: number;
	createdAt: Date;
	updatedAt: Date;
	id_grupo_usuario: number;
	id_permissao: number;

	// Relações
	grupo_usuario: GrupoUsuario;
	permissao: Permissao;

	// Métodos
	getGrupo_usuario(): Promise<GrupoUsuario>;
	setGrupo_usuario(value: number): Promise<void>;
	getPermissao(): Promise<Permissao>;
	setPermissao(value: number): Promise<void>;
	save(): Promise<GrupoUsuarioPermissao>;
	destroy(): Promise<void>;
};

export default GrupoUsuarioPermissao;
