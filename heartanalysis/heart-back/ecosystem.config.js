module.exports = [
	{
		name: "apibase",
		cwd: "./dist/",
		script: "index.js",
		exec_mode: "cluster",
		instances: 3,
		watch: false,
	},
];
