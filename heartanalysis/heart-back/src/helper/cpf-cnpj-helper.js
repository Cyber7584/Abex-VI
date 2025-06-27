function formatarCpfCnpj(cpfCnpj) {
	cpfCnpj = cpfCnpj
		.replace(".", "")
		.replace(".", "")
		.replace(".", "")
		.replace("-", "")
		.replace("/", "")
		.replace(" ", "");

	if (cpfCnpj.length == 11) {
		return formatarCpf(cpfCnpj);
	} else if (cpfCnpj.length == 14) {
		return formatarCnpj(cpfCnpj);
	}

	throw `CPF/CNPJ ${cpfCnpj} não é válido`;
}

function formatarCpf(cpf) {
	return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(
		6,
		9,
	)}-${cpf.substring(9)}`;
}

function formatarCnpj(cnpj) {
	return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(
		5,
		8,
	)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
}

module.exports = {
	formatarCpfCnpj,
};
