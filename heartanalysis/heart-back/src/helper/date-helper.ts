import BrasilApiHelper from "./brasil-api-helper";

var moment = require("moment-business-days");

const DateHelper = {
	/**
	 * Soma dias úteis à data passada
	 */
	async sumBusinessDays(date: string, days: number) {
		const year = moment(date).year();
		const feriados = await BrasilApiHelper.getFeriados([year, year + 1]);

		moment.updateLocale("pt-br", {
			holidays: feriados.map((feriado) => feriado.date),
			holidayFormat: "YYYY-MM-DD",
		});

		return moment(date).businessAdd(days);
	},
};

export default DateHelper;
module.exports = DateHelper;
