const dev = {
	API_ENDPOINT_URL: "http://localhost:8080/heart/api",
	PUBLIC_PREFIX_PATH: "",
};

const prod = {
	API_ENDPOINT_URL: "",
	PUBLIC_PREFIX_PATH: "",
};

const test = {
	API_ENDPOINT_URL: "https://homolog.aula.com.br/heart-back/api",
	PUBLIC_PREFIX_PATH: "/heart",
};

const getEnv = () => {
	switch (process.env.REACT_APP_ENV) {
		case "development":
			return dev;
		case "production":
			return prod;
		case "test":
			return test;
		default:
			return dev;
	}
};

export const env = getEnv();
