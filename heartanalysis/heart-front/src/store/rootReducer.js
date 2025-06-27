import { combineReducers } from "redux";
import theme from "./slices/themeSlice";
import auth from "./slices/authSlice";
import user from "./slices/userSlice";
import menu from "./slices/menuSlice";
import permissao from "./slices/permissaoSlice";
import gui from "./slices/guiSlice";

const rootReducer = (asyncReducers) => (state, action) => {
	const combinedReducer = combineReducers({
		theme,
		auth,
		user,
		menu,
		permissao,
		gui,
		...asyncReducers,
	});
	return combinedReducer(state, action);
};

export default rootReducer;
