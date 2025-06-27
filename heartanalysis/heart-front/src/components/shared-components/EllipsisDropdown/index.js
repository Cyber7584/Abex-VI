import React from "react";
import { Dropdown, Popconfirm } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import IntlMessage from "components/util-components/IntlMessage";

const EllipsisDropdown = (props) => {

	const menu = props.menu.map((item, index) => {
		const {
			visible = true,
			url = `${APP_PREFIX_PATH}/home`,
			title = "placeholder",
			icon = null,
			confirm = {
				title: null,
				onConfirm: () => {
				},
			},
			action,
		} = item;

		if (visible) {
			let label;
			if (confirm.title)
				label = <Popconfirm
					title={confirm.title}
					onConfirm={confirm.onConfirm}
					okText={<IntlMessage id="sim" />}
					cancelText={<IntlMessage id="nao" />}
				>
					<span>{title}</span>
				</Popconfirm>;
			else if (action) {
				label = <span onClick={action}>{title}</span>;
			} else {
				label = <Link to={url}>{title}</Link>;
			}

			return {
				label,
				key: index,
				icon: icon,
				children: item.children,
			};
		} else {
			return null;
		}
	}).filter((item) => item);

	return (
		<Dropdown
			menu={{ items: menu }}
			placement={props.placement}
			trigger={["click"]}
		>
			<div className="ellipsis-dropdown">
				<EllipsisOutlined />
			</div>
		</Dropdown>
	);
};

export default EllipsisDropdown;
