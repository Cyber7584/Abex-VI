import axios from "axios";

const BrasilApiHelper = {
	async getFeriados(
		anos: number[],
	): Promise<[{ date: string; name: string; type: string }]> {
		const feriados = [];

		for (const ano of anos) {
			const response = await axios.get(
				`https://brasilapi.com.br/api/feriados/v1/${ano}`,
			);
			const json = await response.data;
			feriados.push(...json);
		}

		return feriados as [{ date: string; name: string; type: string }];
	},
};

export default BrasilApiHelper;
module.exports = BrasilApiHelper;
