import React from "react";
import Flex from "components/shared-components/Flex";
import { PageHeaderAlt } from "components/layout-components/PageHeaderAlt";
import { setIsLoading } from "store/slices/guiSlice";
import { connect } from "react-redux";

export const Dashboard = ({
							  isLoading,
							  setIsLoading,
						  }) => {
	return (
		<div>
			<PageHeaderAlt className="border-bottom" style={{ height: 15 }}>
				<div className="container-fluid">
					<Flex
						justifyContent="between"
						alignItems="center"
						className="py-4"
					>
						<h2>Dashboard</h2>
					</Flex>
				</div>
			</PageHeaderAlt>
			<div className="code-box" style={{ marginTop: 20 }}>
				<div style={{ marginTop: 20 }}>
					<span
						style={{
							marginLeft: 20,
							fontSize: 22,
							fontWeight: "bold",
						}}
					></span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ gui }) => {
	return {
		isLoading: gui.isLoading,
	};
};

const mapDispatchToProps = { setIsLoading };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
