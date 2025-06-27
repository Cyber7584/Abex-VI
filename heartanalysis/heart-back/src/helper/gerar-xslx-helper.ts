import xlsx from "xlsx";

export type Header = { label: string; format: null | "reais" | "numero" };

export default function gerarXlsx(sheetHeader: any, data: any[]) {
	// Adiciona os formatos nas células, caso existam
	for (const [index, header] of Object.entries(sheetHeader)) {
		if ((header as any).format === "reais") {
			data = data.map((row) => {
				row[index] = {
					v: parseFloat(row[index]),
					t: "n",
					z: "[$R$-416] #,##0.00;-[$R$-416] #,##0.00",
				};
				return row;
			});
		}

		if ((header as any).format === "numero") {
			data = data.map((row) => {
				row[index] = { v: parseFloat(row[index]), t: "n", z: "0" };
				return row;
			});
		}

		sheetHeader[index] = (header as any).label || header;
	}

	const rows = [sheetHeader, ...data];
	const worksheet = xlsx.utils.json_to_sheet(rows, {
		skipHeader: true,
		cellStyles: true,
	});

	worksheet["!cols"] = Object.keys(sheetHeader).map((key) => {
		const maxWidth = rows.reduce((maxWidth: any, row: any) => {
			return Math.max(
				maxWidth,
				row[key] && row[key].length ? row[key].length : 0,
			);
		}, 0);

		return {
			wch: Math.min(Math.max(maxWidth, 8), 30),
		};
	});

	const workbook = xlsx.utils.book_new();

	xlsx.utils.book_append_sheet(workbook, worksheet, "Exportação");
	const sheetContent = xlsx.write(workbook, {
		type: "buffer",
		bookType: "xlsx",
	});

	return sheetContent;
}
