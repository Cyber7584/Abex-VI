const ListHelper = {
	/**
	 * Filtra uma lista de objetos qualquer e retorna uma lista com apenas
	 * os objetos distintos. A função getKey que define qual é a condição para dois objetos
	 * serem iguais.
	 */
	getDistinctBy: (list: any[], getKey: (item: any) => any) => {
		let seen = new Set();
		return list.filter((item) => {
			let k = getKey(item);
			return seen.has(k) ? false : seen.add(k);
		});
	},
};

export default ListHelper;
module.exports = ListHelper;
