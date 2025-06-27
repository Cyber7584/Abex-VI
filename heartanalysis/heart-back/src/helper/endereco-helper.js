function getIdTipoLogradouroByDescricao(descricao) {
	switch (descricao) {
		case "Alameda":
			return 1;
		case "Avenida":
			return 2;
		case "Chácara":
			return 3;
		case "Distrito":
			return 4;
		case "Estrada":
			return 5;
		case "Fazenda":
			return 6;
		case "Gleba":
			return 7;
		case "Linha":
			return 8;
		case "Lote":
			return 9;
		case "Praça":
			return 10;
		case "Rodovia":
			return 11;
		case "Rua":
			return 12;
		case "Sítio":
			return 13;
		case "Travessa":
			return 14;
		case "Vila":
			return 15;
		default:
			return 11;
	}
}

function getDescricaoTipoLogradouroById(id) {
	switch (id) {
		case 1:
			return "Alameda";
		case 2:
			return "Avenida";
		case 3:
			return "Chácara";
		case 4:
			return "Distrito";
		case 5:
			return "Estrada";
		case 6:
			return "Fazenda";
		case 7:
			return "Gleba";
		case 8:
			return "Linha";
		case 9:
			return "Lote";
		case 10:
			return "Praça";
		case 11:
			return "Rodovia";
		case 12:
			return "Rua";
		case 13:
			return "Sítio";
		case 14:
			return "Travessa";
		case 15:
			return "Vila";
		default:
			return "Rua";
	}
}

module.exports = {
	getIdTipoLogradouroByDescricao,
	getDescricaoTipoLogradouroById,
};
