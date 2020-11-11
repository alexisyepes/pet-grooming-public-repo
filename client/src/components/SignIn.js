import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import "./Signin.css";

class SignIn extends Component {
	state = {
		email: "",
		password: "",
		errorMessage: "",
		loggedIn: false,
		showError: false,
		showNullError: false,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		if (email === "" || password === "") {
			this.setState({
				showError: false,
				showNullError: true,
				loggedIn: false,
			});
		} else {
			try {
				const response = await axios.post("/auth/login", {
					email,
					password,
				});
				localStorage.setItem("JWT", response.data.token);
				localStorage.setItem("USERNAME", response.data.username);
				localStorage.setItem("JOBTYPE", response.data.jobType);
				if (response.data.jobType === "admin") {
					window.location.href = "/auth/admin";
				}
				if (response.data.jobType === "customer") {
					window.location.href = "/auth/customer";
				}
				if (response.data.jobType === "groomer1") {
					window.location.href = "/auth/employees_profile";
				}
				if (response.data.jobType === "groomer2") {
					window.location.href = "/auth/employees_profile";
				}
				if (response.data.jobType === "receptionist") {
					window.location.href = "/auth/reception";
				}

				this.setState({
					loggedIn: true,
					showError: false,
					showNullError: false,
				});
			} catch (error) {
				console.error(error.response);
				this.setState({
					errorMessage: error.response.data.message,
				});
				// console.log(error)
			}
		}
	};
	render() {
		return (
			<div className="container signinPage col-lg-4">
				<div className=" form-box-signin">
					<img
						alt="-signin"
						src="/images/logo_300.png"
						className="logo-signin-form"
					></img>
					<Form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
						<h2 className="signin-title">
							<i className="fas fa-lock"></i> - Staff Sign In{" "}
						</h2>
						<hr style={{ background: "white" }}></hr>
						<FormGroup className="input-field">
							<Label htmlFor="email">* Email</Label>
							<Input
								type="email"
								id="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<FormGroup className="input-field">
							<Label htmlFor="password">* Password</Label>
							<Input
								type="password"
								id="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<Button className="btn-primary btn-block">Login</Button>
						<h4 className="signin-form-err-msg">{this.state.errorMessage}</h4>
					</Form>
				</div>
			</div>
		);
	}
}

export default SignIn;
