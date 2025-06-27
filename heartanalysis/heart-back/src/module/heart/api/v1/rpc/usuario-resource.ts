import routeBuilder from "@helper/route-builder";
import securityHelper from "@helper/security-helper";
import { PermissaoUsuarioEnum } from "@heart/enum/permissao-enum";
import permissaoService from "@heart/service/permissao-service";
import HttpException from "@type/http-exception";
import express, { Request, Response } from "express";
import { Transaction } from "sequelize/types";
import GrupoUsuarioEnum from "@heart/enum/grupo-usuario-enum";
const bcrypt = require("bcrypt");

const router = express.Router();
const model = require("@heart/model");
const { paginate } = require("@helper/pagination-painel");

routeBuilder.get(
	router,
	process.env.BASE_URL + "/api/v1/rpc/usuario",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(PermissaoUsuarioEnum.VISUALIZAR),
	],
	async function (req: Request, resp: Response) {
		const {
			page = 0,
			pageSize = 5,
			orderBy = "createdAt",
			orderDirection = "asc",
			filters = "{}",
			id_grupo_usuario = null,
		} = req.query;

		const filtersDefinition = [
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
		];

		let data = null;

		let where: any = {};

		if (id_grupo_usuario) {
			where.id_grupo_usuario = id_grupo_usuario;
		}

		if (!req.headers.is_paginated) {
			data = await model.Usuario.findAll({
				order: [["id", "asc"]],
				include: "ALUNO",
				where,
			});
		} else {
			data = await paginate({
				model: model.Usuario,
				attributes: ["id", "nome", "email", "id_grupo_usuario"],
				filtersDefinition,
				page,
				pageSize,
				orderBy,
				orderDirection,
				filters,
				defaultWhere: where,
			});
		}

		return resp.json(data);
	},
);

routeBuilder.get(
	router,
	process.env.BASE_URL + "/api/v1/rpc/usuario/:id",
	[
		// securityHelper.verifyJWT,
		
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;

		const item = await model.Usuario.findByPk(id, {
			attributes: ["id", "nome", "email", "id_grupo_usuario"],
			include: [
				{
					model: model.ALUNO,
					as: "ALUNO",
					include: "cidade",
				},
			],
		});

		if (!item) {
			throw new HttpException(404, "Usuário não encontrado");
		}

		return resp.status(200).send(item);
	},
);

routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rpc/usuario",
	[
		// securityHelper.verifyJWT,
		// permissaoService.validarPermissoes(PermissaoUsuarioEnum.CRIAR),
	],
	async function (req: Request, resp: Response) {
		await model.sequelize.transaction(async (transaction: Transaction) => {
			let item = await model.Usuario.create({
				...req.body,
				senha: bcrypt.hashSync(req.body.senha, 10),
				conta_ativada: true,
				data_conta_ativada: new Date(),
			});

			if (req.body.permissoes) {
				item.setPermissoes(req.body.permissoes);
			}

			if (item.id_grupo_usuario === GrupoUsuarioEnum.ALUNO) {
				const ALUNOJaExistente = await model.ALUNO.findOne({
					where: {
						id_usuario: item.id,
					},
				});

				if (ALUNOJaExistente) {
					ALUNOJaExistente.update(req.body.ALUNO);
				} else {
					await model.ALUNO.create({
						id_usuario: item.id,
						...req.body.ALUNO,
					});
				}
			}

			await item.save();
			return resp.status(200).send({ success: true, id: item.id });
		});
	},
);

routeBuilder.post(
    router,
    process.env.BASE_URL + "/api/v1/rpc/usuario-aluno",
    [],
    async function (req, resp) {
        console.log("Dados recebidos:", req.body); // Log para depuração

        try {
            // Verificar se já existe um usuário com o mesmo e-mail
            const existingUser = await model.Usuario.findOne({ where: { email: req.body.email } });

            // Se o e-mail já estiver cadastrado, retornamos erro 409
            if (existingUser) {
                return resp.status(409).json({ error: "Email já cadastrado" });
            }

            // Iniciar a transação após verificar a duplicação do e-mail
            await model.sequelize.transaction(async (transaction: Transaction) => {
                const hashedPassword = bcrypt.hashSync(req.body.senha, 10); // Criptografando a senha

             
                let usuario = await model.Usuario.create(
                    {
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: hashedPassword,
                        id_grupo_usuario: 3,
                        conta_ativada: true, 
                        data_conta_ativada: new Date(), // Definido automaticamente
                        otp_habilitado: false, // Valor padrão
                        otp_secret: null, // Null por padrão
                        otp_tipo: null, // Null por padrão
                        otp_login_code: null, // Null por padrão
                    },
                    { transaction }
                );

                // Criando o aluno vinculado ao usuário
                await model.Aluno.create(
                    {
                        id_usuario: usuario.id, // ID do usuário criado
                        nome: usuario.nome, // Nome do usuário
                    },
                    { transaction }
                );

                // Retorno de sucesso
                return resp.status(200).json({ success: true, id: usuario.id });
            });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return resp.status(500).json({ error: "Erro ao cadastrar usuário" });
        }
    }
);

routeBuilder.post(
    router,
    process.env.BASE_URL + "/api/v1/rpc/usuario-personal",
    [],
    async function (req, resp) {
        console.log("Dados recebidos:", req.body); 

        try {
            // Verificar se já existe um usuário com o mesmo e-mail
            const existingUser = await model.Usuario.findOne({ where: { email: req.body.email } });

            // Se o e-mail já estiver cadastrado, retornamos erro 409
            if (existingUser) {
                return resp.status(409).json({ error: "Email já cadastrado" });
            }

        
            await model.sequelize.transaction(async (transaction: Transaction) => {
                const hashedPassword = bcrypt.hashSync(req.body.senha, 10); 

           
                let usuario = await model.Usuario.create(
                    {
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: hashedPassword,
                        id_grupo_usuario: 2,
                        conta_ativada: true, // Definido automaticamente
                        data_conta_ativada: new Date(), // Definido automaticamente
                        otp_habilitado: false, // Valor padrão
                        otp_secret: null, // Null por padrão
                        otp_tipo: null, // Null por padrão
                        otp_login_code: null, // Null por padrão
                    },
                    { transaction }
                );

              
                await model.Professor.create(
                    {
                        id_usuario: usuario.id, 
                        nome: usuario.nome,
						cref: req.body.cref, 
                    },
                    { transaction }
                );

                // Retorno de sucesso
                return resp.status(200).json({ success: true, id: usuario.id });
            });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            return resp.status(500).json({ error: "Erro ao cadastrar usuário" });
        }
    }
);






routeBuilder.put(
	router,
	process.env.BASE_URL + "/api/v1/rpc/usuario/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(PermissaoUsuarioEnum.CRIAR),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;
		const item = await model.Usuario.findByPk(id);

		if (!item) {
			throw new HttpException(404, "Usuário não encontrado");
		}

		await model.sequelize.transaction(async (transaction: Transaction) => {
			req.body.senha = req.body.senha
				? bcrypt.hashSync(req.body.senha, 10)
				: undefined;
			await item.update(req.body);

			if (item.id_grupo_usuario === GrupoUsuarioEnum.ALUNO) {
				const ALUNOJaExistente = await model.ALUNO.findOne({
					where: {
						id_usuario: item.id,
					},
				});

				if (ALUNOJaExistente) {
					await ALUNOJaExistente.update(req.body.ALUNO);
				} else {
					await model.ALUNO.create({
						id_usuario: item.id,
						...req.body.ALUNO,
					});
				}
			}

			return resp.status(200).send({ success: true });
		});
	},
);

routeBuilder.delete(
	router,
	process.env.BASE_URL + "/api/v1/rpc/usuario/:id",
	[
		securityHelper.verifyJWT,
		permissaoService.validarPermissoes(PermissaoUsuarioEnum.EXCLUIR),
	],
	async function (req: Request, resp: Response) {
		const id = req.params.id;

		const item = await model.Usuario.findByPk(id);

		if (!item) {
			throw new HttpException(404, "Usuário não encontrado");
		}

		await item.destroy();
		return resp.status(200).send({ success: true });
	},
);

module.exports = router;
