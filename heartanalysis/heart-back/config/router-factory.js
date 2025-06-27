const express = require("express");
const routes = require("./router-files");
const path = require("path");
const moment = require("moment");
const app = express();
const cors = require('cors')
app.use(cors())

/**
 * Define os cabeçalhos em comum em todas as requisições, os quais impedem erros relacionados ao CORS policy.
 */
app.use((_, res, next) => {
	res.set("Access-Control-Allow-Headers", "Content-Type");
	res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Expose-Headers", "Content-Disposition");

	next();
});

app.use(
	express.urlencoded({
		extended: false,
	}),
);

app.use(express.json());
app.use(express.static("public"));
app.use(process.env.BASE_URL, express.static("public"));

app.use("/public", express.static(`${__dirname}/public`));

app.use(
	"/tec/public/images",
	express.static(path.join(__dirname, "..", "public", "images")),
);

app.use((req, res, next) => {
	res.locals.moment = moment;
	next();
});

routes.forEach((filename) => {
	if (filename.includes("*")) {
		const folder = filename.replace("*", "");
		const files = require("fs").readdirSync(folder);
		files.forEach((file) => {
			if (file.endsWith(".js") || file.endsWith(".ts")) {
				file = file.replace(".js", "").replace(".ts", "");
				app.use(require(`../${folder}${file}`));
			}
		});
	} else {
		app.use(require(filename));
	}
});

const modulos = require("fs")
	.readdirSync(path.join(__dirname, "..", "src", "module"))
	.filter((file) => {
		return (
			require("fs")
				.statSync(path.join(__dirname, "..", "src", "module", file))
				.isDirectory() && file !== "shared"
		);
	});

// Importa todos os crons
modulos.forEach((folder) => {
	const files = require("fs")
		.readdirSync(
			path.join(__dirname, "..", "src", "module", folder, "cron"),
		)
		.filter((file) => {
			return file.endsWith(".js") || file.endsWith(".ts");
		})
		.forEach((file) => {
			require(`../src/module/${folder}/cron/${file}`);
		});
});

app.get("/", (_, res) => res.send("<h1>API Base</h1>"));

app.set("view engine", "ejs");
app.set("views", ".");

module.exports = app;
