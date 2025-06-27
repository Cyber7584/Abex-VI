import fetch from "auth/FetchInterceptor";
import { updateUser } from "../store/slices/userSlice";
import { updateNotifications } from "../store/slices/menuSlice";
import { updatePermissoes } from "../store/slices/permissaoSlice";
import store from "../store";

const MenuService = {};

/*
    Injeta na store do usuário os dados do menu
*/
MenuService.populateMenuData = async function() {
	const menuData = await MenuService.getMenuData();

	store.dispatch(updateUser({
		name: menuData.usuario.nome,
		role: menuData.usuario.grupo,
		id: menuData.usuario.id,
		email: menuData.usuario.email,
	}))

	store.dispatch(updateNotifications({
		notificacoes: menuData.notificacoes,
	}))

	store.dispatch(updatePermissoes({
		permissoes: menuData.permissoes,
	}))
};

/**
 * Busca as informações do usuário
 * @return {Promise<{
 *     usuario: {
 *         id: number,
 *         nome: string,
 *         email: string,
 *         grupo: number
 *     },
 *     permissoes: Record<string, boolean>,
 *     notificacoes: {
 *         cargasComAlerta: number
 *     }
 * }>}
 */
MenuService.getMenuData = function() {
	return fetch({
		url: "/v1/rpc/menu",
		method: "get",
	});
};

MenuService.increaseNotifications = function(notification) {
	store.dispatch(updateNotifications({
		[notification]: store.getState()?.menu[notification] + 1,
	}));
};

MenuService.decreaseNotifications = function(notification) {
	store.dispatch(updateNotifications({
		[notification]: store.getState()?.menu[notification] - 1,
	}));
};

MenuService.resetNotifications = function(notification) {
	store.dispatch(updateNotifications({
		[notification]: 0,
	}));
};

export default MenuService;
