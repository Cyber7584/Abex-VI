import React, { useEffect } from "react";
import { onBlankLayout } from "store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { APP_PREFIX_PATH } from "../configs/AppConfig";

const AppRoute = ({
					  component: Component,
					  routeKey,
					  blankLayout,
					  ...props
				  }) => {

	const { permissao } = props;
	const dispatch = useDispatch();
	const { permissoes } = useSelector(state => state.permissao);

	useEffect(() => {
		const isBlank = !!blankLayout;
		dispatch(onBlankLayout(isBlank));
		// eslint-disable-next-line
	}, [blankLayout]);

	if (permissao && !permissoes[permissao]) {
		return <Navigate
			to={`${APP_PREFIX_PATH}`}
			replace
		/>;
	}

	return (
		<Component {...props} />
	);
};

export default AppRoute;
