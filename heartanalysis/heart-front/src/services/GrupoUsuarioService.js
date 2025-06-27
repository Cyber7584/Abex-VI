import fetch from "auth/FetchInterceptor";

const grupoUsuarioService = {};

grupoUsuarioService.get = async function (params = {}) {
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
		url: "/v1/rest/grupo-usuario",
		method: "get",
		params: queryParams,
		headers: { is_paginated: true },
	});
};

grupoUsuarioService.getAll = async function () {
	return fetch({
		url: "/v1/rest/grupo-usuario",
		method: "get",
	});
};

grupoUsuarioService.post = async function (values) {
	return fetch({
		url: "/v1/rest/grupo-usuario",
		method: "post",
		data: values,
	});
};

grupoUsuarioService.put = async function (values, id) {
	return fetch({
		url: "/v1/rest/grupo-usuario/" + id,
		method: "put",
		data: values,
	});
};
grupoUsuarioService.getById = async (id) => {
	return fetch({
		url: `/v1/rest/grupo-usuario/${id}`,
		method: "get",
	});
};

grupoUsuarioService.delete = async (id) => {
	return fetch({
		url: `/v1/rest/grupo-usuario/${id}`,
		method: "delete",
	});
};

export default grupoUsuarioService;
