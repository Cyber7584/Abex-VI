import fetch from "auth/FetchInterceptor";
import { AUTH_TOKEN } from "constants/AuthConstant";

const JwtAuthService = {};

JwtAuthService.login = function (email, password) {
	const body = {
		email: email,
		senha: password,
	};

	return fetch({
		url: "/v1/rpc/login",
		method: "post",
		headers: {
			"public-request": "true",
		},
		data: body,
	});
};

JwtAuthService.signUp = function (data) {
	return fetch({
		url: "/auth/signup",
		method: "post",
		headers: {
			"public-request": "true",
		},
		data: data,
	});
};

JwtAuthService.isLogged = () => {
	return localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);
};

export default JwtAuthService;
