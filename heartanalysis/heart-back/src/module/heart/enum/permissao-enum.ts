export enum PermissaoUsuarioEnum {
	VISUALIZAR = "VISUALIZAR_USUARIO",
	CRIAR = "CRIAR_USUARIO",
	EXCLUIR = "EXCLUIR_USUARIO",
}

export enum PermissaoGrupoUsuarioEnum {
	VISUALIZAR = "VISUALIZAR_GRUPO_USUARIO",
	CRIAR = "CRIAR_GRUPO_USUARIO",
	EXCLUIR = "EXCLUIR_GRUPO_USUARIO",
}

export enum PermissaoAlunoEnum {
	VISUALIZAR = "VISUALIZAR_GRUPO_USUARIO",
	CRIAR = "CRIAR_GRUPO_USUARIO",
	EXCLUIR = "EXCLUIR_GRUPO_USUARIO",
}
export enum PermissaoProfessorEnum {
	VISUALIZAR = "VISUALIZAR_GRUPO_USUARIO",
	CRIAR = "CRIAR_GRUPO_USUARIO",
	EXCLUIR = "EXCLUIR_GRUPO_USUARIO",
}

export enum PermissaoCidadeEnum {
	VISUALIZAR = "VISUALIZAR_CIDADE",
	CRIAR = "CRIAR_CIDADE",
	EXCLUIR = "EXCLUIR_CIDADE",
}

export enum PermissaoTreinoEnum {
	VISUALIZAR = "VISUALIZAR_TREINO",
	CRIAR = "CRIAR_TREINO",
	EXCLUIR = "EXCLUIR_TREINO",
}

export enum PermissaoCupomEnum {
	VISUALIZAR = "VISUALIZAR_CUPOM",
	CRIAR = "CRIAR_CUPOM",
	EXCLUIR = "EXCLUIR_CUPOM",
}

export enum PermissaoEstadoEnum {
	VISUALIZAR = "VISUALIZAR_ESTADO",
	CRIAR = "CRIAR_ESTADO",
	EXCLUIR = "EXCLUIR_ESTADO",
}

export enum PermissaoCategoriaPermissaoEnum {
	VISUALIZAR = "VISUALIZAR_CATEGORIA_PERMISSAO",
	CRIAR = "CRIAR_CATEGORIA_PERMISSAO",
	EXCLUIR = "EXCLUIR_CATEGORIA_PERMISSAO",
}

export enum PermissaoPermissaoEnum {
	VISUALIZAR = "VISUALIZAR_PERMISSAO",
	CRIAR = "CRIAR_PERMISSAO",
	EXCLUIR = "EXCLUIR_PERMISSAO",
}

export enum PermissaoGrupoUsuarioPermissaoEnum {
	VISUALIZAR = "VISUALIZAR_GRUPO_USUARIO_PERMISSAO",
	CRIAR = "CRIAR_GRUPO_USUARIO_PERMISSAO",
	EXCLUIR = "EXCLUIR_GRUPO_USUARIO_PERMISSAO",
}

export enum PermissaoDietaEnum {
	VISUALIZAR = "VISUALIZAR_DIETA",
	CRIAR = "CRIAR_DIETA",
	EXCLUIR = "EXCLUIR_DIETA",
}

export type PermissaoEnum =
	| PermissaoUsuarioEnum
	| PermissaoGrupoUsuarioEnum
	| PermissaoAlunoEnum
	| PermissaoProfessorEnum
	| PermissaoTreinoEnum
	| PermissaoCupomEnum
	| PermissaoEstadoEnum
	| PermissaoCategoriaPermissaoEnum
	| PermissaoPermissaoEnum
	| PermissaoGrupoUsuarioPermissaoEnum
	| PermissaoCidadeEnum
	| PermissaoDietaEnum; 
