import axios from "axios";
import React, { Component } from "react";
import CalendarEmp1 from "../../components/Calendars/CalendarEmp1";
import CalendarEmp2 from "../../components/Calendars/CalendarEmp2";

import "./style.css";

class Profile extends Component {
	state = {
		email: "",
		employee: "",
		isLoading: true,
		error: false,
		jobType: "",
		firstName: "",
	};

	async componentDidMount() {
		window.scrollTo(0, 0);
		const accessString = localStorage.getItem("JWT");
		if (accessString == null) {
			this.setState({
				isLoading: false,
				error: true,
			});
		} else {
			try {
				await axios
					.get("/auth/employees_profile", {
						headers: { Authorization: `JWT ${accessString}` },
					})
					.then((res) =>
						this.setState({
							jobType: res.data.jobType,
							firstName: res.data.firstName,
						})
					)
					.catch((err) => console.log(err));

				window.scrollTo(0, 1000);

				this.setState({
					isLoading: false,
					error: false,
				});
			} catch (error) {
				console.error(error.response);
				this.setState({
					error: true,
				});
			}
		}
	}

	//Logout User
	handleLogOut(e) {
		e.preventDefault();
		localStorage.removeItem("JWT");
		window.location.href = "/auth/login";
	}

	render() {
		const { isLoading, error } = this.state;
		if (error) {
			return (
				<div
					style={{
						marginLeft: "10%",
						fontSize: "30px",
						height: "100vh",
						marginTop: "120px",
					}}
				>
					...Problem fetching user data. Please login again
					<span role="img" aria-label="Face With Rolling Eyes Emoji">
						🙄
					</span>
				</div>
			);
		}
		if (isLoading) {
			return (
				<div
					style={{
						marginTop: "120px",
						marginLeft: "10%",
						fontSize: "30px",
						height: "100vh",
					}}
				>
					Loading Amazing Pet Grooming Data...try logging in again
				</div>
			);
		}

		if (this.state.jobType === "groomer1") {
			return (
				<div className="cal-main-container">
					<main style={{ marginTop: "60px" }}></main>

					{/* <div className="row calendars-group"> */}
					<div id="Emp1Calendar" className="col-xl-12 col-md-12 col-12 cal-all">
						<CalendarEmp1 />
					</div>
					{/* </div> */}
				</div>
			);
		}

		if (this.state.jobType === "groomer2") {
			return (
				<div className="cal-main-container">
					<main style={{ marginTop: "60px" }}></main>

					{/* <div className="row calendars-group"> */}
					<div id="Emp1Calendar" className="col-xl-12 col-md-12 col-12 cal-all">
						<CalendarEmp2 />
					</div>
					{/* </div> */}
				</div>
			);
		} else {
			return (
				<div style={{ marginTop: "60px", marginLeft: "60px" }}>
					Nothing to show
				</div>
			);
		}
	}
}

export default Profile;
