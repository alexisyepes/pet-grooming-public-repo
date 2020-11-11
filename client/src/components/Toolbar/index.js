import React, { Component, Fragment } from "react";
import "../SideDrawer/DrawerToggleButton";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./style.scss";

class toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employeeUsername: "",
      authorized: false,
      jobType: "",
      modal: false,
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    const accessString = localStorage.getItem("JWT");
    if (accessString == null) {
      this.setState({
        authorized: false,
      });
    } else {
      try {
        const employeeUsername = localStorage.getItem("USERNAME");
        const jobType = localStorage.getItem("JOBTYPE");

        this.setState({
          employeeUsername,
          authorized: true,
          jobType,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  //Logout User
  handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("JWT");
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("JOBTYPE");
    window.location.href = "/";
  }

  render() {
    const authorized = this.state.authorized;

    if (!authorized) {
      return (
        <header className="toolbar">
          <nav className="toolbar__navigation">
            <div />
            <div className="toolbar__toggle-button">
              <DrawerToggleButton click={this.props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo">
              <a href="/">
                <i className="fas fa-home homeIcon"></i> Amazing Pet Grooming{" "}
                <i className="fas fa-paw pawIconToolBar"></i>
              </a>
            </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
              <ul>
                <li>
                  <a
                    className="nav-items-no-loggedin book-appointment-navbar"
                    href="/schedule"
                  >
                    Book Appointment {""}
                    <i className="far fa-calendar-alt"></i>
                  </a>
                </li>
                <li>
                  <a className="nav-items-no-loggedin" href="/about">
                    About Us
                  </a>
                </li>
                <li>
                  <a className="nav-items-no-loggedin" href="/services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="nav-items-no-loggedin" href="/gallery">
                    Gallery
                  </a>
                </li>
                <li>
                  <a className="nav-items-no-loggedin" href="/contact">
                    Contact
                  </a>
                </li>
                <li>
                  <a className="nav-items-no-loggedin" href="/auth/login">
                    Staff
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
      );
    } else {
      return (
        <header className="toolbar">
          <nav className="toolbar__navigation">
            <div />
            <div className="toolbar__toggle-button">
              <DrawerToggleButton click={this.props.drawerClickHandler} />
            </div>
            <div className="toolbar__logo">
              <a href="/">
                <i className="fas fa-home homeIcon"></i>{" "}
                <span className="amazingpetgrooming-navbar">
                  Amazing Pet Grooming
                </span>{" "}
                <i className="fas fa-paw pawIconToolBar"></i>
              </a>
            </div>
            <div className="spacer" />
            <div className="toolbar_navigation-items">
              <ul>
                <li className="usernameLoggedinHome">
                  <i className="fas fa-user"></i>&nbsp; Logged in as:
                  {""} {this.state.employeeUsername}
                </li>
                <li className="logoutBtnNavBar" onClick={this.handleLogOut}>
                  <i className="fas fa-sign-out-alt"></i>
                  {""} Logout
                </li>
                {this.state.jobType === "receptionist" ? (
                  <Fragment>
                    <li className="commissionPage-btn">
                      {/* Comission Page */}
                      <a
                        href="/auth/commission"
                        className=" commissionBtnControlPanel"
                      >
                        <i className="fas fa-dollar-sign"></i> Daily Report
                      </a>
                    </li>
                    <li className="controlPanelNavbar">
                      <a href="/auth/reception">
                        <i className="fas fa-cog"></i> Control Panel
                      </a>
                    </li>
                  </Fragment>
                ) : null}

                {this.state.jobType === "admin" ? (
                  <div>
                    <li className="adminPanelBtnNavbar">
                      <a className="adminBtnNavbar" href="/auth/admin">
                        Admin Panel
                      </a>
                    </li>
                  </div>
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          </nav>
        </header>
      );
    }
  }
}

export default toolbar;
