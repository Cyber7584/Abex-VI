import axios from "axios";

export type ReportParams = {
	email: string;
	filters?: { description: string; value: string }[];
	data?: any[];
	title?: string;
	params?: { key: string; value: any; format?: "reais" | "data" }[];
};

const MerryReportHelper = {
	getPdf: async (reportId: string, reportParams: ReportParams) => {
		const report = await axios.post(
			`${process.env.MERRY_REPORT_URL}/api/v1/rpc/report/${reportId}`,
			reportParams,
			{
				headers: {
					Authorization: process.env.MERRY_REPORT_TOKEN,
				},
				responseType: "arraybuffer",
			},
		);

		return report.data;
	},
};

export default MerryReportHelper;
