import fetch from "auth/FetchInterceptor";
import requestCacheService from "./RequestCacheService";

const usuarioService = {};

usuarioService.get = async function (params = {}) {
	const {
		page = 0,
		pageSize = 5,
		search = "",
		orderBy = "id",
		orderDirection = "asc",
		filters = {},
	} = params;

	const queryParams = {
		page,
		pageSize,
		search,
		orderBy,
		orderDirection,
		filters,
	};

	return fetch({
		url: "/v1/rest/usuario",
		method: "get",
		params: queryParams,
		headers: { is_paginated: true },
	});
};

usuarioService.getAll = async function () {
	return requestCacheService.cacheRequest(
		"lista_usuarios",
		() => {
			return fetch({
				url: "/v1/rest/usuario",
				method: "get",
			});
		},
		300,
	);
};

usuarioService.post = async function (values) {
	return fetch({
		url: "/v1/rest/usuario",
		method: "post",
		data: values,
	});
};

usuarioService.put = async function (values, id) {
	return fetch({
		url: "/v1/rest/usuario/" + id,
		method: "put",
		data: values,
	});
};

usuarioService.getById = async (id) => {
	return fetch({
		url: `/v1/rest/usuario/${id}`,
		method: "get",
	});
};

usuarioService.delete = async (id) => {
	return fetch({
		url: `/v1/rest/usuario/${id}`,
		method: "delete",
	});
};

usuarioService.obterPropriosDados = async () => {
	return fetch({
		url: "/v1/rpc/obter-proprios-dados",
		method: "get",
	});
};

usuarioService.atualizarPropriosDados = async function (values) {
	return fetch({
		url: "/v1/rpc/atualizar-proprios-dados",
		method: "put",
		data: values,
	});
};

export default usuarioService;
