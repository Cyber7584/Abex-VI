import Cidade from "./cidade";
import Usuario from "./usuario";

type Professor = {
	// Atributos
	id: number;
	nome: string;
	data_nascimento: Date;
	cref: number;
	foto: string;
	id_cidade: number;
	id_usuario: number;
	createdAt: Date;
	updatedAt: Date;

	// Relações
	cidade: Cidade;
	usuario_professor: Usuario; // ✅ Alias atualizado para corresponder ao Sequelize

	// Métodos
	getCidade(): Promise<Cidade>;
	setCidade(value: number): Promise<void>;
	getUsuarioProfessor(): Promise<Usuario>;
	setUsuarioProfessor(value: number): Promise<void>;
	save(): Promise<Professor>;
	destroy(): Promise<void>;
};

export default Professor;
