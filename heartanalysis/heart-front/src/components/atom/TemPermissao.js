import useTemPermissao from "utils/hooks/useTemPermissao";
import React from "react";

/*
  Verifica se o usuário tem permissão para visualizar os
  filhos desse componente.
*/
function TemPermissao(props) {
	const { permissao, children } = props;
	const shouldShow = useTemPermissao(permissao);

	return <>{shouldShow && <>{children}</>}</>;
}

export default TemPermissao;
