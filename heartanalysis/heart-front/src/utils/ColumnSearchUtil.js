import { Button, Space, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

/*
  Essa classe torna fácil a pesquisa em colunas da table.
  Somente para pesquisas server-side.
  Exemplo:
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        sorter: (a, b) => 0,
        ...columnSearchUtil.getColumnSearchProps('nome')
      }
    ]
*/
class ColumnSearchUtil {
	constructor() {
		this.searchText = "";
		this.searchedColumn = "";
		this.searchInput = null;
	}

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.searchText = selectedKeys[0];
		this.searchedColumn = dataIndex;
	};

	handleReset = (clearFilters, confirm) => {
		clearFilters();
		confirm();
		this.searchText = "";
	};

	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
							 setSelectedKeys,
							 selectedKeys,
							 confirm,
							 clearFilters,
						 }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node;
					}}
					placeholder={`Buscar`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					onKeyDown={(e) => e.stopPropagation()}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
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
					<Button
						onClick={() => this.handleReset(clearFilters, confirm)}
						size="small"
						style={{ width: 90 }}
					>
						Limpar
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100);
			}
		},
		render: (text) =>
			this.searchedColumn === dataIndex ?
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[this.searchText]}
					autoEscape
					textToHighlight={text ? text.toString().trim() : ""}
				/>
				:
				`${text?.toString().trim() ?? "-"}`
		,
	});
}

export default ColumnSearchUtil;
