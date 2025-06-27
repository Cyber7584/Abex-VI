import { PermissaoEnum } from "@heart/enum/permissao-enum";

const model = require("@heart/model");

const permissaoRepository = {
	/*
        Retorna num dicionário as permissões que o usuário tem.
        Ex: {1: true, 4: true, 7: true}
    */
	getAllPermissoesByUsuario: async (usuarioId: number) => {
		const usuario = await model.Usuario.findOne({
			where: {
				id: usuarioId,
			},
			include: [
				{
					model: model.GrupoUsuario,
					as: "grupo_usuario",
					include: ["permissoes"],
				},
			],
		});

		if (!usuario) throw "Usuário não encontrado";

		const permissoes: Record<string, boolean> = {};

		for (const p of usuario.grupo_usuario.permissoes) {
			permissoes[p.codigo] = true;
		}

		return permissoes;
	},

	/**
	 * Verifica se o usuário tem pelo menos uma das permissões passadas por parâmetro
	 */
	temPermissao: async (
		usuarioId: number,
		permissoes: PermissaoEnum | PermissaoEnum[],
	) => {
		if (!Array.isArray(permissoes)) permissoes = [permissoes];

		const usuario = await model.Usuario.findOne({
			where: {
				id: usuarioId,
			},
			include: [
				{
					model: model.GrupoUsuario,
					as: "grupo_usuario",
					include: ["permissoes"],
				},
			],
		});

		if (!usuario) throw "Usuário não encontrado";

		const permissoesIdsUsuarioTem = usuario.grupo_usuario.permissoes.map(
			(p: any) => p.codigo,
		);

		for (const permissao of permissoes) {
			if (permissoesIdsUsuarioTem.includes(permissao)) return true;
		}

		return false;
	},
};

export default permissaoRepository;
