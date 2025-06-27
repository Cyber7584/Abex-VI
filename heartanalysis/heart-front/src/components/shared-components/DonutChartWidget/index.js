import React from 'react'
import { Card } from 'antd';
import ApexChart from "react-apexcharts";
import { apexPieChartDefaultOption } from 'constants/ChartConstant';

const defaultOption = apexPieChartDefaultOption;

const Chart = props => {
	return (
		<ApexChart {...props} />
	)
}

const DonutChartWidget = props => {
	const { series = [], customOptions, labels = [], width = '100%', height = 250, title = '', extra, bodyClass } = props
	let options = JSON.parse(JSON.stringify(defaultOption))
	options.labels = labels
	options.plotOptions.pie.donut.labels.total.label = title
	if(!title) {
		options.plotOptions.pie.donut.labels.show = false
	}
	if(customOptions) {
		options = {...options, ...customOptions }
	}
	return (
		<Card>
			<div className={`text-center ${bodyClass}`}>
				<Chart type="donut" options={options} series={series} width={width} height={height} />
				{extra}
			</div>
		</Card>
	)
}

export default DonutChartWidget
