import routeBuilder from "@helper/route-builder";
import TipoOTPEnum from "@heart/enum/otp-method-enum";
import Usuario from "@heart/model/type/usuario";
import otpService from "@heart/service/otp-service";
import HttpException from "@type/http-exception";
import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const model = require("@heart/model");
const bcrypt = require("bcrypt");

routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rpc/login",
	[],
	async function (req: Request, resp: Response) {
		const usuario = (await model.Usuario.findOne({
			where: {
				email: req.body.email,
			},
		})) as Usuario;

		if (!usuario) {
			throw new HttpException(401, "Usuário não encontrado");
		}

		if (!bcrypt.compareSync(req.body.senha, usuario.senha)) {
			throw new HttpException(401, "Senha não confere");
		}

		if (usuario.otp_habilitado) {
			usuario.otp_login_code = otpService.gerarLoginToken();

			if (usuario.otp_tipo == TipoOTPEnum.EMAIL) {
				await otpService.enviarEmailOtp(usuario);
			}

			await usuario.save();
			return resp.status(200).json({
				otp_habilitado: true,
				otp_tipo: usuario.otp_tipo,
				otp_login_code: usuario.otp_login_code,
			});
		}

		const token = jwt.sign(
			{
				id_usuario: usuario.id,
			},
			process.env.SECRET,
		);

		return resp.status(200).json({ token_type: "Bearer",
			 token, 
			 id_usuario: usuario.id,
			});
	},
);

/**
 * Rota para verificar o OTP
 */
routeBuilder.post(
	router,
	process.env.BASE_URL + "/api/v1/rpc/verificar-otp",
	[],
	async function (req: Request, resp: Response) {
		const { otp, login_code } = req.body;

		const usuario = (await model.Usuario.findOne({
			where: {
				otp_login_code: login_code,
			},
		})) as Usuario;

		if (!usuario) {
			throw new HttpException(400, "Usuário não encontrado");
		}

		if (!usuario.otp_habilitado) {
			throw new HttpException(400, "Usuário não possui autenticação 2FA");
		}

		if (!usuario.otp_secret) {
			throw new HttpException(400, "Usuário não possui segredo 2FA");
		}

		if (!otp) {
			throw new HttpException(400, "Informe o código 2FA");
		}

		const isTokenValido = await otpService.verificarOtp(usuario, otp);

		if (!isTokenValido) {
			throw new HttpException(400, "Código 2FA inválido");
		}

		const token = jwt.sign(
			{
				id_usuario: usuario.id,
			},
			process.env.SECRET,
		);

		return resp.status(200).json({ token_type: "Bearer", token });
	},
);

module.exports = router;
