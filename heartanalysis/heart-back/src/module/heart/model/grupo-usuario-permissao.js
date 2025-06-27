"use strict";

module.exports = (sequelize, DataTypes) => {
	const GrupoUsuarioPermissao = sequelize.define(
		"GrupoUsuarioPermissao",
		{
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: "GrupoUsuarioPermissao",
			schema: "heart",
			tableName: "grupo_usuario_permissao",
		},
	);

	GrupoUsuarioPermissao.associate = function (model) {
		model.GrupoUsuarioPermissao.belongsTo(model.GrupoUsuario, {
			foreignKey: "id_grupo_usuario",
			as: "grupo_usuario",
		});

		model.GrupoUsuarioPermissao.belongsTo(model.Permissao, {
			foreignKey: "id_permissao",
			as: "permissao",
		});
	};

	return GrupoUsuarioPermissao;
};
