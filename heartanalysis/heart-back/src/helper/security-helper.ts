import { Request, Response } from "express";

var jwt = require("jsonwebtoken");

const securityHelper = {
	verifyJWT(req: Request, res: Response, next: Function) {
		var token = req.headers["authorization"];

		if (!token)
			return res
				.status(401)
				.json({ auth: false, message: "Token não enviado." });

		token = token.split("Bearer ")[1];

		jwt.verify(
			token,
			process.env.SECRET,
			function (err: any, decoded: any) {
				if (err) {
					return res.status(500).send({
						auth: false,
						message: "Falha ao autenticar o token.",
					});
				}
				req.id_usuario = decoded.id_usuario;
				next();
			},
		);
	},

	/**
	 * Verifica autenticação com o token sendo passado pelo parâmetro "?t=" na URL
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @returns
	 */
	verifyJWTWithQuery(req: Request, res: Response, next: Function) {
		var token = req.query["t"];

		if (!token)
			return res
				.status(401)
				.json({ auth: false, message: "Token não enviado." });

		jwt.verify(
			token,
			process.env.SECRET,
			function (err: any, decoded: any) {
				if (err)
					return res.status(500).send({
						auth: false,
						message: "Falha ao autenticar o token.",
					});
				req.id_usuario = decoded.id_usuario;
				next();
			},
		);
	},
};

export default securityHelper;
