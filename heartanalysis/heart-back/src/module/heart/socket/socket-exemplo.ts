const socket = require("socket.io");

// Para habilitar, descomente o setup no arquivo index.js principal
class SocketExemplo {
	private static instance: SocketExemplo;
	private io: any;

	private constructor() {}

	public static getInstance() {
		if (!SocketExemplo.instance) {
			SocketExemplo.instance = new SocketExemplo();
		}

		return SocketExemplo.instance;
	}

	setupSocket(server: any) {
		this.io = socket(server, {
			path: getSocketPath(),
		});

		this.io.on("connection", (socket: any) => {
			console.log("New connection", socket.id);

			socket.on("disconnect", () => {
				console.log("User disconnected", socket.id);
			});
		});
	}

	emitExemplo(data: any) {
		this.io.sockets.emit("exemplo", data);
	}
}

function getSocketPath() {
	switch (process.env.NODE_ENV) {
		case "development":
			return "/socket.io";
		case "test":
			return "/???/socket.io";
		case "production":
			return "/???/socket.io";
	}
}

export default SocketExemplo;
