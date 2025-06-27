import React from "react";
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "configs/AppConfig";
import {
	PermissaoCategoriaProdutoEnum,
	PermissaoGrupoUsuarioEnum, PermissaoModeloVeiculoEnum, PermissaoMotoristaEnum, PermissaoProdutoEnum,
	PermissaoEmpresaEnum,
	PermissaoTipoDocumentoEnum,
	PermissaoTipoOcorrenciaEnum,
	PermissaoUsuarioEnum, PermissaoVeiculoEnum, PermissaoCargaEnum, PermissaoAduanaEnum, PermissaoPostoCombustivelEnum, PermissaoUnidadeEnum, PermissaoPedagioEnum

} from "../enum/permissao-enum";

export const publicRoutes = [
	{
		key: "login",
		path: `${AUTH_PREFIX_PATH}/login`,
		component: React.lazy(() => import("views/auth-views/authentication/login")),
	},
	{
		key: "2fa",
		path: `${AUTH_PREFIX_PATH}/2fa/:login_code/:tipo`,
		component: React.lazy(() => import("views/auth-views/authentication/2fa")),
	},
	{
		key: "forgot-password",
		path: `${AUTH_PREFIX_PATH}/forgot-password`,
		component: React.lazy(() => import("views/auth-views/authentication/forgot-password")),
	},
	{
		key: "error-page-1",
		path: `${AUTH_PREFIX_PATH}/error-page-1`,
		component: React.lazy(() => import("views/auth-views/errors/error-page-1")),
	},
	{
		key: "error-page-2",
		path: `${AUTH_PREFIX_PATH}/error-page-2`,
		component: React.lazy(() => import("views/auth-views/errors/error-page-2")),
	},
];

export const protectedRoutes = [
	{
		key: "home",
		path: `${APP_PREFIX_PATH}/home`,
		component: React.lazy(() => import("views/app-views/dashboard")),
	},
	{
		key: "dados-conta",
		path: `${APP_PREFIX_PATH}/dados-conta`,
		component: React.lazy(() => import("views/app-views/dados-conta")),
	},
	{
		key: "lista-usuarios",
		path: `${APP_PREFIX_PATH}/lista-usuarios`,
		component: React.lazy(() => import("views/app-views/lista-usuarios")),
		permissao: PermissaoUsuarioEnum.VISUALIZAR,
	},
	{
		key: "usuario",
		path: `${APP_PREFIX_PATH}/usuario/*`,
		component: React.lazy(() => import("views/app-views/usuario")),
		permissao: PermissaoUsuarioEnum.CRIAR,
	},
	{
		key: "lista-grupos-usuario",
		path: `${APP_PREFIX_PATH}/lista-grupos-usuario`,
		component: React.lazy(() => import("views/app-views/lista-grupos-usuario")),
		permissao: PermissaoGrupoUsuarioEnum.VISUALIZAR,
	},
	{
		key: "grupo-usuario",
		path: `${APP_PREFIX_PATH}/grupo-usuario/*`,
		component: React.lazy(() => import("views/app-views/grupo-usuario")),
		permissao: PermissaoGrupoUsuarioEnum.CRIAR,
	},
	{
		key: "lista-categorias-produto",
		path: `${APP_PREFIX_PATH}/lista-categorias-produto`,
		component: React.lazy(() => import("views/app-views/lista-categorias-produto")),
		permissao: PermissaoCategoriaProdutoEnum.VISUALIZAR,
	},
	{
		key: "categoria-produto",
		path: `${APP_PREFIX_PATH}/categoria-produto/*`,
		component: React.lazy(() => import("views/app-views/categoria-produto")),
		permissao: PermissaoCategoriaProdutoEnum.CRIAR,
	},
	{
		key: "lista-tipos-ocorrencia",
		path: `${APP_PREFIX_PATH}/lista-tipos-ocorrencia`,
		component: React.lazy(() => import("views/app-views/lista-tipos-ocorrencia")),
		permissao: PermissaoTipoOcorrenciaEnum.VISUALIZAR,
	},
	{
		key: "tipo-ocorrencia",
		path: `${APP_PREFIX_PATH}/tipo-ocorrencia/*`,
		component: React.lazy(() => import("views/app-views/tipo-ocorrencia")),
		permissao: PermissaoTipoOcorrenciaEnum.CRIAR,
	},
	{
		key: "lista-tipos-documento",
		path: `${APP_PREFIX_PATH}/lista-tipos-documento`,
		component: React.lazy(() => import("views/app-views/lista-tipos-documento")),
		permissao: PermissaoTipoDocumentoEnum.VISUALIZAR,
	},
	{
		key: "tipo-documento",
		path: `${APP_PREFIX_PATH}/tipo-documento/*`,
		component: React.lazy(() => import("views/app-views/tipo-documento")),
		permissao: PermissaoTipoDocumentoEnum.CRIAR,
	},
	{
		key: "lista-empresas",
		path: `${APP_PREFIX_PATH}/lista-empresas`,
		component: React.lazy(() => import("views/app-views/lista-empresas")),
		permissao: PermissaoEmpresaEnum.VISUALIZAR,
	},
	{
		key: "empresa",
		path: `${APP_PREFIX_PATH}/empresa/*`,
		component: React.lazy(() => import("views/app-views/empresa")),
		permissao: PermissaoEmpresaEnum.CRIAR,
	},
	{
		key: "lista-motoristas",
		path: `${APP_PREFIX_PATH}/lista-motoristas`,
		component: React.lazy(() => import("views/app-views/lista-motoristas")),
		permissao: PermissaoMotoristaEnum.VISUALIZAR,
	},
	{
		key: "motorista",
		path: `${APP_PREFIX_PATH}/motorista/*`,
		component: React.lazy(() => import("views/app-views/motorista")),
		permissao: PermissaoMotoristaEnum.CRIAR,
	},
	{
		key: "lista-produto",
		path: `${APP_PREFIX_PATH}/lista-produto`,
		component: React.lazy(() => import("views/app-views/lista-produto")),
		permissao: PermissaoProdutoEnum.VISUALIZAR,
	},
	{
		key: "produto",
		path: `${APP_PREFIX_PATH}/produto/*`,
		component: React.lazy(() => import("views/app-views/produto")),
		permissao: PermissaoProdutoEnum.CRIAR,
	},
	{
		key: "lista-modelos-veiculo",
		path: `${APP_PREFIX_PATH}/lista-modelos-veiculo`,
		component: React.lazy(() => import("views/app-views/lista-modelo-veiculo")),
		permissao: PermissaoModeloVeiculoEnum.VISUALIZAR,
	},
	{
		key: "modelo-veiculo",
		path: `${APP_PREFIX_PATH}/modelo-veiculo/*`,
		component: React.lazy(() => import("views/app-views/modelo-veiculo")),
		permissao: PermissaoModeloVeiculoEnum.CRIAR,
	},
	{
		key: "lista-veiculos",
		path: `${APP_PREFIX_PATH}/lista-veiculos`,
		component: React.lazy(() => import("views/app-views/lista-veiculos")),
		permissao: PermissaoVeiculoEnum.VISUALIZAR,
	},
	{
		key: "veiculo",
		path: `${APP_PREFIX_PATH}/veiculo/*`,
		component: React.lazy(() => import("views/app-views/veiculo")),
		permissao: PermissaoVeiculoEnum.CRIAR,
	},
	{
		key: "lista-cargas",
		path: `${APP_PREFIX_PATH}/lista-cargas`,
		component: React.lazy(() => import("views/app-views/lista-cargas")),
		permissao: PermissaoCargaEnum.VISUALIZAR,
	},
	{
		key: "carga",
		path: `${APP_PREFIX_PATH}/carga/*`,
		component: React.lazy(() => import("views/app-views/carga")),
		permissao: PermissaoCargaEnum.CRIAR,
	},
	{
		key: "roteiro-veiculo",
		path: `${APP_PREFIX_PATH}/roteiro/veiculo/*`,
		component: React.lazy(() => import("views/app-views/roteiro-veiculo")),
		permissao: PermissaoVeiculoEnum.VISUALIZAR,
	},
	{
		key: "lista-cadastro-dinamico",
		path: `${APP_PREFIX_PATH}/lista-cadastro-dinamico`,
		component: React.lazy(() => import("views/app-views/lista-cadastro-dinamico")),
		permissao: PermissaoAduanaEnum.VISUALIZAR || PermissaoUnidadeEnum.VISUALIZAR || PermissaoPedagioEnum.VISUALIZAR || PermissaoPostoCombustivelEnum.VISUALIZAR
	},
	{
		key: "cadastro-dinamico",
		path: `${APP_PREFIX_PATH}/cadastro-dinamico/*`,
		component: React.lazy(() => import("views/app-views/cadastro-dinamico")),
		permissao: PermissaoAduanaEnum.CRIAR || PermissaoUnidadeEnum.CRIAR || PermissaoPedagioEnum.CRIAR || PermissaoPostoCombustivelEnum.CRIAR
	},
	{
		key: "lista-historico-preco-combustivel",
		path: `${APP_PREFIX_PATH}/lista-historico-preco-combustivel/*`,
		component: React.lazy(() => import("views/app-views/lista-historico-preco-combustivel")),
		permissao: PermissaoPostoCombustivelEnum.VISUALIZAR
	},
];
