import { Card, Col, Image, Row } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import FotoPdfModal from "components/molecule/pdfFotoModal";
import ModalController from "../ModalController";
import { useState } from "react";
import fileService from "services/FileService";
import Loading from "components/atom/Loading";

const FileList = (props) => {
	const { files } = props;

	const [showFile, setShowFile] = useState(false);
	const [currentfile, setCurrentFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleFile = async (newfile) => {
		setIsLoading(true);
		try {
			const data = await fileService.get(newfile.link);
			const base64 = `data:${newfile.mime};base64,${data}`;

			setCurrentFile({
				...newfile,
				base64,
			});
			setShowFile(true);
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	return (
		<Loading isLoading={isLoading}>
			<Row gutter={[16, 16]}>
				{files.length > 0 && files.map((file, index) => (
					<Col xs={24} sm={12} md={8} lg={6} key={index}>
						<Card
							hoverable
							onClick={() => handleFile(file)}
							styles={{
								body: {
									padding: 15,
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row",
								},
							}}
						>
							<FileImageOutlined style={{
								fontSize: 40,
							}} />
							<div style={{
								display: "flex",
								width: "100%",
								flexDirection: "column",
								marginLeft: 15,
							}}>
								<span style={{ fontWeight: "bold" }}>{file.titulo}</span>
								<span
									style={{ fontSize: 12 }}>Validade: {dayjs(file.validade).format("DD/MM/YYYY")}</span>
							</div>
						</Card>
					</Col>
				))}
				<ModalController
					width={currentfile?.mime?.includes("pdf") ? "90%" : "50%"}
					style={{ marginTop: -40 }}
					titleText={currentfile?.titulo ?? ""}
					open={showFile}
					onCancel={() => setShowFile(false)}
					footer={null}
				>
					{currentfile?.mime?.includes("pdf") && <FotoPdfModal srcImg={currentfile?.base64 ?? ""} />}
					{currentfile?.mime?.includes("image") && <div style={{width: '100%', padding: 5}}><Image src={currentfile?.base64 ?? ""} width={"100%"} /> </div>}
				</ModalController>
			</Row>
		</Loading>
	);
};

export default FileList;
