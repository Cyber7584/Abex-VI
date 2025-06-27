import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	isLoading: false,
};

export const guiSlice = createSlice({
	name: "gui",
	initialState,
	reducers: {
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
});

export const { setIsLoading } = guiSlice.actions;

export default guiSlice.reducer;
