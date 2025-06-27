import axios from "axios";
import { API_BASE_URL } from "configs/AppConfig";
import { signOutSuccess } from "store/slices/authSlice";
import store from "../store";
import { AUTH_TOKEN } from "constants/AuthConstant";
import { notification } from "antd";

const unauthorizedCode = [400, 401, 403];

const service = axios.create({
	baseURL: API_BASE_URL,
	timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "authorization";

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN) ?? sessionStorage.getItem(AUTH_TOKEN);

	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = 'Bearer ' + jwtToken;
	} else {
		store.dispatch(signOutSuccess());
	}

	return config;
}, error => {
	// Do something with request error here
	notification.error({
		message: "Error",
	});
	Promise.reject(error);
});

// API response interceptor
service.interceptors.response.use((response) => {

	if (response.data.success) {
		if (response.config.method === "put") {
			notification.success({
				message: "Registro editado com sucesso!",
			});
		} else if (response.config.method === "post") {
			notification.success({
				message: "Registro criado com sucesso!",
			});
		} else if (response.config.method === "delete") {
			notification.success({
				message: "Registro deletado com sucesso!",
			});
		}
	}

	return response.data;
}, (error) => {
	if (!error.response) {
		return Promise.reject(error);
	}

	let notificationParam = {
		message: "",
	};

	// Remove token and redirect
	if (unauthorizedCode.includes(error.response.status)) {
		notificationParam.message = "Falha na autenticação!";
		notificationParam.description = "Porfavor realize o login novamente.";
		localStorage.removeItem(AUTH_TOKEN);
		sessionStorage.removeItem(AUTH_TOKEN);
		store.dispatch(signOutSuccess());
	}

	if (error.response.status === 404) {
		if (error.response.data?.message) {
			notificationParam.message = error.response.data.message;
		} else if (error.response.data?.error) {
			notificationParam.message = error.response.data.error;
		} else {
			notificationParam.message = "Não Encontrado!";
		}
	}

	if (error.response.status === 500) {
		if (error.response.data?.message) {
			notificationParam.message = error.response.data.message.toString();
		} else if (error.response.data?.error?.message) {
			notificationParam.message =
				error.response.data.error.message.toString();
		} else if (typeof error.response.data?.error == "string") {
			notificationParam.message = error.response.data.error.toString();
		} else {
			notificationParam.message = "Erro inesperado!";
		}
	}

	if (error.response.status === 508) {
		notificationParam.message = "Tempo esgotado!";
	}

	notification.error(notificationParam);

	return Promise.reject(error);
});

export default service;
