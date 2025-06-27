export const COLOR_1 = "rgb(0, 143, 251)";
export const COLOR_2 = "rgb(0, 227, 150)";
export const COLOR_3 = "rgb(254, 176, 25)";
export const COLOR_4 = "rgb(255, 69, 96)";
export const COLOR_5 = "rgb(119, 93, 208)";
export const COLOR_6 = "rgba(76,175,80)";
export const COLOR_7 = "rgba(249,206,29)";
export const COLOR_8 = "rgba(212,82,110)";
export const COLOR_9 = "rgba(19,216,170)";

export const COLOR_1_LIGHT = "rgba(62, 130, 247, 0.15)";
export const COLOR_2_LIGHT = "rgba(4, 209, 130, 0.1)";
export const COLOR_3_LIGHT = "rgba(222, 68, 54, 0.1)";
export const COLOR_4_LIGHT = "rgba(255, 193, 7, 0.1)";
export const COLOR_5_LIGHT = "rgba(139, 75, 157, 0.1)";
export const COLOR_6_LIGHT = "rgba(250, 140, 22, .1)";
export const COLOR_7_LIGHT = "rgba(23, 188, 255, 0.15)";

export const LOCALES = [{
	name: "pt-br",
	options: {
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		shortMonths: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
		shortDays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		toolbar: {
			download: "Baixar SVG",
			selection: "Selecionar",
			selectionZoom: "Selecionar Zoom",
			zoomIn: "Aproximar",
			zoomOut: "Afastar",
			pan: "Mover",
			reset: "Resetar Zoom",
		},
	},
}];

export const COLORS = [
	COLOR_1,
	COLOR_2,
	COLOR_3,
	COLOR_4,
	COLOR_5,
	COLOR_6,
	COLOR_7,
	COLOR_8,
	COLOR_9,
];

export const COLORS_LIGHT = [
	COLOR_1_LIGHT,
	COLOR_2_LIGHT,
	COLOR_3_LIGHT,
	COLOR_4_LIGHT,
	COLOR_5_LIGHT,
	COLOR_6_LIGHT,
	COLOR_7_LIGHT,
];

export const COLOR_AXES = "#edf2f9";
export const COLOR_TEXT = "#455560";

export const apexLineChartDefaultOption = {
	chart: {
		zoom: {
			enabled: false,
		},
		toolbar: {
			show: false,
		},
	},
	colors: [...COLORS],
	dataLabels: {
		enabled: false,
	},
	stroke: {
		width: 3,
		curve: "smooth",
		lineCap: "round",
	},
	legend: {
		position: "top",
		horizontalAlign: "right",
		offsetY: -15,
		itemMargin: {
			vertical: 20,
		},
		tooltipHoverFormatter: function(val, opts) {
			return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "";
		},
	},
	xaxis: {
		categories: [],
	},
	grid: {
		xaxis: {
			lines: {
				show: true,
			},
		},
		yaxis: {
			lines: {
				show: false,
			},
		},
	},
};

export const apexAreaChartDefaultOption = { ...apexLineChartDefaultOption };

export const apexBarChartDefaultOption = {
	chart: {
		zoom: {
			enabled: false,
		},
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: "25px",
			startingShapre: "rounded",
			endingShape: "rounded",
		},
	},
	colors: [...COLORS],
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 6,
		curve: "smooth",
		colors: ["transparent"],
	},
	legend: {
		position: "top",
		horizontalAlign: "right",
		offsetY: -15,
		inverseOrder: true,
		itemMargin: {
			vertical: 20,
		},
		tooltipHoverFormatter: function(val, opts) {
			return val + " - " + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + "";
		},
	},
	xaxis: {
		categories: [],
	},
	fill: {
		opacity: 1,
	},
	tooltip: {
		y: {
			formatter: val => (`${val}`),
		},
	},
};

export const apexPieChartDefaultOption = {
	colors: [...COLORS],
	plotOptions: {
		pie: {
			size: 50,
			donut: {
				labels: {
					show: true,
					total: {
						show: true,
						showAlways: true,
						label: "",
						fontSize: "18px",
						fontFamily: "Roboto",
						fontWeight: "bold",
						color: "#1a3353",
						formatter: function(w) {
							return w.globals.seriesTotals.reduce((a, b) => {
								return a + b;
							}, 0);
						},
					},
				},
				size: "87%",
			},
		},
	},
	labels: [],
	dataLabels: {
		enabled: false,
	},
	legend: {
		show: false,
	},
};

export const apexSparklineChartDefultOption = {
	chart: {
		type: "line",
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		width: 2,
		curve: "smooth",
	},
	tooltip: {
		fixed: {
			enabled: false,
		},
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function(seriesName) {
					return "";
				},
			},
		},
		marker: {
			show: false,
		},
	},
};

export const legendFormatter = (data) => {
	let html = "<span class='dygraph-legend-title'>" + data.xHTML + "</span>";
	data.series.forEach((series) => {
		if (!series.isVisible) return;

		let labeledData = series.labelHTML + " <b>" + series.yHTML + "</b>";

		if (series.isHighlighted) {
			labeledData = "<b>" + labeledData + "</b>";
		}

		html += `
			<div class='dygraph-legend-row'>
				${series.dashHTML}
				<div>
					${labeledData} ºC
				</div>
			</div>
		`;
	});
	return html;
};

export const exportToPng = (grafico) => {
	const canvas = grafico.graphDiv.querySelector("canvas");
	const dataUrl = canvas.toDataURL();
	const link = document.createElement("a");
	link.download = "grafico.png";
	link.href = dataUrl;
	link.click();
};

export const zoom = (g, zoomInPercentage) => {
	function offsetToPercentage(g, offsetX, offsetY) {
		// This is calculating the pixel offset of the leftmost date.
		let xOffset = g.toDomCoords(g.xAxisRange()[0], null)[0];
		let yar0 = g.yAxisRange(0);

		// This is calculating the pixel of the higest value. (Top pixel)
		let yOffset = g.toDomCoords(null, yar0[1])[1];

		// x y w and h are relative to the corner of the drawing area, so that the upper corner of the drawing area is (0, 0).
		let x = offsetX - xOffset;
		let y = offsetY - yOffset;

		// This is computing the rightmost pixel, effectively defining the width.
		let w = g.toDomCoords(g.xAxisRange()[1], null)[0] - xOffset;

		// This is computing the lowest pixel, effectively defining the height.
		let h = g.toDomCoords(null, yar0[0])[1] - yOffset;

		// Percentage from the left.
		let xPct = w === 0 ? 0 : (x / w);
		// Percentage from the top.
		let yPct = h === 0 ? 0 : (y / h);

		// The (1-) part below changes it from "% distance down from the top" to "% distance up from the bottom".
		return [xPct, (1 - yPct)];
	}

	const xBias = offsetToPercentage(g)[0] || 0.5;

	function adjustAxis(axis, zoomInPercentage, bias) {
		let delta = axis[1] - axis[0];
		let increment = delta * zoomInPercentage;
		let foo = [increment * bias, increment * (1 - bias)];
		return [axis[0] + foo[0], axis[1] - foo[1]];
	}

	g.doAnimatedZoom(g.xAxisRange(), adjustAxis(g.xAxisRange(), zoomInPercentage, xBias), null, null, () => {
	});
};

