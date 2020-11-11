import React, { Component } from "react";
import "./style.css";

class index extends Component {
	render() {
		return (
			<div className="loading-status-full-page">
				<div className="loading-spinner">
					<i className="fa fa-refresh fa-spin "></i> Please wait...
				</div>
			</div>
		);
	}
}

export default index;
