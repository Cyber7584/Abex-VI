"use strict";

module.exports = (sequelize, DataTypes) => {
	const RequisicaoRecuperacaoSenha = sequelize.define(
		"RequisicaoRecuperacaoSenha",
		{
			data_expiracao: DataTypes.DATE,
			codigo_verificacao: DataTypes.STRING,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "RequisicaoRecuperacaoSenha",
			schema: "heart",
			tableName: "requisicao_recuperacao_senha",
		},
	);

	RequisicaoRecuperacaoSenha.associate = function (model) {
		model.RequisicaoRecuperacaoSenha.belongsTo(model.Usuario, {
			foreignKey: "id_usuario",
			as: "usuario",
		});
	};

	return RequisicaoRecuperacaoSenha;
};
