import {
	AppstoreOutlined,
	DropboxOutlined,
	HomeOutlined,
	SettingOutlined, TeamOutlined, TruckOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import {
	PermissaoGrupoUsuarioEnum,
	PermissaoUsuarioEnum,
	PermissaoCategoriaProdutoEnum,
	PermissaoTipoOcorrenciaEnum,
	PermissaoTipoDocumentoEnum, PermissaoMotoristaEnum, PermissaoProdutoEnum,
	PermissaoModeloVeiculoEnum, PermissaoEmpresaEnum,
	PermissaoVeiculoEnum, PermissaoCargaEnum, PermissaoAduanaEnum, PermissaoUnidadeEnum,
	PermissaoPostoCombustivelEnum, PermissaoPedagioEnum,
} from "enum/permissao-enum";

const dashBoardNavTree = [
	{
		key: "dashboard",
		title: "dashboard",
		isGroupTitle: true,
		submenu: [
			{
				key: "home",
				path: `${APP_PREFIX_PATH}/home`,
				title: "home",
				icon: HomeOutlined,
				submenu: [],
			},
		],
	},
];

const veiculosNavTree = [
	{
		key: "veiculos",
		title: "veiculos",
		isGroupTitle: true,
		submenu: [
			{
				key: "lista-veiculos",
				path: `${APP_PREFIX_PATH}/lista-veiculos`,
				title: "lista-veiculos",
				icon: TruckOutlined,
				submenu: [],
				permissao: PermissaoVeiculoEnum.VISUALIZAR,
			},
			{
				key: "lista-motoristas",
				path: `${APP_PREFIX_PATH}/lista-motoristas`,
				title: "lista-motoristas",
				icon: TeamOutlined,
				submenu: [],
				permissao: PermissaoMotoristaEnum.VISUALIZAR,
			},
			{
				key: "lista-cargas",
				path: `${APP_PREFIX_PATH}/lista-cargas`,
				title: "lista-cargas",
				icon: AppstoreOutlined,
				submenu: [],
				permissao: PermissaoCargaEnum.VISUALIZAR,
			},
			{
				key: "lista-produto",
				path: `${APP_PREFIX_PATH}/lista-produto`,
				title: "lista-produto",
				icon: DropboxOutlined,
				submenu: [],
				permissao: PermissaoProdutoEnum.VISUALIZAR,
			},
		],
	},
];

const administrativoNavTree = [
	{
		key: "administrativo",
		title: "administrativo",
		isGroupTitle: true,
		submenu: [
			{
				key: "lista-usuarios",
				path: `${APP_PREFIX_PATH}/lista-usuarios`,
				title: "lista-usuarios",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoUsuarioEnum.VISUALIZAR,
			},
			{
				key: "lista-grupos-usuario",
				path: `${APP_PREFIX_PATH}/lista-grupos-usuario`,
				title: "lista-grupos-usuario",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoGrupoUsuarioEnum.VISUALIZAR,
			},
			{
				key: "lista-categorias-produto",
				path: `${APP_PREFIX_PATH}/lista-categorias-produto`,
				title: "lista-categorias-produto",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoCategoriaProdutoEnum.VISUALIZAR,
			},
			{
				key: "lista-tipos-ocorrencia",
				path: `${APP_PREFIX_PATH}/lista-tipos-ocorrencia`,
				title: "lista-tipos-ocorrencia",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoTipoOcorrenciaEnum.VISUALIZAR,
			},
			{
				key: "lista-tipos-documento",
				path: `${APP_PREFIX_PATH}/lista-tipos-documento`,
				title: "lista-tipos-documento",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoTipoDocumentoEnum.VISUALIZAR,
			},
			{
				key: "lista-empresas",
				path: `${APP_PREFIX_PATH}/lista-empresas`,
				title: "lista-empresas",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoEmpresaEnum.VISUALIZAR,
			},
			{
				key: "lista-modelos-veiculo",
				path: `${APP_PREFIX_PATH}/lista-modelos-veiculo`,
				title: "lista-modelos-veiculo",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoModeloVeiculoEnum.VISUALIZAR,
			},
			{
				key: "lista-cadastro-dinamico",
				path: `${APP_PREFIX_PATH}/lista-cadastro-dinamico`,
				title: "lista-cadastro-dinamico",
				icon: SettingOutlined,
				submenu: [],
				permissao: PermissaoAduanaEnum.VISUALIZAR || PermissaoPedagioEnum.VISUALIZAR || PermissaoPostoCombustivelEnum.VISUALIZAR || PermissaoUnidadeEnum.VISUALIZAR,
			},
		],
	},
];

const navigationConfig = [...dashBoardNavTree, ...veiculosNavTree, ...administrativoNavTree];

export default navigationConfig;
