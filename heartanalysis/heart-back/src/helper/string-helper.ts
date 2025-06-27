const stringHelper = {
	/**
	 * Utilidade para transformar string em uppercase
	 * sem ter que lidar com checagem se é null ou não
	 */
	upper: function (string: string) {
		if (typeof string === "string") return string.toUpperCase();
		return string;
	},

	/**
	 * Remove acentuação de uma string, inclusive cedilhas
	 * @param string
	 * @returns string sem acentuação
	 */
	removeAccentuation: function (string: string) {
		if (typeof string !== "string") return string;
		return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	},
};

export default stringHelper;
