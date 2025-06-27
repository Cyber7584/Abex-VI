import Cidade from "./cidade";
import Usuario from "./usuario";
import Professor from "./professor";

type Aluno = {
	// Atributos
	id: number;
	nome: string;
	id_usuario: number;
	id_professor: number;
	data_nascimento: string;
	altura: number;
	peso: number;
	foto: string;
	createdAt: Date;
	updatedAt: Date;
	id_cidade: number;

	// Relações
	cidade: Cidade;
	usuario_aluno: Usuario; // ✅ Alias atualizado conforme o `aluno.js`
	professor: Professor;

	// Métodos
	getCidade(): Promise<Cidade>;
	setCidade(value: number): Promise<void>;
	getUsuarioAluno(): Promise<Usuario>; // ✅ Método para buscar o usuário correto
	setUsuarioAluno(value: number): Promise<void>;
	getProfessor(): Promise<Professor>;
	setProfessor(value: number): Promise<void>;
	save(): Promise<Aluno>;
	destroy(): Promise<void>;
};

export default Aluno;
