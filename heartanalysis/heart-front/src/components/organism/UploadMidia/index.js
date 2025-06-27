import React, { useEffect, useState } from "react";
import { Upload, Modal, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API_BASE_URL } from "configs/AppConfig";
import { getBase64 } from "utils/FileUtil";
import { connect } from "react-redux";

const UploadMidia = props => {
	const {
		token,
		uploadImagem,
		uploadPdf,
		urlPost,
		label,
		atualizarDados,
		uploadRef,
	} = props;

	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState([]);

	const handleCancel = () => {
		setPreviewVisible(false);
	};

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
	};

	const handleChange = async ({ file }) => {
		if (file.status === "done") {
			file.id = file.response.file;
			if (atualizarDados) {
				await atualizarDados();
			}
		}
		setFileList([...fileList.filter(f => f.uid !== file.uid), file]);
	};

	if (uploadRef) {
		uploadRef.current = {
			setFileList,
		};
	}

	return (
		<div>
			<div>
				<div style={{
					width: 375,
					display: "flex",
				}}>
					{uploadImagem === true && (
						<div style={{
							flexGrow: 1,
							flexBasis: 0,
						}}>
							<div className="ant-upload-text">
								<PlusOutlined /> {label ? label : "Upload de Imagem"}
							</div>
							<Upload
								action={urlPost}
								listType="picture"
								accept="image/png, image/jpeg, image/jpg, image/webp"
								onChange={handleChange}
								headers={{ authorization: "Bearer " + token }}
								itemRender={() => <></>}
								beforeUpload={file => {
									const isPNG = file.type === "image/png";
									const isJpeg = file.type === "image/jpeg";
									const isJpg = file.type === "image/jpg";
									if (!isPNG && !isJpeg && !isJpg) {
										message.error(`${file.name} não é uma imagem`);
									}
									return isPNG || isJpeg || isJpg || Upload.LIST_IGNORE;
								}}
								multiple={true}>
								<Button>
								</Button>
							</Upload>
						</div>
					)}

					{uploadPdf === true && (
						<div style={{
							flexGrow: 1,
							flexBasis: 0,
						}}>
							<Upload
								action={urlPost}
								accept="application/pdf, application/doc, application/docx"
								onPreview={handlePreview}
								fileList={fileList}
								beforeUpload={file => {
									if (file.size > 100000000) {
										message.error("O arquivo deve ser menor que 100MB");
										return Upload.LIST_IGNORE;
									} else return true;
								}}
								onChange={file => {
									handleChange(file);
								}}
								headers={{ authorization: "Bearer " + token }}
								itemRender={() => <></>}>
								<Button>
									<div className="ant-upload-text">
										<PlusOutlined /> Upload de pdf
									</div>
								</Button>
							</Upload>
						</div>
					)}
				</div>
			</div>

			<div className="clearfix" style={{ marginTop: 10 }}>
				<Upload
					action={API_BASE_URL + "api/v1/rest/upload"}
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
					headers={{ authorization: "Bearer " + token }}
				/>
				<Modal
					open={previewVisible}
					footer={null}
					onCancel={handleCancel}
				>
					<img alt="example" style={{ width: "100%" }} src={previewImage} />
				</Modal>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return {
		token: auth.token,
	};
};


export default connect(mapStateToProps, null)(UploadMidia);
