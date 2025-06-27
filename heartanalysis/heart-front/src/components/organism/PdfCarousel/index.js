import { useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import Loading from "components/atom/Loading";
import PdfCard from "./pdfCard";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";

class DocumentoHandler {
	#documento_array = [];

	get Data() {
		return this.#documento_array;
	}

	addDocs(docs) {
		this.#documento_array = docs.concat(this.#documento_array);
	}

	getById(id) {
		return this.#documento_array.find(doc => doc.id === id);
	}

	removeAll() {
		this.#documento_array = [];
	}

	changeById(id, changes) {
		const index = this.#documento_array.findIndex(doc => doc.id === id);
		Object.keys(changes).forEach(key => {
			this.#documento_array[index][key] = changes[key];
		});
	}
}

const documentoHandler = new DocumentoHandler();

const PDFCarousel = props => {
	const { arrayDocumentos } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [documentos, setDocumentos] = useState([]);

	function SampleNextArrow(props) {
		const {
			className,
			onClick,
			style
		} = props;

		if (!documentos || !documentos.length) return null;

		return (
			<div
				className={className}
				style={{
					...style,
					display: "block",
					background: "#00C44E",
					borderRadius: 50,
				}}
				onClick={onClick}>
				<RightCircleOutlined />
			</div>
		);
	}

	function SamplePrevArrow(props) {
		const {
			className,
			style,
			onClick,
		} = props;

		if (!documentos || !documentos.length) return null;

		return (
			<div
				className={className}
				style={{
					...style,
					display: "block",
					background: "#00C44E",
					borderRadius: 50,
				}}
				onClick={onClick}
			>
				<LeftCircleOutlined />
			</div>
		);
	}

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 1,
		initialSlide: 0,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
	};

	useEffect(() => {
		setIsLoading(true);

		documentoHandler.removeAll();

		documentoHandler.addDocs(arrayDocumentos.map(doc => ({
			name: doc.nome,
			id: doc.id,
			url: doc.link,
			mimeType: doc.mime,
			validade: doc.validade,
		})));

		setDocumentos(documentoHandler.Data);

		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [arrayDocumentos]);

	return (
		<Loading isLoading={isLoading}>
			<Slider {...settings}>
				{documentos.map((item, index) => (
					<PdfCard
						key={index}
						itemData={item}
						docClass={documentoHandler}
					/>
				))}
			</Slider>
		</Loading>
	);
};

export default PDFCarousel;
