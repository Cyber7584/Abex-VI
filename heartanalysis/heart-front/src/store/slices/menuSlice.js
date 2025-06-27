import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	notificacoes: {
		cargasComAlerta: 0,
	},
};

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		updateNotifications: (state, action) => {
			state.notificacoes = {
				...state.notificacoes,
				...action.payload.notificacoes,
			};
		},
	},
});

export const { updateNotifications } = menuSlice.actions;

export default menuSlice.reducer;
