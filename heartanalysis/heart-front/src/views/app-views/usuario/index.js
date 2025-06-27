import React, { useEffect, useState } from "react";
import { Button, Form, Tabs } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import BackPageHeader from "components/atom/BackPageHeader";
import { setIsLoading } from "store/slices/guiSlice";
import { connect, useSelector } from "react-redux";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import usuarioService from "services/UsuarioService";
import grupoUsuarioService from "services/GrupoUsuarioService";
import TabUsuarioGeral from "./tab-geral";
import Loading from "components/atom/Loading";
import DemoCard from "components/util-components/DemoCard";
import { isValidNumber } from "utils/NumberUtil";
import MenuService from "services/MenuService";

const Usuario = ({
					 isLoading,
					 setIsLoading,
				 }) => {
	const [form] = Form.useForm();
	const [gruposUsuario, setGruposUsuario] = useState([]);

	const obterDados = async () => {
		setIsLoading(true);
		try {
			await Promise.all([getById(), getGruposUsuario()]);
		} catch (e) {
			console.log(e);
		}
		setIsLoading(false);
	};

	let { "*": id } = useParams();
	const { id: id_logado } = useSelector(state => state.user);

	const getById = async () => {
		if (isValidNumber(id)) {
			let dados = await usuarioService.getById(id);
			form.setFieldsValue(dados);
		}
	};

	const getGruposUsuario = async () => {
		setGruposUsuario(await grupoUsuarioService.getAll());
	};

	let navigate = useNavigate();

	const onFinish = async (values) => {
		setIsLoading(true);

		try {
			if (isValidNumber(id)) {
				await usuarioService.put(values, id);

				if (Number(id) === id_logado) {
					await MenuService.populateMenuData();
				}

			} else {
				await usuarioService.post(values);
			}

			navigate(-1);
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		obterDados();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Loading isLoading={isLoading}>
			<BackPageHeader
				link={`${APP_PREFIX_PATH}/lista-usuarios`}
				title={
					(isValidNumber(id) ? "Edição" : "Cadastro") + " de usuário"
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
					<Tabs
						defaultActiveKey="1"
						items={[{
							key: "1",
							label: "Geral",
							children: <TabUsuarioGeral id={id} gruposUsuario={gruposUsuario} />,
						}]}
					/>

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

const mapStateToProps = ({ gui }) => {
	return {
		isLoading: gui.isLoading,
	};
};

const mapDispatchToProps = { setIsLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);
