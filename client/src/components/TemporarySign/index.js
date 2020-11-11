import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import "./style.css";

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			notLoggedIn: false,
		};
	}

	componentDidMount() {
		const accessString = localStorage.getItem("JWT");
		if (accessString === null) {
			this.setState({
				notLoggedIn: true,
			});
		}
	}

	toggleModal = () => {
		this.setState({
			modal: !this.state.modal,
		});
	};

	closeModal = () => {
		this.setState({
			modal: false,
		});
	};

	render() {
		if (this.state.notLoggedIn)
			return (
				<div className="container ">
					<Modal
						size="xs"
						isOpen={this.props.modal}
						toggle={this.props.toggleModal}
					>
						{/* <ModalHeader toggle={this.toggleModal}></ModalHeader> */}
						<ModalBody className="temporarySign-container">
							<p onClick={this.props.close} className="closeButton-tempSign">
								CLOSE
							</p>
							<h4 className="covid-19-title">
								<i className="fas fa-paw"></i> CORONAVIRUS UPDATE!
							</h4>
							<br className="break-covid-poster" />
							<p className="covid-19-poster-paragraph">
								As of Tuesday, <b>May 19th</b> , we are re-opening our shop.{" "}
								<br /> Please be patient during the booking process as we are
								busier than ever. <br />
								Also, try to book by phone <i className="fas fa-phone"></i> as
								much as possible. <br />
								Thanks for your understanding.
							</p>

							<img
								className="covid-19-poster"
								src="./images/covid-19-poster-18X24.png"
								alt="poster"
							/>
						</ModalBody>
					</Modal>
				</div>
			);
		else {
			return null;
		}
	}
}

export default index;
