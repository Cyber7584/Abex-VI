const filenames = {
	/**
	 * HEART REST.
	 */
	"heart/api/v1/rest": ["*"],

	/**
	 * HEART RPC.
	 */
	"heart/api/v1/rpc": ["*"],
};

function toFilesList(imports, folder) {
	return [...imports, ...filenames[folder].flatMap(toRelativePaths(folder))];
}

function toRelativePaths(folder) {
	return (filename) => {
		if (filename === "*") {
			return `src/module/${folder}/*`;
		}
		return `../src/module/${folder}/${filename}`;
	};
}

module.exports = Object.keys(filenames).reduce(toFilesList, []);
