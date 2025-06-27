import { Input } from "antd";
import { useState } from "react";

export const CustomInputNumber = ({ formatter, parser, onChange, value, ...props }) => {

	const [formattedValue, setFormattedValue] = useState(formatter ? formatter(value) : value);

	const handleChange = (e) => {
		onChange(parser ? parser(e.target.value) : e.target.value);
		setFormattedValue(formatter ? formatter(e.target.value) : e.target.value)
	}

	return (
		<Input
			value={formattedValue}
			onChange={handleChange}
			{...props}
		/>
	)
}
