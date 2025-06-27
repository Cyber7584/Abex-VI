import { PermissaoEnum } from "@heart/enum/permissao-enum";
import permissaoRepository from "@heart/repository/permissao-repository";
import { Request, Response } from "express";
const model = require("@heart/model");

const permissaoService = {
	/**
	 * Middleware que valida se o usuário tem as permissões necessárias
	 */
	validarPermissoes: (permissoes: PermissaoEnum | PermissaoEnum[]) => {
		return async (req: Request, res: Response, next: any) => {
			try {
				const temPermissao = await permissaoRepository.temPermissao(
					req.id_usuario,
					permissoes,
				);
				if (temPermissao) {
					next();
				} else {
					res.status(403).json({ error: "Não autorizado" });
				}
			} catch (e) {
				res.status(403).json({ error: e });
			}
		};
	},
};

export default permissaoService;
