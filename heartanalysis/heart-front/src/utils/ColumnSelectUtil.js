import { Button, Space, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/**
 * Essa classe torna fácil a pesquisa em colunas da table com um Select2.
 * Somente para pesquisas server-side.
 * Exemplo:
 * 	const columns = {
 *		title: "Código externo",
 *		dataIndex: "codigo_externo",
 *		key: "codigo_externo",
 *		...columnSelect2Util.getColumnSearchProps(
 *			"codigo_externo",
 *			opcoesEmpresa,
 *		),
 *	},
 */
class ColumnSelectUtil {
	constructor() {
		this.searchedColumn = "";
		this.searchInput = null;
	}

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.searchedColumn = dataIndex;
	};

	handleReset = (clearFilters) => {
		clearFilters();
	};
  
	getColumnSearchProps = (dataIndex, opcoes, retorno = 'id', width = 400) => 
		{ console.log(dataIndex,opcoes,retorno);
			return ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
			console.log(selectedKeys);
			return(
			<div style={{ padding: 8, width: width, maxWidth: width + 50 }}>
				<Select
					ref={(node) => {
						this.searchInput = node;
					}}
					mode="multiple"
					allowClear
					style={{ width: "100%" }}
					placeholder={`Pesquisar`}
					onChange={(value) => {
						setSelectedKeys(value);
					}}
					options={opcoes.map((opcao) => ({
						label: opcao.descricao,
						value: opcao[retorno],
					}))}
					value={selectedKeys}
					filterOption={(input, option) =>
						(option?.label ?? "").toString().toLowerCase().includes(input.toString().trim().toLowerCase())
					}
				/>
				<Space style={{ marginTop: 8 }}>
					<Button
						type="primary"
						onClick={() =>
							this.handleSearch(selectedKeys, confirm, dataIndex)
						}
						size="small"
						style={{ width: 90 }}
					>
						Buscar
					</Button>
				</Space>
			</div>
		)},
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.focus(), 100);
			}
		},
		render: (text) => text,
	})};
}

export default ColumnSelectUtil;
