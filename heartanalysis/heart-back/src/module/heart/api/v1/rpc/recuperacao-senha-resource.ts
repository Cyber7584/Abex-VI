import routeBuilder from "@helper/route-builder";
import recuperacaoSenhaService from "@heart/service/recuperacao-senha-service";
import HttpException from "@type/http-exception";
import { Request, Response } from "express";
import { Transaction } from "sequelize";

const express = require("express");
const router = express.Router();
const model = require("@heart/model");
const bcrypt = require("bcrypt");

routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rpc/requisitar-recuperacao-senha",
	[],
	async function (req: Request, resp: Response) {
		const usuario = await model.Usuario.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!usuario) {
			throw new HttpException(404, "Usuário não encontrado");
		}

		await model.sequelize.transaction(async (transaction: Transaction) => {
			await recuperacaoSenhaService.requisitarRecuperacaoSenha(usuario);
		});

		return resp.status(200).json({ success: true });
	},
);

routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rpc/verificar-codigo-recuperacao-senha",
	[],
	async function (req: Request, resp: Response) {
		const usuario = await model.Usuario.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!usuario) {
			return resp.status(400).json({ message: "Usuário não encontrado" });
		}

		const requisicaoRecuperacaoSenha =
			await model.RequisicaoRecuperacaoSenha.findOne({
				where: {
					id_usuario: usuario.id,
					codigo_verificacao: req.body.codigo_verificacao,
					data_expiracao: {
						[model.Sequelize.Op.gte]: new Date(),
					},
				},
			});

		if (!requisicaoRecuperacaoSenha) {
			return resp
				.status(400)
				.json({ message: "Código de verificação inválido" });
		}

		return resp.status(200).json({ success: true });
	},
);

routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rpc/trocar-senha-recuperacao-senha",
	[],
	async function (req: Request, resp: Response) {
		const usuario = await model.Usuario.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!usuario) {
			return resp.status(400).json({ message: "Usuário não encontrado" });
		}

		const requisicaoRecuperacaoSenha =
			await model.RequisicaoRecuperacaoSenha.findOne({
				where: {
					id_usuario: usuario.id,
					codigo_verificacao: req.body.codigo_verificacao,
					data_expiracao: {
						[model.Sequelize.Op.gte]: new Date(),
					},
				},
			});

		if (!requisicaoRecuperacaoSenha) {
			return resp
				.status(400)
				.json({ message: "Código de verificação inválido" });
		}

		await model.sequelize.transaction(async (transaction: Transaction) => {
			usuario.senha = bcrypt.hashSync(req.body.senha, 10);
			await usuario.save({ transaction });
		});

		return resp.status(200).json({ success: true });
	},
);

module.exports = router;
