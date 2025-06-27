import React from "react";
import { Card, Row, Col, Input, Form, Button } from "antd";
import { connect } from "react-redux";
import otpService from "services/OTPService";
import { authenticated } from "store/slices/authSlice";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { TipoOtpEnum } from "enum/tipo-otp-enum";
import { useNavigate, useParams } from "react-router-dom";

const backgroundStyle = {
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
};

const TwoFactorAuth = (props) => {
	const { authenticated } = props;
	const navigate = useNavigate();

	let {
		login_code,
		tipo,
	} = useParams();

	const onFinish = async (values) => {
		try {
			const res = await otpService.verificarOtp(login_code, values.otp);
			authenticated(`${res.token_type} ${res.token}`);
			navigate(APP_PREFIX_PATH);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-4">
								<Form
									labelCol={{ span: 24 }}
									wrapperCol={{ span: 24 }}
									layout={"vertical"}
									onFinish={onFinish}
								>
									<div style={{ textAlign: "center" }}>
										<h2>Autenticação de dois fatores</h2>

										{tipo ===
											TipoOtpEnum.APP.toString() && (
												<p style={{ marginTop: 16 }}>
													Utilize o app{" "}
													<b>Google Authenticator</b> para
													obter um código de autenticação
													temporário
												</p>
											)}
										{tipo ===
											TipoOtpEnum.EMAIL.toString() && (
												<p style={{ marginTop: 16 }}>
													Verifique seu e-mail para obter
													um código de autenticação
													temporário
												</p>
											)}
									</div>

									<Row gutter={16}>
										<Col xs={24} md={24}>
											<Form.Item
												label="Código"
												name="otp"
												rules={[
													{
														required: true,
														message:
															"Esse campo é obrigatório",
													},
												]}
											>
												<Input />
											</Form.Item>
										</Col>
									</Row>

									<Row gutter={16}>
										<Col xs={24} md={12}>
											<Form.Item>
												<Button
													type="primary"
													htmlType="submit"
												>
													Confirmar
												</Button>
											</Form.Item>
										</Col>
									</Row>
								</Form>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

const mapDispatchToProps = {
	authenticated,
};

export default connect(null, mapDispatchToProps)(TwoFactorAuth);
