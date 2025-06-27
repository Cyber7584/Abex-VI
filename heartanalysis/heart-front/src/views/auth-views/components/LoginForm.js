import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import {
	signIn,
	showLoading,
	showAuthMessage,
	hideAuthMessage,
} from "store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const LoginForm = props => {

	const navigate = useNavigate();

	const {
		showForgetPassword,
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra,
		signIn,
		token,
		loading,
		redirect,
		showMessage,
		allowRedirect = true,
	} = props;

	const initialCredential = {
		email: "",
		password: "",
	};

	const onLogin = values => {
		showLoading();
		signIn(values);
	};

	useEffect(() => {
		if (token !== null && allowRedirect) {
			navigate(redirect);
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000);
			return () => {
				clearTimeout(timer);
			};
		}
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Form
				layout="vertical"
				name="login-form"
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item
					name="email"
					label="Email"
					rules={[
						{
							required: true,
							message: "Esse campo é obrigatório",
						},
						{
							type: "email",
							message: "Por favor, insira um e-mail válido!",
						},
						({ getFieldValue }) => ({
							validator(_) {
								const emailTemCaractereMaiusculo = /[A-Z]/.test(
									getFieldValue("email"),
								);
								if (emailTemCaractereMaiusculo) {
									return Promise.reject(
										"Por favor, insira o e-mail apenas com letras minúsculas!",
									);
								}

								return Promise.resolve();
							},
						}),
					]}>
					<Input prefix={<MailOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item
					name="password"
					label={
						<div
							className={`${showForgetPassword ? "d-flex justify-content-between w-100 align-items-center" : ""}`}>
							<span>Senha</span>
							{
								showForgetPassword &&
								<span
									onClick={() => onForgetPasswordClick}
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Esqueceu a senha?
								</span>
							}
						</div>
					}
					rules={[
						{
							required: true,
							message: "Esse campo é obrigatório",
						},
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item name="manterLogado" valuePropName="checked" initialValue={false}>
					<Checkbox type="checkbox">Manter Conectado</Checkbox>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						block
						loading={loading}
					>
						Entrar
					</Button>
				</Form.Item>
				{extra}
			</Form>
		</>
	);
};

const mapStateToProps = ({ auth }) => {
	const {
		loading,
		showMessage,
		token,
		redirect,
	} = auth;
	return {
		loading,
		showMessage,
		token,
		redirect,
	};
};

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
