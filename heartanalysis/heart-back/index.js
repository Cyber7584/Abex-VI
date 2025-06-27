require("module-alias/register");

const { createServer } = require("http");
// const SocketExemplo = require("@heart/socket/socket-exemplo").default;

const dotenv = require("dotenv");

dotenv.config();

const app = require("./config/router-factory");

const http = createServer(app);

// const socketExemplo = SocketExemplo.getInstance();
// socketExemplo.setupSocket(http);

process.on("SIGINT", () =>
	http.close((error) => {
		if (error) {
			console.error(`${error.name}: ${error.message}`);
		}

		process.exit(error ? 1 : 0);
	}),
);

http.listen(8080, () => console.log("Servidor rodando, ouvindo em *:8080"));
