const { Op } = require("sequelize");

const paginationHelper = {};

paginationHelper.paginate = async (params) => {
	let {
		model, // A classe do Model do Sequelize
		filtersDefinition = [], // Uma lista de filtros possíveis.
		ordersDefinition = [], // Uma lista de ordenações possívels. Se o parâmetro 'orderBy'
		// abaixo não tiver uma entrada para ele, é usado diretamente na raiz do model
		include = null, // Includes no Model. Mesma sintaxe que as do Sequelize
		page = 0,
		pageSize = 5,
		orderBy = null,
		orderDirection = null,
		filters = {},
		defaultWhere = {}, // Um where padrão, que será adicionado junto às outras condições sempre
		group = null, // Um group nos padrões do Sequelize
		attributes = null, // Um array de atributos para serem buscados, nos padrões do Sequelize
		raw = null, // Se deve retornar os dados em formato raw, nos padrões do Sequelize,
		having = null, // Um having nos padrões do Sequelize
		distinct = null, // Um distinct nos padrões do Sequelize
	} = params;

	if (typeof filters === "string") {
		try {
			filters = JSON.parse(filters);
		} catch {
			filters = {};
		}
	}

	if (page < 0 || isNaN(page)) {
		throw new Error(`Página ${page} inválida`);
	}

	let data = await model.findAndCountAll({
		include,
		group,
		having,
		attributes,
		where: getPaginateWhere(filtersDefinition, filters, defaultWhere),
		order: getOrder(ordersDefinition, orderBy, orderDirection),
		limit: pageSize,
		group: group,
		attributes: attributes,
		offset: page * pageSize,
		raw: raw,
		having,
		distinct,
	});

	return {
		total: data.count,
		items: data.rows,
	};
};

function getPaginateWhere(filtersDefinition, filters, defaultWhere) {
	let payload = { ...defaultWhere };
	let temFiltro = !!defaultWhere;

	for (const [key, value] of Object.entries(filters)) {
		const filterDefinition = filtersDefinition.find((f) => f.key === key);

		if (filterDefinition) {
			const payloadKey = getPayloadKey(
				filterDefinition.type,
				value,
				filterDefinition.isInteger,
			);
			if (payloadKey) {
				payload[`$${filterDefinition.attribute}$`] = payloadKey;
				temFiltro = true;
			}
		}
	}

	if (!temFiltro) return null;

	return payload;
}

function getOrder(ordersDefinition, orderBy, orderDirection) {
	if (!orderBy) {
		return null;
	}

	const orderByDefinition = ordersDefinition.find((o) => o.key === orderBy);

	if (orderByDefinition) {
		return [[orderByDefinition.orderBy, orderDirection]];
	} else {
		return [[orderBy, orderDirection]];
	}
}

function getPayloadKey(type, value, isInteger) {
	let opType = Op.eq;
	switch (type) {
		case "equal":
			opType = Op.eq;
			if (Array.isArray(value) && value.length > 0) {
				value = value[0];
			}
			break;
		case "like":
			opType = Op.iLike;
			value = `%${value}%`;
			break;
		case "in":
			opType = Op.in;
			break;
		case "between":
			if (!value || value.length == 0) {
				return null;
			}
			opType = Op.between;
			break;
		case "exist":
			if (value[0] === true) {
				opType = Op.not;
				value = null;
			} else {
				opType = Op.eq;
				value = null;
			}
			break;
	}

	return {
		[opType]: isInteger && value !== null ? parseInt(value) : value,
	};
}

module.exports = paginationHelper;
