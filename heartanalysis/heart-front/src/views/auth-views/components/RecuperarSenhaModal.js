import { Col, Row, Input, Button, Form } from "antd";
import React, { useState } from "react";
import Swal from "sweetalert2";
import recuperarSenhaService from "services/RecuperarSenhaService";

const RecuperarSenhaModal = ({ closeModal }) => {
	const [form] = Form.useForm();
	const [etapa, setEtapa] = useState(1);
	const [loading, setLoading] = useState(false);

	const fecharModal = () => {
		form.resetFields();
		setEtapa(1);
		closeModal();
	};

	const onFinish = async (values) => {
		try {
			if (etapa === 1) {
				await requisitarRecuperacaoSenha(values);
			} else if (etapa === 2) {
				verificarCodigo(values);
			} else if (etapa === 3) {
				trocarSenha(values);
			}
		} catch (e) {
			console.error(e);
		}
		setLoading(false);
	};

	const requisitarRecuperacaoSenha = async (values) => {
		setLoading(true);
		await recuperarSenhaService.requisitarRecuperacaoSenha(values.email);
		setEtapa(etapa + 1);
		Swal.fire({
			title: "Sucesso!",
			text: "Um código de verificação foi enviado para o seu e-mail. Verifique sua caixa de entrada e insira o código no campo abaixo.",
			icon: "success",
			confirmButtonText: "Ok",
		});
		setLoading(false);
	};

	const verificarCodigo = async (values) => {
		setLoading(true);
		try {
			await recuperarSenhaService.verificarCodigo(
				values.email,
				values.codigo_verificacao,
			);

			setEtapa(etapa + 1);
		} catch (e) {
			console.error(e);
		}
		setLoading(false);
	};

	const trocarSenha = async (values) => {
		setLoading(true);
		try {
			await recuperarSenhaService.trocarSenha(
				values.email,
				values.codigo_verificacao,
				values.senha,
			);

			Swal.fire({
				title: "Sucesso!",
				text: "Senha alterada com sucesso!",
				icon: "success",
				confirmButtonText: "Ok",
			});

			setLoading(false);
			fecharModal();
		} catch (e) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Ocorreu um erro ao tentar recuperar sua senha!",
			});

			setLoading(false);
		}
	};

	return (
		<div>
			<Form
				form={form}
				labelCol={{ span: 24 }}
				wrapperCol={{ span: 24 }}
				layout={"vertical"}
				onFinish={onFinish}
			>
				<Row>
					<Col span={24}>
						<Form.Item
							labelCol={24}
							label="E-mail"
							name="email"
							rules={[
								{
									required: true,
									message: "Esse campo é obrigatório",
								},
								({ getFieldValue }) => ({
									validator(_) {
										let email =
											getFieldValue("email") ?? "";
										if (email) {
											if (
												/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
													email,
												)
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													"Esse campo deve conter um e-mail válido!",
												),
											);
										} else {
											return Promise.resolve();
										}
									},
								}),
							]}
						>
							<Input disabled={etapa !== 1} />
						</Form.Item>
					</Col>
				</Row>
				{etapa > 1 && (
					<Row>
						<Col span={24}>
							<Form.Item
								labelCol={24}
								label="Código de verificação"
								name="codigo_verificacao"
								rules={[
									{
										required: true,
										message: "Esse campo é obrigatório",
									},
								]}
							>
								<Input disabled={etapa > 2} />
							</Form.Item>
						</Col>
					</Row>
				)}
				{etapa > 2 && (
					<Row>
						<Col span={24}>
							<Form.Item
								labelCol={24}
								label="Nova senha"
								name="senha"
								rules={[
									{
										required: true,
										message: "Esse campo é obrigatório",
									},
									{
										min: 6,
										message:
											"A senha deve conter no mínimo 6 caracteres!",
									},
								]}
							>
								<Input.Password />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								labelCol={24}
								label="Confirmar nova senha"
								name="senha_confirmacao"
								rules={[
									{
										required: true,
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
								<Input.Password />
							</Form.Item>
						</Col>
					</Row>
				)}
				<Row>
					{etapa === 3 && (
						<Col span={12}>
							<Button type="primary" htmlType="submit">
								Salvar
							</Button>
						</Col>
					)}
					{etapa < 3 && (
						<Col span={12}>
							<Button
								type="primary"
								htmlType="submit"
								loading={loading}
							>
								Próximo
							</Button>
						</Col>
					)}
				</Row>
			</Form>
		</div>
	);
};

export default RecuperarSenhaModal;
