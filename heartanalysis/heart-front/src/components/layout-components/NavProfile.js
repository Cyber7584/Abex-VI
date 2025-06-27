import React from "react";
import { Dropdown, Switch } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import {
	LogoutOutlined, UserOutlined, ClearOutlined,
} from "@ant-design/icons";
import NavItem from "./NavItem";
import { signOut } from "store/slices/authSlice";
import styled from "@emotion/styled";
import { FONT_WEIGHT, MEDIA_QUERIES, SPACER } from "constants/ThemeConstant";
import requestCacheService from "services/RequestCacheService";
import { useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { onHeaderNavColorChange, onSwitchTheme } from "../../store/slices/themeSlice";
import { useThemeSwitcher } from "react-css-theme-switcher";

const Profile = styled.div(() => ({
	display: "flex",
	alignItems: "center",
}));

const UserInfo = styled("div")`
    padding-left: ${SPACER[2]};

    @media ${MEDIA_QUERIES.MOBILE} {
        display: none
    }
`;

const Name = styled.div(() => ({
	fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
	opacity: 0.8,
}));

const MenuItemSignOut = () => {

	const dispatch = useDispatch();

	const handleSignOut = () => {
		dispatch(signOut());
	};

	return (
		<div onClick={handleSignOut}>
			<LogoutOutlined className="mr-3" />
			<span className="font-weight-normal">
				Sair
			</span>
		</div>
	);
};

const MenuItemClearCache = () => {

	const clearCache = () => {
		requestCacheService.limparCache();
	};

	return (
		<div onClick={clearCache}>
			<ClearOutlined className="mr-3" />
			<span className="font-weight-normal">
				Limpar cache
			</span>
		</div>
	);
};

const MenuItemAbrirConta = () => {
	const navigate = useNavigate();

	const abrirTelaDadosConta = () => {
		navigate(`${APP_PREFIX_PATH}/dados-conta`);
	};

	return (
		<div onClick={abrirTelaDadosConta}>
			<UserOutlined className="mr-3" />
			<span className="font-weight-normal">
				Conta
			</span>
		</div>
	);
};

const MenuItemTemaEscuro = () => {
	const dispatch = useDispatch();

	const {
		currentTheme,
	} = useSelector(state => state.theme);

	const {
		switcher,
		themes,
	} = useThemeSwitcher();

	const toggleTheme = (isChecked) => {
		onHeaderNavColorChange("");
		const changedTheme = isChecked ? "dark" : "light";
		dispatch(onSwitchTheme(changedTheme));
		switcher({ theme: themes[changedTheme] });
	};

	return (
		<div
			className={`my-1 d-flex align-items-center justify-content-between`}
		>
			Tema escuro:
			<Switch checked={currentTheme === "dark"} onChange={toggleTheme} />
		</div>
	);
};

export const NavProfile = (props) => {
	const {
		user,
		mode,
	} = props;

	const items = [
		{
			label: <MenuItemClearCache />,
			key: "Clear Cache",
		},
		{
			label: <MenuItemAbrirConta />,
			key: "Account",
		},
		{
			key: "Sair",
			label: <MenuItemSignOut />,
		},
		{
			key: "Tema",
			label: <MenuItemTemaEscuro />,
		},
	];

	return (
		<Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
			<NavItem mode={mode}>
				<Profile>
					<UserOutlined style={{ fontSize: 20 }} />
					<UserInfo className="profile-text">
						<Name>{user.name}</Name>
						<Title>{user.role}</Title>
					</UserInfo>
				</Profile>
			</NavItem>
		</Dropdown>
	);
};

const mapStateToProps = ({ user }) => {
	return {
		user,
	};
};

export default connect(mapStateToProps, null)(NavProfile);
