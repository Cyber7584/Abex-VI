/*
    Essa função deve ser usada para atualizar uma sublista dentro de um outro model.
    Geralmente isso ocorre quando existe um formulário que tenha uma sublista dentro dela,
    por exemplo, o form de campanha.
    
    A função automaticamente deduz quais novos itens precisam ser criados, quais precisam
    ser atualizados e quais precisam ser excluídos.

    O callback é opcional e chamado após a inserção ou edição e um item. É usado para atualizar sublistas
    que estão dentro de outras.
*/
async function atualizarSubLista(model, listaAntiga, listaNova, callback) {
	if (!listaNova) return;

	await criarItens(model, listaAntiga, listaNova, callback);
	await atualizarItens(model, listaAntiga, listaNova, callback);
	await deletarItens(model, listaAntiga, listaNova);
}

async function criarItens(model, listaAntiga, listaNova, callback) {
	let itensParaCriar = [];

	for (let novoItem of listaNova) {
		if (!novoItem.id) {
			itensParaCriar.push(novoItem);
		}
	}

	for (let dadosItemParaCriar of itensParaCriar) {
		const item = await model.create(dadosItemParaCriar);
		if (callback) {
			await callback(item, dadosItemParaCriar);
		}
	}
}

async function atualizarItens(model, listaAntiga, listaNova, callback) {
	let itensParaAtualizar = [];

	for (let novoItem of listaNova) {
		if (novoItem.id) {
			itensParaAtualizar.push(novoItem);
		}
	}

	for (let dadosItemParaCriar of itensParaAtualizar) {
		const itemNoBanco = await model.findByPk(dadosItemParaCriar.id);
		if (itemNoBanco) {
			await itemNoBanco.update(dadosItemParaCriar);
			if (callback) {
				await callback(itemNoBanco, dadosItemParaCriar);
			}
		}
	}
}

async function deletarItens(model, listaAntiga, listaNova) {
	let itensParaDeletar = [];

	for (let itemAntigo of listaAntiga) {
		const item = listaNova.find((i) => i.id == itemAntigo.id);

		if (!item) {
			itensParaDeletar.push(itemAntigo);
		}
	}

	for (let itemParaDeletar of itensParaDeletar) {
		await itemParaDeletar.destroy();
	}
}

module.exports = {
	atualizarSubLista,
};
