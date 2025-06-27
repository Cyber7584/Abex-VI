import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { EyeOutlined } from "@ant-design/icons";
import { notification, Tooltip, Image } from "antd";
import { Document, Page, pdfjs } from "react-pdf";
import Loading from "components/atom/Loading";
import { useEffect, useState } from "react";
import ModalController from "components/organism/ModalController";
import FotoPdfModal from "components/molecule/pdfFotoModal";
import fileService from "services/FileService";
import dayjs from "dayjs";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url,
).toString();

const PdfCard = props => {
	const {
		itemData,
		docClass,
	} = props;

	const [item, setItem] = useState(itemData);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const obterPdf = async () => {
		setIsLoading(true);
		try {
			const data = await fileService.get(item.url);
			const base64 = `data:${item.mimeType};base64,${data}`;

			setItem({
				...item,
				base64,
			});
			docClass.changeById(item.id, { base64 });
		} catch (error) {
			console.error(error);
			notification.error({
				message: "Erro ao obter PDF",
				description: item.name,
			});
		}
		setIsLoading(false);
	};

	const getMaxPages = (maxPages) => {
		const newItem = { ...item };
		newItem.pageMax = maxPages;
		newItem.page = 1;
		docClass.changeById(item.id, newItem);
		setItem(newItem);
	};

	useEffect(() => {
		setItem(itemData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemData]);

	useEffect(() => {
		if (item.url && !item.base64) {
			obterPdf();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			style={{
				padding: 10,
			}}
		>
			<h5
				style={{ textAlign: "center" }}
			>
				{item.name}
			</h5>
			<Loading isLoading={isLoading}>
				<div
					style={{
						height: 300,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: 10,
						borderRadius: 8,
						backgroundColor: "#CDCDCD",
					}}
				>
					{item.base64 && item.mimeType.includes('pdf') && <Document
						file={item.base64}
						onLoadSuccess={({ numPages }) => getMaxPages(numPages)}
					>
						<Page
							pageNumber={item.page || 1}
							height={290}
						/>
						<div style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							zIndex: 1000,
							fontSize: 18,
						}}>
							<Tooltip title={"Visualizar"}>
								<EyeOutlined
									onClick={() => setOpen(true)}
								/>
							</Tooltip>
						</div>
					</Document>
					}
					{item.base64 && item.mimeType.includes('image') &&
						<Image
							wrapperStyle={{
								display: 'none',
							}}
							src={item.url}
						/>
					}
				</div>
				<ModalController
					width={"90%"}
					minWidth={800}
					style={{ marginTop: -40 }}
					titleText={item.name}
					open={open}
					onCancel={() => setOpen(false)}
					footer={null}
				>
					<FotoPdfModal srcImg={item.base64} />
				</ModalController>
			</Loading>
			<h5
				style={{
					textAlign: "center",
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<span>Validade</span>
				<span>{dayjs(item.validade).format("DD/MM/YYYY")}</span>
			</h5>
		</div>
	);
};

export default PdfCard;
