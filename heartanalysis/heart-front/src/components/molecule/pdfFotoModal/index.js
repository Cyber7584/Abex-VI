import React from "react";

const FotoPdfModal = props => {
	const {
		srcImg,
	} = props;

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<iframe
				title={'Iframe'}
				src={srcImg}
				style={{
					width: "100%",
					minHeight: 600,
					margin: 15,
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			/>
		</div>
	);
};

export default FotoPdfModal;
