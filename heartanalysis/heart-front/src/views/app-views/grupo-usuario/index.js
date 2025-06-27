import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BackPageHeader from "components/atom/BackPageHeader";
import { setIsLoading } from "store/slices/guiSlice";
import { connect } from "react-redux";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import grupoUsuarioService from "services/GrupoUsuarioService";
import categoriaPermissaoService from "services/CategoriaPermissaoService";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Loading from "components/atom/Loading";
import DemoCard from "components/util-components/DemoCard";
import { isValidNumber } from "utils/NumberUtil";

const GrupoUsuario = ({
						  isLoading,
						  setIsLoading,
						  id_user,
					  }) => {
	const [categoriasPermissao, setCategoriasPermissao] = useState([]);

	let navigate = useNavigate();
	const obterDados = async () => {
		setIsLoading(true);
		try {
			await Promise.all([getById(), getPermissoes()]);
		} catch (e) {
			console.log("e ->", e);
		}
		setIsLoading(false);
	};

	const getPermissoes = async () => {
		setCategoriasPermissao(await categoriaPermissaoService.getAll());
	};

	let { "*": id } = useParams();

	const [form] = Form.useForm();

	const getById = async () => {
		if (isValidNumber(id)) {
			const dados = await grupoUsuarioService.getById(id);

			const permissoes = {};

			for (const p of dados.permissoes) {
				permissoes[p.id] = true;
			}

			form.setFieldsValue({
				descricao: dados.descricao,
				permissoes,
			});
		}
	};

	useEffect(() => {
		obterDados();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onFinish = async (values) => {
		setIsLoading(true);

		values.permissoes = Object.keys(values.permissoes).filter((id) => values.permissoes[id]).map((id) => Number(id));

		try {
			if (isValidNumber(id)) {
				await grupoUsuarioService.put(values, id);
			} else {
				await grupoUsuarioService.post(values);
			}

			if (Number(id) === id_user) {
				window.location.reload();
			} else {
				navigate(-1);
			}
		} catch (e) {
			console.error(e);
		}

		setIsLoading(false);
	};

	return (
		<Loading isLoading={isLoading}>
			<BackPageHeader
				link={`${APP_PREFIX_PATH}/lista-grupos-usuario`}
				title={
					(isValidNumber(id) ? "Edição" : "Cadastro") +
					" do grupo de usuário"
				}
			/>
			<DemoCard>
				<Form
					form={form}
					labelCol={{ span: 24 }}
					wrapperCol={{ span: 24 }}
					layout={"vertical"}
					onFinish={onFinish}
				>
					<Row gutter={16}>
						<Col xs={24}>
							<Form.Item
								label="Descrição"
								name="descricao"
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
					</Row>

					<h1>Permissões</h1>

					<Row gutter={[16, 16]}>
						{categoriasPermissao &&
							categoriasPermissao.map((categoria, index) => (
								<Col span={12} key={index}>
									<div style={{ marginBottom: 12 }}>
										<h3 style={{ marginBottom: 0 }}>
											{categoria.descricao}
										</h3>

										{categoria.permissoes &&
											categoria.permissoes.map(
												(permissao, index) => (
													<Form.Item
														key={index}
														style={{
															marginBottom: 0,
														}}
														valuePropName="checked"
														name={[
															"permissoes",
															permissao.id,
														]}
													>
														<Checkbox>
															{
																permissao.descricao
															}
														</Checkbox>
													</Form.Item>
												),
											)}
									</div>
								</Col>
							))}
					</Row>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							{isValidNumber(id) ? "Editar" : "Cadastrar"}
						</Button>
					</Form.Item>
				</Form>
			</DemoCard>
		</Loading>
	);
};

const mapStateToProps = ({
							 gui,
							 user,
						 }) => {
	return {
		isLoading: gui.isLoading,
		id_user: user.id,
	};
};

const mapDispatchToProps = { setIsLoading };

export default connect(mapStateToProps, mapDispatchToProps)(GrupoUsuario);
