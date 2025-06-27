import CategoriaPermissao from "./categoria-permissao";
import GrupoUsuario from "./grupo-usuario";

type Permissao = {
	// Atributos
	id: number;
	descricao: string;
	codigo: string;
	createdAt: Date;
	updatedAt: Date;
	id_categoria_permissao: number;

	// Relações
	categoria_permissao: CategoriaPermissao;
	grupos_usuario: GrupoUsuario[];

	// Métodos
	getCategoria_permissao(): Promise<CategoriaPermissao>;
	setCategoria_permissao(value: number): Promise<void>;
	getGrupos_usuario(): Promise<GrupoUsuario[]>;
	setGrupos_usuario(value: number[]): Promise<void>;
	save(): Promise<Permissao>;
	destroy(): Promise<void>;
};

export default Permissao;
