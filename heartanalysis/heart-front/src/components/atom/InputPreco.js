import React from "react";
import { InputNumber } from "antd";

export default function InputPreco(props) {
	const { value, onChange } = props;

	return (
		<InputNumber
			style={{ width: "100%" }}
			formatter={(number) => Number(number).toFixed(2).replace(".", ",")}
			parser={(text) => {
				const numeroSemCasas = text
					.toString()
					.replace(/\./g, "")
					.replace(/,/g, "");
				return Number(numeroSemCasas / 100);
			}}
			stringMode={true}
			value={value}
			onChange={onChange}
			min={0}
		/>
	);
}
