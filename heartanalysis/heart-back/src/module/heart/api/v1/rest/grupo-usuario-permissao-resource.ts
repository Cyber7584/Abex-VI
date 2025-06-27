import express, { Request, Response } from "express";
import { Transaction } from "sequelize/types";
import { PermissaoGrupoUsuarioPermissaoEnum } from "@heart/enum/permissao-enum";
import permissaoService from "@heart/service/permissao-service";
import routeBuilder from "@helper/route-builder";
import HttpException from "@type/http-exception";
import securityHelper from "@helper/security-helper";

const router = express.Router();
const model = require("@heart/model");
const { paginate } = require("@helper/pagination-painel");

routeBuilder.get(
	router,
	process.env.BASE_URL + "/api/v1/rest/grupo-usuario-permissao",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(
			PermissaoGrupoUsuarioPermissaoEnum.VISUALIZAR,
		),
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
		];

		const ordersDefinition = [
			{
				key: "id",
				orderBy: model.sequelize.literal("id"),
			},
		];

		let data = null;

		if (!req.headers.is_paginated) {
			data = await model.GrupoUsuarioPermissao.findAll({
				// include: ['grupo_usuario', 'permissao'],
				order: [["id", "asc"]],
			});
		} else {
			data = await paginate({
				model: model.GrupoUsuarioPermissao,
				// include: ['grupo_usuario', 'permissao'],
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
	process.env.BASE_URL + "/api/v1/rest/grupo-usuario-permissao/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(
			PermissaoGrupoUsuarioPermissaoEnum.VISUALIZAR,
		),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;

		const item = await model.GrupoUsuarioPermissao.findByPk(id, {
			include: ["grupo_usuario", "permissao"],
		});

		if (!item) {
			throw new HttpException(404, "Não encontrado");
		}

		return resp.status(200).send(item);
	},
);

routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rest/grupo-usuario-permissao",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(
			PermissaoGrupoUsuarioPermissaoEnum.CRIAR,
		),
	],
	async function (req: Request, resp: Response) {
		await model.sequelize.transaction(async (transaction: Transaction) => {
			let item = await model.GrupoUsuarioPermissao.create(req.body);

			return resp.status(200).send({ success: true, id: item.id });
		});
	},
);

routeBuilder.put(
	router,
	process.env.BASE_URL + "/api/v1/rest/grupo-usuario-permissao/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(
			PermissaoGrupoUsuarioPermissaoEnum.CRIAR,
		),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;
		const item = await model.GrupoUsuarioPermissao.findByPk(id, {
			include: ["grupo_usuario", "permissao"],
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
	process.env.BASE_URL + "/api/v1/rest/grupo-usuario-permissao/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(
			PermissaoGrupoUsuarioPermissaoEnum.EXCLUIR,
		),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;
		const item = await model.GrupoUsuarioPermissao.findByPk(id, {
			include: ["grupo_usuario", "permissao"],
		});

		if (!item) {
			throw new HttpException(404, "Não encontrado");
		}

		await item.destroy();

		return resp.status(200).send({ success: true });
	},
);

module.exports = router;
