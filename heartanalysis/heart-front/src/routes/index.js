import React, { useEffect, useRef } from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH, AUTHENTICATED_ENTRY } from "configs/AppConfig";
import { protectedRoutes, publicRoutes } from "configs/RoutesConfig";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppRoute from "./AppRoute";
import AuthService from "services/JwtAuthService";
import MenuService from "services/MenuService";

const Routes = () => {
	let intervalId = useRef(null);

	const populateMenu = async () => {
		try {
			if (AuthService.isLogged()) {
				await MenuService.populateMenuData();
			}
		} catch (e) {
		}

		intervalId.current = setInterval(async () => {
			if (AuthService.isLogged()) {
				await MenuService.populateMenuData();
			}
		}, 300000);
	};

	useEffect(() => {
		populateMenu();

		return () => {
			clearInterval(intervalId.current);
		};
	}, []);

	return (
		<RouterRoutes>
			<Route exact path="/" element={<Navigate replace to={APP_PREFIX_PATH} />} />
			<Route path={AUTH_PREFIX_PATH} element={<PublicRoute />}>
				{publicRoutes.map(route => {
					return (
						<Route
							key={route.key}
							path={route.path}
							element={
								<AppRoute
									routeKey={route.key}
									component={route.component}
									{...route.meta}
								/>
							}
						/>
					);
				})}
			</Route>
			<Route path={APP_PREFIX_PATH} element={<ProtectedRoute />}>
				<Route path={APP_PREFIX_PATH} element={<Navigate replace to={AUTHENTICATED_ENTRY} />} />
				{protectedRoutes.map((route, index) => {
					return (
						<Route
							key={route.key + index}
							path={route.path}
							element={
								<AppRoute
									routeKey={route.key}
									component={route.component}
									permissao={route.permissao}
									{...route.meta}
								/>
							}
						/>
					);
				})}
			</Route>

		</RouterRoutes>
	);
};

export default Routes;
