const numericHelper = {};

/**
 * Faz parse de um número que esteja com formatação brasileira (ex: 1.000,50 e 1.000.000,60)
 * @param {string} number
 * @example
 * numericHelper.parseNumberPtBr("1.000,50")
 */
numericHelper.parseNumberPtBr = (number) => {
	if (number === null || number === undefined) return null;
	if (typeof number === "number") return number;
	return Number(number.replace(/\./g, "").replace(/,/g, "."));
};

/**
 * Formata um número para Reais
 * @param {string} number
 * @example
 * numericHelper.formatPrecoReal(1000.50) "R$ 1.000,50"
 */
numericHelper.formatPrecoReal = (number) => {
	if (number === null || number === undefined) return null;
	return `R$ ${number
		.toFixed(2)
		.replace(".", ",")
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
};

/**
 * Formata um número para o formato brasileiro
 * @param {*} number
 * @returns
 */
numericHelper.formatNumberPtBr = (number) => {
	// check if is
	if (number === null || number === undefined || isNaN(number)) return null;
	return `${number
		.toFixed(2)
		.replace(".", ",")
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
};

/**
 * Formata um número para porcentagem
 * @param {string} number
 * @example
 * numericHelper.formatPrecoReal(95.7) "95,70%"
 */
numericHelper.formatPorcentagem = (number) => {
	if (number === null || number === undefined) return null;
	return `${number
		.toFixed(2)
		.replace(".", ",")
		.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}%`;
};

/**
 * ARREDONDA um número para N casas decimais.
 * Não é um floor ou ceil, ele arredonda para o mais próximo.
 * @param {number} value
 * @param {int} decimals
 * @returns
 */
numericHelper.round = (value, decimals = 2) => {
	return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

module.exports = numericHelper;
