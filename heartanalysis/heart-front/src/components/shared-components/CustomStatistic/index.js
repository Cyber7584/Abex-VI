import React from 'react'

const Value = props => {
	let value;
	switch(props.size) {
		case 'lg':
			value = <h1 className="mb-0 font-weight-bold">{props.value}</h1>
			break;
		case 'md':
			value = <h2 className="mb-0 font-weight-bold">{props.value}</h2>
			break;
		case 'sm':
			value = <h3 className="mb-0 font-weight-bold">{props.value}</h3>
			break;
		default:
			value = <h3 className="mb-0 font-weight-bold">{props.value}</h3>
	}
	return value
}

export const CustomStatistic = props => {
	const { size = 'md', value, title } = props;
	return (
		<div>
			<Value value={value} size={size}/>
			<p className="mb-0 text-muted">{title}</p>
		</div>
	)
}

export default CustomStatistic
