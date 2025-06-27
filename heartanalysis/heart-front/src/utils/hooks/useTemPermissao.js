import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useTemPermissao(permissao) {
	const [temPermissao, setTemPermissao] = useState(false);
	const { permissoes: listaPermissoes } = useSelector((state) => state.permissao);

	useEffect(() => {
		let permissoes = permissao;
		if (!Array.isArray(permissoes)) permissoes = [permissoes];

		// Fica true caso tenha todas permissões
		for (const p of permissoes) {
			const temPermissao = !p || listaPermissoes[p];
			if (temPermissao) {
				setTemPermissao(true);
				return;
			}
		}

		setTemPermissao(false);
	}, [listaPermissoes, permissao]);

	return temPermissao;
}
