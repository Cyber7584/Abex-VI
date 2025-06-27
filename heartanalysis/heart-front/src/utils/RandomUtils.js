import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

/**
 * Retorna se a variável é válida
 * @param {any} valor
 * @returns {boolean} - True se o valor é válido, false caso contrário
 */
export const exists = (valor) => {
	if (typeof valor === "string") {
		valor = valor.trim();
	}
	return !(valor === null || valor === undefined || valor === "" || valor === "null" || valor === "undefined");
};

/**
 * Retorna a data ajustada para UTC
 * @param {dayjs.Dayjs} date
 * @returns {string} - Data formatada e ajustada para UTC
 */
export const dateUtcAdjust = (date) => {
	return date.add(3, 'h').format("YYYY-MM-DD HH:mm");
};

/**
 * Retorna a data ajustada para GMT
 * @param {dayjs.Dayjs} date
 * @returns {string} - Data formatada e ajustada para GMT
 */
export const dateGmtAdjust = (date) => {
	return date.subtract(3, 'h').format("YYYY-MM-DD HH:mm");
};

// 000.000.000-00
export const maskCPF = value => {
	if (!value) return null;
	return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

// 0.000.000
export const maskRG = value => {
	if (!value) return null;
	return value.replace(/\D/g, "").replace(/(\d)(\d{3})(\d{3})/, "$1.$2.$3");
};

// (00) 00000-0000
export const maskPhone = value => {
	if (!value) return null;
	value = value.replace(/\D/g, "");
	if (value.length === 10) {
		return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
	}
	return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

// 00000-000
export const maskCEP = value => {
	if (!value) return null;
	return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};

// 00/00/0000
export const maskDate = value => {
	if (!value) return null;
	return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{4})(\d)/, "$1");
};

// Aceita apenas que letras sejam digitadas
export const maskOnlyLetters = value => {
	if (!value) return null;
	return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "");
};

// Aceita apenas números
export const maskOnlyNumbers = value => {
	return value.replace(/\D/g, "");
};

// 00.000.000/0000-00
export const maskCNPJ = value => {
	return value.replace(/\D/g, "").replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
};
