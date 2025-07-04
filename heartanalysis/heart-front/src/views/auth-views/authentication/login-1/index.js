import React from "react";
import LoginForm from "../../components/LoginForm";
import { Card, Row, Col } from "antd";
import { PUBLIC_PREFIX_PATH } from "configs/AppConfig";

const backgroundStyle = {
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
};

const LoginOne = (props) => {
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									<img
										className="img-fluid"
										src={`${PUBLIC_PREFIX_PATH}/img/logo-comprido.png`}
										alt=""
									/>
								</div>
								<Row justify="center" style={{ marginTop: 15 }}>
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm {...props} />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default LoginOne;
