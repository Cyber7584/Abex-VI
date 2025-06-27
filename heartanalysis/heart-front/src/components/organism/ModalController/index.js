import { Modal } from "antd";
import React from "react";
import Icon, { CloseCircleFilled } from "@ant-design/icons";

const ModalController = (props) => {
	const {
		children,
		onCancel = () => {},
		onOk = () => {},
		footer,
		width = "75%",
		style,
		okText,
		cancelText,
		open = false,
		setOpen = () => {},
		titleText,
		titleIcon,
		okButtonProps,
		cancelButtonProps,
		confirmLoading,
	} = props;

	const closeModal = async () => {
		setOpen(false);
		if (onCancel) {
			await onCancel();
		}
	};

	const confirmModal = async () => {
		setOpen(false);
		if (onOk) {
			await onOk();
		}
	};

	return (
		<Modal
			open={open}
			destroyOnClose={true}
			footer={footer}
			onCancel={closeModal}
			confirmLoading={confirmLoading}
			onOk={confirmModal}
			cancelButtonProps={cancelButtonProps}
			okButtonProps={okButtonProps}
			title={
				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}>
					{titleIcon && <Icon component={titleIcon} style={{ marginRight: 8 }} />}
					<span style={{
						color: "white",
						fontWeight: "bold",
					}}>
						{titleText}
					</span>
				</div>
			}
			width={width}
			styles={{
				header: {
					backgroundColor: "#5E5F60",
					padding: 7,
				},
				footer: {
					textAlign: "center",
					padding: 7,
				},
			}}
			style={style}
			okText={okText}
			cancelText={cancelText}
			closable={{
				closeIcon: <CloseCircleFilled style={{
					color: "white",
					fontSize: 20,
				}} />,
			}}
		>
			{children}
		</Modal>
	);
};

export default ModalController;
