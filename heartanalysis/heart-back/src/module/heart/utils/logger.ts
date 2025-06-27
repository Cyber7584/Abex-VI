import { createLogger, format } from "winston";
import LokiTransport from "winston-loki";

const options = {
	format: format.json(),
	transports: [] as any[],
};

if (process.env.LOKI_HOST_HEART) {
	const lokiTransport = new LokiTransport({
		host: process.env.LOKI_HOST_HEART,
		basicAuth: `${process.env.LOKI_USER_HEART}:${process.env.LOKI_PASSWORD_HEART}`,
		onConnectionError: (err) => {
			console.error(err);
		},
	});

	options.transports.push(lokiTransport);
}

const logger = createLogger(options);

export default logger;
