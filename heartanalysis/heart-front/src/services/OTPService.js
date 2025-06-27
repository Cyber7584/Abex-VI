import fetch from "auth/FetchInterceptor";

const otpService = {};

otpService.habilitarOtp = async function () {
	return fetch({
		url: "/v1/rpc/habilitar-otp",
		method: "post",
	});
};

otpService.confirmarHabilitarOtp = async function (otp, tipo) {
	return fetch({
		url: "/v1/rpc/confirmar-habilitar-otp",
		method: "post",
		data: {
			otp,
			tipo,
		},
	});
};

otpService.enviarEmailOtp = async function (otp) {
	return fetch({
		url: "/v1/rpc/enviar-email-otp",
		method: "post",
		data: {
			otp,
		},
	});
};

otpService.desabilitarOtp = async function () {
	return fetch({
		url: "/v1/rpc/desabilitar-otp",
		method: "post",
	});
};

otpService.verificarOtp = async function (loginCode, otp) {
	return fetch({
		url: "/v1/rpc/verificar-otp",
		method: "post",
		data: {
			otp,
			login_code: loginCode,
		},
		headers: {
			"public-request": true,
		},
	});
};

export default otpService;
