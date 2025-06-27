import React from "react";
import { Col, Form, Input, Row, Select } from "antd";

const TabUsuarioGeral = (props) => {
	const {
		id,
		gruposUsuario,
	} = props;
	return (
		<>
			<Row gutter={16}>
				<Col xs={24} md={12}>
					<Form.Item
						label="Nome"
						name="nome"
						rules={[
							{
								required: true,
								message: "Esse campo é obrigatório",
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col xs={24} md={12}>
					<Form.Item
						label="Grupo de usuário"
						name="id_grupo_usuario"
						rules={[
							{
								required: true,
								message: "Esse campo é obrigatório",
							},
						]}
					>
						<Select
							filterOption={(input, option) =>
								(option.label ?? "")?.toString().toLowerCase().includes(input.toString().trim().toLowerCase())
							}
							showSearch={true}
							autoComplete="new-password"
							options={gruposUsuario?.map((grupoUsuario) => ({
								value: grupoUsuario.id,
								label: grupoUsuario.descricao,
							}))}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Row>
				<Col xs={24} md={24}>
					<Form.Item
						label="E-mail"
						name="email"
						rules={[
							{
								type: "email",
								message: "Insira o e-mail corretamente!"
							},
							{
								required: true,
								message: "Esse campo é obrigatório",
							},
							({ getFieldValue }) => ({
								validator(_) {
									if (
										getFieldValue("email").length !== 0
									) {
										if (
											getFieldValue("email").match(
												/^[a-z@.1-9_0]+$/,
											)
										) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error(
												"São permitidos neste campo apenas letras (a - z), números (0 - 9), underlines(_) e pontos (.)",
											),
										);
									} else {
										return Promise.reject();
									}
								},
							}),
						]}
					>
						<Input type='email' />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} md={12}>
					<Form.Item
						label="Senha"
						name="senha"
						initialValue={null}
						rules={[
							{
								required: id === undefined,
								message: "Esse campo é obrigatório",
							},
							{
								min: 6,
								message:
									"A senha deve conter no mínimo 6 caracteres!",
							},
						]}
					>
						<Input.Password autoComplete="new-password" />
					</Form.Item>
				</Col>

				<Col xs={24} md={12}>
					<Form.Item
						label="Confirmar senha"
						name="senha_confirm"
						rules={[
							{
								required: id === undefined,
								message: "Esse campo é obrigatório",
							},
							{
								min: 6,
								message:
									"A senha deve conter no mínimo 6 caracteres!",
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (
										!value ||
										getFieldValue("senha") === value
									) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											"As senhas devem ser iguais",
										),
									);
								},
							}),
						]}
					>
						<Input.Password
							min={4}
							autoComplete="new-password"
						/>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
};

export default TabUsuarioGeral;
