import React, {
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Loading from "components/atom/Loading";
import { useNavigate } from "react-router-dom";
import { setIsLoading } from "store/slices/guiSlice";
import { connect } from "react-redux";
import TemPermissao from "components/atom/TemPermissao";
import BackPageHeader from "components/atom/BackPageHeader";
import { useTranslation } from "react-i18next";
import DemoCard from "components/util-components/DemoCard";

/*
    Classe para criar um component de lista que é paginado no server.
    Cuidado ao usar essa classe em outros projetos, já que o método onChangeTable() provavelmente vai
    ter que ser adaptado à como o back-end recebe os dados de paginação.
*/
const GenericServerSideList = React.forwardRef((props, ref) => {
	const {
		title,
		newLabel = "Novo",
		newUrl,
		permissaoCriar,
		pageSize: initPageSize,
		initOrderBy,
		initOrderDirection = "asc",
		columns,
		getItemsAndTotal,
		isLoading,
		theme,
		setIsLoading,
		newCallback,
		extraButtons = [],
		initFilters = JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_filters`) ?? "{}"),
		expandable,
		extraFilters = {},
		scroll,
		backUrl,
		tableTitle,
		sutitle,
		card = true,
		showTitle = true
	} = props;
	let navigate = useNavigate();
	const [items, setItems] = useState([]);
	const [totalCount, setTotalCount] = useState(null);
	const { t } = useTranslation();

	const intervalRef = useRef();

	// Parâmetros da tabela
	const [page, setPage] = useState(0);
	const [orderBy, setOrderBy] = useState(null);
	const [orderDirection, setOrderDirection] = useState("asc");
	const [filters, setFilters] = useState({});
	const [pageSize, setPageSize] = useState(10);

	const getItems = async (
		page,
		orderBy,
		orderDirection,
		filters,
		pageSize,
	) => {
		setPage(page);
		setOrderBy(orderBy);
		setOrderDirection(orderDirection);
		setFilters(filters);
		setPageSize(pageSize);

		setIsLoading(true);

		const {
			items,
			total,
		} = await getItemsAndTotal(
			page,
			pageSize,
			orderBy,
			orderDirection,
			{
				...filters,
				...extraFilters,
			},
		);
		setItems(items);
		setTotalCount(total);

		setIsLoading(false);

		if (items.length === 0 && page > 0) {
			// Se a página veio vazia, volta uma página
			getItems(page - 1, orderBy, orderDirection, filters);
		}
	};

	useEffect(() => {
		let orderBy = JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_sort`) ?? "{}").key ?? initOrderBy;
		let orderDirection;

		if (JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_sort`) ?? "{}").order) {
			orderDirection = JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_sort`) ?? "{}").order === "descend" ? "desc" : "asc";
		} else {
			orderDirection = initOrderDirection;
		}

		let filters = {
			...initFilters,
			...JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_filters`) ?? "{}"),
		};

		getItems(
			0,
			orderBy,
			orderDirection,
			filters,
			initPageSize,
		);

		intervalRef.current = setInterval(() => {
			getItems(
				0,
				orderBy,
				orderDirection,
				filters,
				initPageSize,
			);
		}, 300000);

		return () => {
			clearInterval(intervalRef.current);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useImperativeHandle(ref, () => ({
		reload() {
			getItems(page, orderBy, orderDirection, filters, pageSize);
		},
	}));

	const onChangeTable = (pagination, filters, sorter, extra) => {
		const filtros = {};
		for (const key of Object.keys(filters)) {
			if (filters[key]) {
				filtros[key] = filters[key];
			}
		}

		clearInterval(intervalRef.current);

		getItems(
			pagination.current - 1,
			sorter.column?.key ?? initOrderBy,
			sorter.order ? (sorter.order === "descend" ? "desc" : "asc") : orderDirection,
			filtros,
			pagination.pageSize ?? initPageSize,
		);

		intervalRef.current = setInterval(() => {
			getItems(
				pagination.current - 1,
				sorter.column?.key ?? initOrderBy,
				sorter.order ? (sorter.order === "descend" ? "desc" : "asc") : orderDirection,
				filtros,
				pagination.pageSize ?? initPageSize,
			);
		}, 300000);

		if (Object.keys(filtros).length === 0) {
			sessionStorage.removeItem(`${title?.toLowerCase()}_filters`);
		} else {
			sessionStorage.setItem(`${title?.toLowerCase()}_filters`, JSON.stringify(filtros));
		}
		if (sorter.order === undefined) {
			sessionStorage.removeItem(`${title?.toLowerCase()}_sort`);
		} else {
			sessionStorage.setItem(`${title?.toLowerCase()}_sort`, JSON.stringify({
				key: sorter.columnKey,
				order: sorter.order,
			}));
		}
	};

	const onClickNovo = () => {
		if (newUrl) {
			navigate(newUrl);
		} else if (typeof newCallback === "function") {
			newCallback();
		}
	};

	const renderExtraButton = useCallback((extraButton) => {
		return React.isValidElement(extraButton) ? (
			extraButton
		) : (
			<Button
				className="ml-2"
				icon={extraButton.icon}
				key={extraButton.key ?? extraButton.label}
				onClick={extraButton.onClick}
				type={extraButton.type ?? "default"}
			>
				<span>{extraButton.label}</span>
			</Button>
		);
	}, []);

	const extra = (
		<>
			{extraButtons.map(renderExtraButton)}

			{(newUrl || typeof newCallback === "function") && (
				<TemPermissao
					permissao={permissaoCriar}
				>
					<Button
						icon={<PlusOutlined />}
						style={{backgroundColor: "#00C44E", color: "white", fontWeight: "bold"}}
						className="ml-2"
						onClick={onClickNovo}
					>
						{newLabel}
					</Button>
				</TemPermissao>
			)}
		</>
	);

	return (
		<Loading isLoading={isLoading}>
			{title && showTitle && (
				<BackPageHeader
					link={backUrl}
					title={title}
					subtitle={sutitle}
					extra={extra}
					backIcon={!!backUrl}
				/>
			)}
			<DemoCard card={card}>
				{tableTitle && (
					<div
						style={{
							margin: 10,
						}}
					>
						<span
							style={{
								fontSize: "24px",
								color: theme === "light" ? "#3e79f7" : "#d6d7dc",
								fontWeight: "bold",
							}}
						>
							{tableTitle}
						</span>
					</div>
				)}
				<Table
					rowKey={'id'}
					columns={columns.filter((item) => !item.hidden).map((item) => {
						return {
							...item,
							className: item.className ?? "primary",
							defaultFilteredValue: ({
								...initFilters,
								...JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_filters`) ?? "{}"),
							})[item.key],
							defaultSortOrder: (JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_sort`) ?? "{}")?.key ?? initOrderBy) === item.key ? (JSON.parse(sessionStorage.getItem(`${title?.toLowerCase()}_sort`) ?? "{}").order ?? initOrderDirection === "desc" ? "descend" : "ascend") : undefined,
						};
					})}
					dataSource={items}
					pagination={{
						pageSize: pageSize,
						total: totalCount,
						showTotal: (total, range) =>
							`${range[0]}-${range[1]} ${t("de")} ${total}`,
						showSizeChanger: true,
						pageSizeOptions: [10, 25, 50, 100],
					}}
					onChange={onChangeTable}
					expandable={expandable}
					scroll={scroll ?? { x: "max-content" }}
				/>
			</DemoCard>
		</Loading>
	);
});

const mapStateToProps = ({
							 gui,
							 theme,
						 }) => {
	return {
		isLoading: gui.isLoading,
		theme: theme.currentTheme,
	};
};

const mapDispatchToProps = { setIsLoading };

export default connect(mapStateToProps, mapDispatchToProps, null, {
	forwardRef: true,
})(GenericServerSideList);
