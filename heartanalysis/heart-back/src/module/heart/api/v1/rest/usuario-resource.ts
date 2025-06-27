import express, { Request, Response } from "express";
import { Transaction } from "sequelize/types";
import { PermissaoUsuarioEnum } from "@heart/enum/permissao-enum";
import permissaoService from "@heart/service/permissao-service";
import routeBuilder from "@helper/route-builder";
import HttpException from "@type/http-exception";
import securityHelper from "@helper/security-helper";

const router = express.Router();
const model = require("@heart/model");
const { paginate } = require("@helper/pagination-painel");

routeBuilder.get(
	router,
	process.env.BASE_URL + "/api/v1/rest/usuario",
	[
		// securityHelper.verifyJWT,
		// permissaoService.validarPermissoes(PermissaoUsuarioEnum.VISUALIZAR),
	],
	async function (req: Request, resp: Response) {
		const {
			page = 0,
			pageSize = 5,
			orderBy = "createdAt",
			orderDirection = "asc",
			filters = "{}",
		} = req.query;

		const filtersDefinition: any[] = [
			{
				key: "id",
				type: "equal",
				attribute: "id",
			},
			{
				key: "nome",
				type: "like",
				attribute: "nome",
			},
			{
				key: "email",
				type: "like",
				attribute: "email",
			},
			{
				key: "senha",
				type: "like",
				attribute: "senha",
			},
			{
				key: "otp_secret",
				type: "like",
				attribute: "otp_secret",
			},
			{
				key: "otp_tipo",
				type: "equal",
				attribute: "otp_tipo",
			},
			{
				key: "otp_login_code",
				type: "like",
				attribute: "otp_login_code",
			},
		];

		const ordersDefinition = [
			{
				key: "id",
				orderBy: model.sequelize.literal("id"),
			},
		];

		let data = null;

		if (!req.headers.is_paginated) {
			data = await model.Usuario.findAll({
				// include: ['grupo_usuario'],
				order: [["id", "asc"]],
			});
		} else {
			data = await paginate({
				model: model.Usuario,
				// include: ['grupo_usuario'],
				filtersDefinition,
				ordersDefinition,
				page,
				pageSize,
				orderBy,
				orderDirection,
				filters,
			});
		}

		return resp.status(200).json(data);
	},
);

routeBuilder.get(
	router,
	process.env.BASE_URL + "/api/v1/rest/usuario/:id",
	[
		// securityHelper.verifyJWT,
		// permissaoService.validarPermissoes(PermissaoUsuarioEnum.VISUALIZAR),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;

		const item = await model.Usuario.findByPk(id, {
			include: ["grupo_usuario"],
		});

		if (!item) {
			throw new HttpException(404, "Não encontrado");
		}

		return resp.status(200).send(item);
	},
);


routeBuilder.post(
    router,
    process.env.BASE_URL + "/api/v1/rest/usuario-post",
    [],
    async function (req: Request, resp: Response) {
        console.log("Dados recebidos no backend:", req.body); // Verifica os dados recebidos

        try {
            await model.sequelize.transaction(async (transaction: Transaction) => {
                let item = await model.Usuario.create(req.body);
                return resp.status(200).send({ success: true, id: item.id });
            });
        } catch (error) {
            console.error("Erro ao criar usuário:", error); // Mostra erro detalhado
            resp.status(500).send({ error: "Erro ao cadastrar usuário" });
        }
    }
);




routeBuilder.put(
	router,
	process.env.BASE_URL + "/api/v1/rest/usuario/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(PermissaoUsuarioEnum.CRIAR),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;
		const item = await model.Usuario.findByPk(id, {
			include: ["grupo_usuario"],
		});

		if (!item) {
			throw new HttpException(404, "Não encontrado");
		}

		await model.sequelize.transaction(async (transaction: Transaction) => {
			await item.update(req.body);
			return resp.status(200).send({ success: true });
		});
	},
);

routeBuilder.delete(
	router,
	process.env.BASE_URL + "/api/v1/rest/usuario/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(PermissaoUsuarioEnum.EXCLUIR),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;
		const item = await model.Usuario.findByPk(id, {
			include: ["grupo_usuario"],
		});

		if (!item) {
			throw new HttpException(404, "Não encontrado");
		}

		await item.destroy();

		return resp.status(200).send({ success: true });
	},
);

module.exports = router;
