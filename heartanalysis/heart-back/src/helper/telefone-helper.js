function formatarTelefone(telefone) {
	telefone = telefone
		.replace(/\(/g, "")
		.replace(/\)/g, "")
		.replace(/\./g, "")
		.replace(/\-/g, "")
		.replace(/ /g, "");

	if (telefone.length == 11) {
		return `(${telefone.substring(0, 2)}) ${telefone.substring(
			2,
			7,
		)}-${telefone.substring(7)}`;
	} else if (telefone.length == 10) {
		return `(${telefone.substring(0, 2)}) ${telefone.substring(
			2,
			6,
		)}-${telefone.substring(6)}`;
	} else {
		return telefone;
	}
}

function formatarTelefoneParaObjeto(telefone) {
	if (!telefone) return null;

	telefone = telefone
		.replace(/\(/g, "")
		.replace(/\)/g, "")
		.replace(/\./g, "")
		.replace(/\-/g, "")
		.replace(/ /g, "");

	return {
		ddd: telefone.substring(0, 2),
		numero: telefone.substring(2),
	};
}

module.exports = {
	formatarTelefone,
	formatarTelefoneParaObjeto,
};
