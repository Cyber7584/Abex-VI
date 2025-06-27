import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_TOKEN } from "constants/AuthConstant";
import AuthService from "services/JwtAuthService";
import MenuService from "services/MenuService";

export const initialState = {
	loading: false,
	message: "",
	showMessage: false,
	redirect: "",
	token: (localStorage.getItem(AUTH_TOKEN) ?? sessionStorage.getItem(AUTH_TOKEN)) || null,
};

export const signIn = createAsyncThunk("auth/signIn", async (data, { rejectWithValue }) => {
	const {
		email,
		password,
		manterLogado,
	} = data;
	try {
		const response = await AuthService.login(email, password);
		const token = response.token;
		if (manterLogado) {
			localStorage.setItem(AUTH_TOKEN, token);
		} else {
			sessionStorage.setItem(AUTH_TOKEN, token);
		}
		await MenuService.populateMenuData();
		return token;
	} catch (err) {
		return rejectWithValue(err.message || "Error");
	}
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
	Object.keys(localStorage).forEach((key) => {
		localStorage.removeItem(key);
	});
	Object.keys(sessionStorage).forEach((key) => {
		sessionStorage.removeItem(key);
	});
	return true;
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false;
			state.redirect = "/";
			state.token = action.payload;
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload;
			state.showMessage = true;
			state.loading = false;
		},
		hideAuthMessage: (state) => {
			state.message = "";
			state.showMessage = false;
		},
		signOutSuccess: (state) => {
			state.loading = false;
			state.token = null;
			state.redirect = "/";
		},
		showLoading: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.loading = false;
			state.token = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(signIn.pending, (state) => {
			state.loading = true;
		}).addCase(signIn.fulfilled, (state, action) => {
			state.loading = false;
			state.redirect = "/";
			state.token = action.payload;
		}).addCase(signIn.rejected, (state, action) => {
			state.message = action.payload;
			state.showMessage = true;
			state.loading = false;
		}).addCase(signOut.fulfilled, (state) => {
			state.loading = false;
			state.token = null;
			state.redirect = "/";
		}).addCase(signOut.rejected, (state) => {
			state.loading = false;
			state.token = null;
			state.redirect = "/";
		});
	},
});

export const {
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess,
} = authSlice.actions;

export default authSlice.reducer;
