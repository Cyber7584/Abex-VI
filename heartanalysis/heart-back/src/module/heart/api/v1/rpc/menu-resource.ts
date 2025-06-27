import { Request, Response, Router } from "express";
import permissaoRepository from "@heart/repository/permissao-repository";
import routeBuilder from "@helper/route-builder";
import securityHelper from "@helper/security-helper";
const model = require("@heart/model");

const router = Router();

routeBuilder.get(
	router,
	process.env.BASE_URL + "/api/v1/rpc/menu",
	[securityHelper.verifyJWT],
	async function (req: Request, resp: Response) {
		const usuario = await model.Usuario.findByPk(req.id_usuario);

		return resp.status(200).json({
			usuario: {
				id: usuario.id,
				nome: usuario.nome,
				email: usuario.email,
				id_grupo_usuario: usuario.id_grupo_usuario
			},
			permissoes: await permissaoRepository.getAllPermissoesByUsuario(
				usuario.id,
			),
			notificacoes: {},
		});
	},
);

module.exports = router;
