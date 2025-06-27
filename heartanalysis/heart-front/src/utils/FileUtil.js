export function readAsArrayBuffer(blob) {
	return new Promise((resolve, reject) => {
		if (!(blob instanceof Blob)) {
			throw new Error("arquivo inválido");
		}

		const fileReader = new FileReader();
		fileReader.onloadend = async function() {
			try {
				if (!(fileReader.result instanceof ArrayBuffer)) {
					throw new Error(
						"não foi possível analisar o conteúdo providenciado para escrita",
					);
				}

				resolve(fileReader.result);
			} catch (error) {
				reject(error);
			}
		};

		fileReader.onerror = reject;
		fileReader.readAsArrayBuffer(blob);
	});
}

export async function fetchImage(inputFilePath) {
	const response = await fetch(inputFilePath);
	return await response.blob();
}

export async function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = error => reject(error);
		reader.readAsDataURL(file);
	});
}

export async function imageToDataUrl(inputFile) {
	const imageBlob = await fetchImage(inputFile);
	return await getBase64(imageBlob);
}

export const criarFile = (base64, mimeType, nome) => {
	const base64String = `data:${mimeType};base64,${base64}`;

	const byteCharacters = atob(base64String.split(",")[1]);
	const byteNumbers = new Array(byteCharacters.length);

	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}

	const byteArray = new Uint8Array(byteNumbers);

	const blob = new Blob([byteArray], { type: mimeType });

	return new File([blob], nome, { type: mimeType });
};
