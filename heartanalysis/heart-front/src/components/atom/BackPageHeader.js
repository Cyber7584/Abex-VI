import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";

const { Header } = Layout;

/*
    Componente que mostra um cabeçalho com uma seta para voltar.
    Geralmente usado acima de páginas de formulários.
*/
export default function BackPageHeader(props) {
	const theme = useSelector((state) => state.theme.currentTheme);
	const {
		title,
		link,
		backIcon = true,
		subtitle,
		extra,
	} = props;

	const navigate = useNavigate();

	return (
		<Header
			style={{
				backgroundColor: theme === "dark" ? "#2f3a50" : "#fff",
				padding: 0,
				paddingLeft: 24,
				paddingRight: 24,
				borderBottom: `1px solid ${theme === "dark" ? "#4d5b75" : "rgb(235, 237, 240)"}`,
				display: "flex",
				alignItems: "center",
				flexDirection: "row",
			}}
		>
			{backIcon && link && (
				<Button
					type="text"
					onClick={() => navigate(link)}
					style={{ color: theme === "dark" ? "#fff" : "#000" }}
				>
					<ArrowLeftOutlined style={{ fontSize: 15 }} />
				</Button>
			)}
			<div style={{ marginLeft: backIcon ? 8 : 0 }}>
				<span style={{
					fontWeight: "bold",
					fontSize: 18,
					color: theme === "dark" ? "#fff" : "#000",
				}}>
					{title}
				</span>
				{subtitle && <span style={{
					fontSize: 15,
					color: theme === "dark" ? "#ccc" : "#666",
				}}>{subtitle}</span>}
			</div>
			<div style={{
				marginLeft: "auto",
				display: "flex",
				alignItems: "center",
			}}>
				{extra}
			</div>
		</Header>
	);
}
