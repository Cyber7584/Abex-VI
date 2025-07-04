import React from "react";
import RegisterForm from "../../components/RegisterForm";
import { Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { PUBLIC_PREFIX_PATH } from "configs/AppConfig";

const backgroundStyle = {
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
};

const RegisterOne = (props) => {
	const theme = useSelector((state) => state.theme.currentTheme);
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-2">
								<div className="text-center">
									<img
										className="img-fluid"
										src={`${PUBLIC_PREFIX_PATH}/img/logo-comprido.png`}
										alt=""
									/>
									<p
										style={{ marginTop: 30 }}
										className="text-muted"
									>
										Criar uma nova conta:
									</p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<RegisterForm {...props} />
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

export default RegisterOne;
