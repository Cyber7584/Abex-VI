import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

const { RangePicker } = DatePicker;

/*
  Essa classe torna fácil a pesquisa por período em datas.
  Somente para pesquisas server-side.
  Exemplo:
    const columns = [
      {
        title: 'Data',
        dataIndex: 'data',
        key: 'data',
        ...columnsDateRangeUtil.getColumnDateRangeProps({})
      }
    ]
*/
class ColumnDateRangeUtil {
	constructor() {
		this.dataInicio = null;
		this.dataFim = null;
	}

	disabledDaysRange = (current, from, limit) => {
		if (limit) {
			if (from) {
				return Math.abs(current.diff(from, "days")) >= 7;
			}
		}
		return false;
	};

	handleDatePick = (dateInput, confirm, clearFilters, setSelectedKeys, showTime) => {
		if (dateInput !== null) {
			const [dataInicio, dataFim] = dateInput;
			if (!showTime) {
				this.dataInicio = dayjs(dataInicio).startOf("day").format("YYYY-MM-DD 00:00:00");
				this.dataFim = dayjs(dataFim).startOf("day").format("YYYY-MM-DD 23:59:59");
			} else {
				this.dataInicio = dayjs(dataInicio).format("YYYY-MM-DD HH:mm:ss");
				this.dataFim = dayjs(dataFim).format("YYYY-MM-DD HH:mm:ss");
			}
			setSelectedKeys([this.dataInicio, this.dataFim]);
		} else {
			this.dataInicio = null;
			this.dataFim = null;
			clearFilters();
		}

		confirm();
	};

	handleReset = (clearFilters) => {
		clearFilters();
		this.dataInicio = null;
		this.dataFim = null;
	};

	getColumnDateRangeProps = ({
								   defaultValue,
								   rangeLimit = 0,
								   showTime = false,
							   }) => ({
		filterDropdown: ({
							 setSelectedKeys,
							 confirm,
							 clearFilters,
						 }) => (
			<div style={{ padding: 8 }}>
				<RangePicker
					showTime={showTime}
					format={"DD/MM/YY" + (showTime ? " HH:mm" : "")}
					style={{
						width: showTime ? 300 : 250,
						height: 36,
					}}
					placeholder={["Inicio", "Fim"]}
					defaultValue={
						this.dataInicio && this.dataFim
							? [dayjs(this.dataInicio), dayjs(this.dataFim)]
							: defaultValue ? defaultValue : [dayjs().startOf("month"), dayjs().endOf("month")]
					}
					presets={[
						{
							label: "Hoje",
							value: [dayjs().startOf("day"), dayjs().endOf("day")],
						},
						{
							label: "Essa semana",
							value: [dayjs().startOf("week"), dayjs().endOf("week")],
						},
						{
							label: "Esse mês",
							value: [dayjs().startOf("month"), dayjs().endOf("month")],
						},
					]}
					disabledDate={(current, { from }) => this.disabledDaysRange(current, from, rangeLimit)}
					onChange={(input) =>
						this.handleDatePick(
							input,
							confirm,
							clearFilters,
							setSelectedKeys,
							showTime,
						)
					}
				/>
			</div>
		),
		filterIcon: (filtered) => (
			<CalendarOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
	});
}

export default ColumnDateRangeUtil;
