import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	permissoes: {}
};

export const permissaoSlice = createSlice({
	name: "permissao",
	initialState,
	reducers: {
		updatePermissoes: (state, action) => {
			state.permissoes = {
				...action.payload.permissoes,
			};
		},
	},
});

export const { updatePermissoes } = permissaoSlice.actions;

export default permissaoSlice.reducer;
