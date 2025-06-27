"use strict";

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            otp_habilitado: DataTypes.BOOLEAN,
            otp_secret: DataTypes.STRING,
            otp_tipo: DataTypes.INTEGER,
            otp_login_code: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Usuario",
            schema: "heart",
            tableName: "usuario",
        }
    );

    Usuario.associate = function (model) {
        model.Usuario.belongsTo(model.GrupoUsuario, {
            foreignKey: "id_grupo_usuario",
            as: "grupo_usuario",
        });

        model.Usuario.hasMany(model.RequisicaoRecuperacaoSenha, {
            foreignKey: "id_usuario",
            as: "requisicoes_recuperacao_senha",
        });

        // 🚀 Adicionando a relação com Aluno
        model.Usuario.hasOne(model.Aluno, {
            foreignKey: "id_usuario",
            as: "aluno",
        });

		model.Usuario.hasOne(model.Professor, {
            foreignKey: "id_usuario",
            as: "professor",
        });
    };

    return Usuario;
};
