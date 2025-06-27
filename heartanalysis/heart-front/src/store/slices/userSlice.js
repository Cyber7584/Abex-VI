import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
	name: null,
	role: null,
	id: null,
	email: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action) => {
			state.name = action.payload.name;
			state.role = action.payload.role;
			state.id = action.payload.id;
			state.email = action.payload.email;
		},
	},
});

export const {
	updateUser,
} = userSlice.actions;

export default userSlice.reducer;
