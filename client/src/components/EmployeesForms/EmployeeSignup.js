import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import LoadPage from "../LoadingPage";
import "./Signin.css";

let jobTypeOptions = [
	{
		value: "receptionist",
		label: "Receptionist",
	},
	{
		value: "customer",
		label: "Customer",
	},
	{
		value: "groomer1",
		label: "Claudia",
	},
	{
		value: "groomer2",
		label: "Diana",
	},
	{
		value: "groomer3",
		label: "Groomer 3",
	},
	{
		value: "groomer4",
		label: "Groomer 4",
	},
	{
		value: "groomer5",
		label: "Groomer 5",
	},
	{
		value: "groomer6",
		label: "Groomer 6",
	},
];

const colourStyles = {
	control: (styles) => ({ ...styles, backgroundColor: "white" }),
	option: (styles) => {
		return {
			...styles,
			backgroundColor: "black",
		};
	},
};

class EmployeeSignUpForm extends Component {
	state = {
		empFirstName: "",
		empLastName: "",
		password: "",
		password2: "",
		jobType: "",
		errorMsg: "",
		email: "",
		username: "",
		loadingAxiosRequest: false,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	onSelectedChanged = (value) => {
		this.setState({
			jobType: value,
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const accessString = localStorage.getItem("JWT");

		if (
			!this.state.username ||
			!this.state.email ||
			!this.state.password ||
			!this.state.password2 ||
			!this.state.jobType
		) {
			return;
		}
		if (this.state.password !== this.state.password2) {
			console.log("Passwords don't match!");
			return;
		} else if (this.state.password.length < 6) {
			alert("Password must be at least 6 characters long!");
			return;
		}

		let newEmployee = {
			firstName: this.state.empFirstName,
			lastName: this.state.empLastName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			jobType: this.state.jobType.value,
		};

		this.setState({
			loadingAxiosRequest: true,
		});

		await axios
			.post("/auth/signup", newEmployee, {
				headers: { Authorization: `JWT ${accessString}` },
			})
			.then((res) =>
				this.setState({
					loadingAxiosRequest: false,
				})
			)
			.catch((error) => console.log(error));
		window.location.href = "/auth/admin";
	};
	render() {
		return (
			<div className="container">
				<div className="row">
					<div
						className="col-md-12"
						style={{
							border: "1px solid white",
							background: "#161515",
							color: "white",
							marginBottom: "30px",
						}}
					>
						<form
							className="white"
							onSubmit={this.handleSubmit.bind(this)}
							style={{ marginBottom: "50px" }}
						>
							<h2
								className="grey-text text-darken-3"
								style={{ textAlign: "center", marginTop: "15px" }}
							>
								Add a new employee
							</h2>
							<hr style={{ background: "white" }}></hr>
							<div className="input-field">
								<label htmlFor="jobType">* Job Type</label>
								<Select
									value={this.state.jobType}
									options={jobTypeOptions}
									placeholder="Job Type:"
									isSearchable={false}
									onChange={this.onSelectedChanged}
									styles={colourStyles}
								/>
							</div>
							<div className="input-field">
								<label>* Username</label>
								<input
									className="form-control"
									style={{ float: "right" }}
									type="text"
									id="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="employeeFirstName">* First Name</label>
								<input
									className="form-control"
									style={{ float: "right" }}
									type="text"
									id="empFirstName"
									value={this.state.empFirstName}
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="lastName">* Last Name</label>
								<input
									className="form-control"
									style={{ float: "right" }}
									type="text"
									id="empLastName"
									value={this.state.empLastName}
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="email">* Email</label>
								<input
									className="form-control"
									style={{ float: "right" }}
									type="email"
									id="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password">* Password</label>
								<input
									className="form-control"
									style={{ float: "right", marginBottom: "15px" }}
									type="password"
									id="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<label htmlFor="password">* Confirm Password</label>
								<input
									className="form-control"
									style={{ float: "right", marginBottom: "15px" }}
									type="password"
									id="password2"
									value={this.state.password2}
									onChange={this.handleChange}
								/>
							</div>
							{this.state.loadingAxiosRequest ? (
								<LoadPage />
							) : (
								<div className="">
									<button
										style={{ marginTop: "15px" }}
										className="btn-primary btn-block"
									>
										Create Account for employee
									</button>
								</div>
							)}
						</form>
						{/* <div>{clientInfoSearched}</div> */}
					</div>
				</div>
			</div>
		);
	}
}

export default EmployeeSignUpForm;
