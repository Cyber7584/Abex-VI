/*
    Esse helper é usado para automaticamente popular foreigkKeys dentro de um objeto de model
    a partir de um objeto de dados.
*/
const popularForeignKeyHelper = {};

/*
    Esse método busca todas as FKs de um objeto de model e popula caso
    o objeto de dados tenha um campo com o mesmo nome do atributo.
    
    Se o campo for numérico, ele o usa para procurar no banco pela PK.
    Se o campo for descritivo, ele o usa para procurar pelos atributos "nome" ou "descricao". 
*/
popularForeignKeyHelper.popularForeignKeysPorIdENome = async (
	objetoSequelize,
	dados,
	models,
	atributos = ["nome", "descricao"],
) => {
	const listaAtributos = Object.values(
		objetoSequelize.__proto__.rawAttributes,
	);
	const listaFks = listaAtributos.filter((a) => a.references);
	for (const fk of listaFks) {
		const nomeAtributo = fk.fieldName;

		if (!dados[nomeAtributo]) continue;

		if (Number.isInteger(dados[nomeAtributo])) {
			objetoSequelize[nomeAtributo] = dados[nomeAtributo];
		} else if (typeof dados[nomeAtributo] === "string") {
			const objeto = await findByAtributos(
				models[fk.references.model.name],
				dados[nomeAtributo],
				atributos,
			);
			if (objeto) {
				objetoSequelize[nomeAtributo] = objeto.id;
			}
		}
	}

	return objetoSequelize;
};

async function findByAtributos(model, value, atributos) {
	for (const atributo of atributos) {
		try {
			var objeto = await model.findOne({
				where: {
					[atributo]: value,
				},
			});

			if (objeto && objeto[atributo] === value) {
				return objeto;
			}
		} catch (e) {}
	}

	return null;
}

module.exports = popularForeignKeyHelper;
