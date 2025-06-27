import Usuario from "@heart/model/type/usuario";
import * as OTPAuth from "otpauth";
import crypto from "crypto";
import { encode } from "hi-base32";
import emailService from "./email-service";
import TipoOTPEnum from "@heart/enum/otp-method-enum";

const otpService = {
	/**
	 * Gera o URL/qr code para o usuário
	 * @param usuario
	 * @returns
	 */
	async setupOtp(usuario: Usuario) {
		usuario.otp_secret = generateRandomBase32();
		await usuario.save();

		const otpauth = new OTPAuth.TOTP({
			issuer: "HEART",
			label: "HEART",
			algorithm: "SHA1",
			digits: 6,
			period: 30,
			secret: usuario.otp_secret,
		});

		return otpauth.toString();
	},

	/**
	 * Verifica se o token é válido. Se sim, habilita o OTP para o usuário
	 */
	async habilitarOtp(usuario: Usuario, token: string, tipo: TipoOTPEnum) {
		const isTokenValido = await otpService.verificarOtp(usuario, token);

		if (!isTokenValido) {
			throw new Error("Código 2FA inválido");
		}

		usuario.otp_habilitado = true;
		usuario.otp_tipo = tipo;
		await usuario.save();
	},

	/**
	 * Verifica se o token OTP é válido
	 */
	async verificarOtp(usuario: Usuario, token: string) {
		const totp = getTotp(usuario);

		const isTokenValido = totp.validate({ token });

		return isTokenValido !== null;
	},

	/**
	 * Gera um token temporário para o usuário, que vai ser usado em conjunto com o OTP na hora de verificar o login
	 */
	gerarLoginToken() {
		const token = crypto.randomBytes(3).toString("hex");
		return token;
	},

	/**
	 * Envia um email com o otp para o usuário
	 */
	async enviarEmailOtp(usuario: Usuario) {
		const totp = getTotp(usuario);

		const otp = totp.generate();

		await emailService.enviarEmail(
			usuario.email,
			"Código 2FA",
			`Seu código 2FA é ${otp}`,
		);
	},
};

const getTotp = (usuario: Usuario) => {
	return new OTPAuth.TOTP({
		issuer: "HEART",
		label: "HEART",
		algorithm: "SHA1",
		digits: 6,
		period: 30,
		secret: usuario.otp_secret,
	});
};

const generateRandomBase32 = () => {
	const buffer = crypto.randomBytes(15);
	const base32 = encode(buffer).replace(/=/g, "").substring(0, 24);
	return base32;
};

export default otpService;
