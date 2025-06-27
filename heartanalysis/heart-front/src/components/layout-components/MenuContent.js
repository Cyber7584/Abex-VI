import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Menu, Grid } from "antd";
import IntlMessage from "../util-components/IntlMessage";
import Icon from "../util-components/Icon";
import navigationConfig from "configs/NavigationConfig";
import { useSelector, useDispatch } from "react-redux";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from "constants/ThemeConstant";
import utils from "utils";
import { onMobileNavToggle } from "store/slices/themeSlice";

const { useBreakpoint } = Grid;

const setLocale = (localeKey, isLocaleOn = true) =>
	isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
	let keyList = [];
	let keyString = "";
	if (key) {
		const arr = key.split("-");
		for (let index = 0; index < arr.length; index++) {
			const elm = arr[index];
			index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
			keyList.push(keyString);
		}
	}
	return keyList;
};

const MenuItem = ({
					  title,
					  icon,
					  path,
				  }) => {

	const dispatch = useDispatch();

	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");

	const closeMobileNav = () => {
		if (isMobile) {
			dispatch(onMobileNavToggle(false));
		}
	};

	return (
		<>
			{icon && <Icon type={icon} />}
			<span>{setLocale(title)}</span>
			{path && <Link onClick={closeMobileNav} to={path} />}
		</>
	);
};

const getSideNavMenuItem = (navItem) => navItem.map(nav => {
	return {
		key: nav.key,
		label: <MenuItem title={nav.title} {...(nav.isGroupTitle ? {} : {
			path: nav.path,
			icon: nav.icon,
		})} />,
		...(nav.isGroupTitle ? { type: "group" } : {}),
		...(nav.submenu.length > 0 ? { children: getSideNavMenuItem(nav.submenu) } : {}),
		permissao: nav.permissao
	};
});

const getTopNavMenuItem = (navItem) => navItem.map(nav => {
	return {
		key: nav.key,
		label: <MenuItem title={nav.title} icon={nav.icon} {...(nav.isGroupTitle ? {} : { path: nav.path })} />,
		...(nav.submenu.length > 0 ? { children: getTopNavMenuItem(nav.submenu) } : {}),
		permissao: nav.permissao
	};
});

const SideNavContent = (props) => {

	const {
		routeInfo,
		hideGroupTitle,
		sideNavTheme = SIDE_NAV_LIGHT,
	} = props;
	const { permissoes: listaPermissoes } = useSelector(state => state.permissao);

	const getPermitedChildren = (list) => {
		return list.map(i => {
			if (verificarPermissoesSubmenu(i)) {
				return i;
			} else {
				return null;
			}
		}).filter(i => i)
	}

	const verificarPermissoesSubmenu = (item) => {
		if (item) {
			let temPermissao = verificarPermissoes(item.permissao);

			if (item.children && item.children?.length > 0) {
				temPermissao =
					temPermissao && verificarPermissoesSubmenu(item.children);
			}

			return temPermissao;
		}

		return false;
	};

	const verificarPermissoes = useCallback(
		(permissoes) => {
			if (permissoes === undefined || permissoes === null) return true;

			if (!Array.isArray(permissoes)) permissoes = [permissoes];

			// Fica true caso tenha todas permissões
			for (const p of permissoes) {
				const temPermissao = !p || listaPermissoes[p];
				if (temPermissao) {
					return true;
				}
			}

			return false;
		},
		[listaPermissoes],
	);

	const menuItems = useMemo(() => getSideNavMenuItem(navigationConfig), []);
	let newItems = [];
	for (const items of menuItems) {

		const children = getPermitedChildren(items.children)

		if (children.length > 0) {
			newItems.push({
				...items,
				children,
			});
		}
	}

	return (
		<Menu
			mode="inline"
			theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
			style={{
				height: "100%",
				borderInlineEnd: 0,
			}}
			defaultSelectedKeys={[routeInfo?.key]}
			defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
			className={hideGroupTitle ? "hide-group-title" : ""}
			items={newItems}
		/>
	);
};

const TopNavContent = () => {

	const topNavColor = useSelector(state => state.theme.topNavColor);

	const menuItems = useMemo(() => getTopNavMenuItem(navigationConfig), []);

	return (
		<Menu
			mode="horizontal"
			style={{ backgroundColor: topNavColor }}
			items={menuItems}
		/>
	);
};

const MenuContent = (props) => {
	return props.type === NAV_TYPE_SIDE ? (
		<SideNavContent {...props} />
	) : (
		<TopNavContent {...props} />
	);
};

export default MenuContent;
