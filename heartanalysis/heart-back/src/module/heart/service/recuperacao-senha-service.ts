import RequisicaoRecuperacaoSenha from "@heart/model/type/requisicao-recuperacao-senha";
import Usuario from "@heart/model/type/usuario";
import moment from "moment-timezone";
import emailService from "./email-service";
const model = require("@heart/model");

const recuperacaoSenhaService = {
	requisitarRecuperacaoSenha: async (usuario: Usuario) => {
		const codigoVerificacao = Math.floor(
			100000 + Math.random() * 900000,
		).toString();

		const requisicaoRecuperacaoSenha =
			await model.RequisicaoRecuperacaoSenha.create({
				id_usuario: usuario.id,
				data_expiracao: moment().add(5, "minutes"),
				codigo_verificacao: codigoVerificacao,
			});

		const corpoEmail = getCorpoEmail(requisicaoRecuperacaoSenha);
		const assuntoEmail = "Recuperação de senha";

		await emailService.enviarEmail(usuario.email, assuntoEmail, corpoEmail);
	},
};

function getCorpoEmail(requisicaoRecuperacaoSenha: RequisicaoRecuperacaoSenha) {
	const dataExpiracao = moment(requisicaoRecuperacaoSenha.data_expiracao)
		.tz("America/Sao_Paulo")
		.format("DD/MM/YYYY HH:mm:ss");

	return `
        <p>Utilize o PIN abaixo para dar continuidade à recuperação da senha da sua conta:</p>
        <h1>${requisicaoRecuperacaoSenha.codigo_verificacao}</h1>
        <p>O PIN expira em ${dataExpiracao}.</p>
    `;
}

export default recuperacaoSenhaService;
