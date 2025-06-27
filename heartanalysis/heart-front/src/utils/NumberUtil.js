import { exists } from "./RandomUtils";

/**
 * Formata o valor para moeda
 * @param {Number} valor
 * @param {number} [casasDecimais]
 * @returns {string|null} - Valor formatado para moeda
 */
export const formatarCasasDecimais = (valor, casasDecimais = 2) => {
	if (!exists(valor)) return null;

	return valor.toLocaleString("pt-BR", {
		minimumFractionDigits: casasDecimais,
		maximumFractionDigits: casasDecimais,
	});
};

/**
 * Verifica se o valor é um número válido
 * @param {any} value
 * @returns {boolean} - True se o valor é um número válido, false caso contrário
 */
export const isValidNumber = (value) => {
	if (!exists(value)) return false;
	return !isNaN(Number(value));
};

export const currencyFormatter = value => {
	return new Intl.NumberFormat("pt-br", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};

export const currencyParser = val => {
	try {
		// for when the input gets clears
		if (typeof val === "string" && !val.length) {
			val = "0.0";
		}

		let group = new Intl.NumberFormat("pt-br").format(1111).replace(/1/g, "");
		let decimal = new Intl.NumberFormat("pt-br").format(1.1).replace(/1/g, "");
		let reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
		reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");

		reversedVal = reversedVal.replace(/[^0-9.]/g, "");

		const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
		const needsDigitsAppended = digitsAfterDecimalCount > 2;

		if (needsDigitsAppended) {
			reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
		}

		return Number.isNaN(reversedVal) ? 0 : Number(reversedVal);
	} catch (error) {
		console.error(error);
	}
};

export const phoneFormatter = (value) => {
	if (typeof value !== "string") {
		value = value?.toString() ?? "";
	}

	// Remove qualquer caractere não numérico
	value = value.replace(/\D/g, "");

	// Formatar conforme o tamanho do valor
	if (value.length <= 2) {
		return `${value}`;
	} else if (value.length <= 6) {
		return `(${value.slice(0, 2)}) ${value.slice(2)}`;
	} else if (value.length <= 10) {
		return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
	} else {
		return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
	}
};

export const cpfFormatter = (value) => {
	if (value === 0) {
		value = "0";
	}

	if (typeof value !== "string") {
		value = value?.toString() ?? "";
	}

	// Remove qualquer caractere não numérico
	value = value.replace(/\D/g, "");

	if (value.length <= 3) {
		return value;
	} else if (value.length <= 6) {
		return `${value.slice(0, 3)}.${value.slice(3)}`;
	} else if (value.length <= 9) {
		return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
	} else {
		return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
	}
};

export const rgFormatter = (value) => {
	if (typeof value !== "string") {
		value = value?.toString() ?? "";
	}

	// Remove qualquer caractere não numérico
	value = value.replace(/\D/g, "");

	if (value.length <= 2) {
		return value;
	} else if (value.length <= 5) {
		return `${value.slice(0, 2)}.${value.slice(2)}`;
	} else if (value.length <= 8) {
		return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
	} else {
		return `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}-${value.slice(8, 9)}`;
	}
};
