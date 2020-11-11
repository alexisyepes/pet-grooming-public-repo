import axios from "axios";
import React, { Component } from "react";
import API from "../../utils/APICAMBRIDGE";
import {
  Button,
  ModalBody,
  ModalHeader,
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import LoadPage from "../../components/LoadingPage";
import "./style.scss";

class Profile extends Component {
  state = {
    pets: [],
    lastName: "",
    firstName: "",
    primaryPhoneNumber: "",
    cellphone: "",
    workPhone: "",
    email: "",
    employee: "",
    petName: undefined,
    breed: undefined,
    petImg: "",
    type: undefined,
    notes: "",
    allowPhotoIsNotChecked: false,
    isLoading: true,
    error: false,
    modalToLogout: false,
    petsForThisOwner: [],
    idForThisClientOnModal: "",
    jobType: "",
    notChecked: true,
    errorMsg: "",
    loadingAxiosReq: false,
    rightArrow: false,
    buttonFlashing: false,

    // To logout
    emailLogout: "",
    password: "",
    errorMessage: "",
    loggedIn: false,
    showError: false,
    showNullError: false,
  };

  async componentDidMount() {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
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
          .then((res) => {
            this.setState({
              jobType: res.data.jobType,
            });
          })
          .catch((err) => console.log(err));
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

  toggleModalToLogout = () => {
    if (!this.state.modalToLogout) {
      this.setState({
        emailLogout: "",
        password: "",
        errorMessage: "",
      });
    }
    this.setState({
      modalToLogout: !this.state.modalToLogout,
    });
  };

  //Logout User
  handleLogOut = () => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("JOBTYPE");
    localStorage.removeItem("USERNAME");
    window.location.href = "/auth/login";
  };

  //Add client form submit
  handleFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.notChecked === true) {
      return this.setState({
        errorMsg: "Please accept our terms and conditions to continue",
        rightArrow: true,
        buttonFlashing: false,
      });
    }
    if (
      !this.state.lastName ||
      !this.state.firstName ||
      !this.state.primaryPhoneNumber
    ) {
      return this.setState({
        errorMsg: "Please enter the required fields above",
        rightArrow: false,
        buttonFlashing: false,
      });
    }
    this.setState({
      loadingAxiosReq: true,
    });
    await API.addClient({
      lastName: this.state.lastName.replace(/^./, (str) => str.toUpperCase()),
      firstName: this.state.firstName.replace(/^./, (str) => str.toUpperCase()),
      primaryPhoneNumber: this.state.primaryPhoneNumber.replace(/[- )(]/g, ""),
      cellphone: this.state.cellphone.replace(/[- )(]/g, ""),
      workPhone: this.state.workPhone.replace(/[- )(]/g, ""),
      email: this.state.email,
    })
      .then((res) => {
        window.location.href =
          "/auth/customer_cambridge/" + res.data.registrationNumber;
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  toggleChangeTermsAndConditions = () => {
    if (this.state.notChecked) {
      this.setState({
        errorMsg: "",
        rightArrow: false,
        buttonFlashing: true,
      });
    }
    this.setState({
      notChecked: !this.state.notChecked,
    });
  };

  toggleChangeAllowPhoto = () => {
    if (this.state.allowPhotoIsNotChecked) {
      this.setState({
        errorMsg: "",
      });
    }
    this.setState({
      allowPhotoIsNotChecked: !this.state.allowPhotoIsNotChecked,
    });
    console.log(this.state.allowPhotoIsNotChecked);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitLogout = async (e) => {
    e.preventDefault();
    const { emailLogout, password } = this.state;
    if (emailLogout === "" || password === "") {
      return this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false,
        errorMessage: "Enter admin credentials!",
      });
    } else {
      try {
        this.setState({
          loadingAxiosReq: true,
        });
        const response = await axios.post("/auth/logout", {
          emailLogout,
          password,
        });
        console.log(response);
        this.setState({
          loggedIn: true,
          showError: false,
          showNullError: false,
          errorMessage: "",
          loadingAxiosReq: false,
        });
        localStorage.removeItem("JWT");
        localStorage.removeItem("JOBTYPE");
        localStorage.removeItem("USERNAME");
        window.location.href = "/auth/login";
      } catch (error) {
        console.error(error.response);
        this.setState({
          errorMessage: error.response.data.message,
          loadingAxiosReq: false,
        });
        // console.log(error)
      }
    }
  };

  render() {
    const { isLoading, error, jobType } = this.state;
    if (error) {
      return (
        <div
          style={{
            marginTop: "10%",
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
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
            marginTop: "10%",
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
          }}
        >
          Loading Amazing Pet Grooming Data...try logging in again
        </div>
      );
    }

    if (jobType === "customer" || jobType === "admin") {
      return (
        <div>
          <div className="client-registration-content__cambridge">
            <div className="row justify-content-center ">
              <div className="col-md-12 mt-5">
                {/* <div className="logout-btn-parent">
                  <Button
                    className=" logoutBtnControlPanel logoutBtnControlPanel-registration"
                    color="warning"
                    onClick={this.toggleModalToLogout}
                  >
                    <i className="fas fa-key"></i> Staff Logout
                  </Button>
                </div> */}
                <div className="logo-client-registration-parent">
                  <img
                    className="logo-client-registration"
                    src="/images/logo_300.png"
                    alt="logo-customer"
                  />
                </div>
                <h4 className="controlPanelHeading-register text-align-center">
                  {/* Logout Btn */}
                  <i className="fas fa-user-plus"></i> New Clients-Registration
                  Cambridge
                </h4>
                <hr
                  style={{
                    borderTop: "1px solid black",
                    height: "0",
                  }}
                ></hr>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-registration-container">
                      <form
                        className="form-group"
                        onSubmit={this.handleFormSubmit.bind(this)}
                      >
                        <h4 className="form-registration-subheading text-align-center">
                          Owner Information
                        </h4>

                        <p>
                          {" "}
                          <b> * Fields required</b>
                        </p>
                        <hr
                          style={{
                            background: "grey",
                            marginTop: "10px",
                          }}
                        ></hr>
                        <div className="input-field-registration">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="* Last Name"
                            value={this.state.lastName}
                            name="lastName"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="input-field-registration">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="* First Name"
                            value={this.state.firstName}
                            name="firstName"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="input-field-registration">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="* Primary phone"
                            name="primaryPhoneNumber"
                            value={this.state.primaryPhoneNumber}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="input-field-registration">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Cellphone (optional)"
                            name="cellphone"
                            value={this.state.cellphone}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="input-field-registration">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Emergency phone (optional)"
                            name="workPhone"
                            value={this.state.workPhone}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="input-field-registration">
                          <input
                            className="form-control"
                            type="email"
                            placeholder="Email (optional)"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                          />
                          <p className="email-registration-paragraph text-align-center">
                            By providing my email address, I am authorizing
                            Amazing pet grooming to send me emails.
                          </p>
                        </div>
                        {this.state.loadingAxiosReq ? (
                          <LoadPage />
                        ) : (
                          <div className="input-field-registration">
                            {this.state.buttonFlashing ? (
                              <Button
                                color="success"
                                block
                                className="btn-primary lighten-1 z-depth-0 button-flashing-submit"
                                style={{
                                  marginTop: "10px",
                                  fontWeight: "700",
                                  fontSize: "22px",
                                }}
                              >
                                Click here to Submit
                              </Button>
                            ) : (
                              <Button
                                color="warning"
                                block
                                style={{
                                  marginTop: "10px",
                                  fontWeight: "700",
                                  fontSize: "22px",
                                }}
                                className="btn-primary lighten-1 z-depth-0"
                              >
                                Submit
                              </Button>
                            )}
                          </div>
                        )}
                      </form>
                      <p className="error-message-registration text-align-center">
                        {this.state.errorMsg}
                      </p>
                    </div>
                    {this.state.rightArrow ? (
                      <div>
                        <span className="right-arrow-registration">
                          <i className="fas fa-long-arrow-alt-right "></i>
                        </span>
                        <span className="right-arrow-registration">&nbsp;</span>
                        <span className="right-arrow-registration">&nbsp;</span>
                        <span className="right-arrow-registration">
                          <i className="fas fa-long-arrow-alt-right "></i>
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="col-lg-8 termsAndConditions-parent">
                    <h2 className="text-align-center">
                      <i className="fas fa-file-contract"></i> TERMS AND
                      CONDITIONS
                    </h2>
                    <p className="registration-paragraph text-align-justify">
                      The health of your pet is our primary concern. In case of
                      emergency, you, the owner, designates AMAZING PET GROOMING
                      as an agent and understand that AMAZING PET GROOMING will
                      do whatever is appropiate for the well-being of your pet's
                      health while in our care. If your pet becomes sick or
                      injured and requires professional attention, we will
                      attempt to contact you as soon as possible. However, if we
                      are unable to reach you, AMAZING PET GROOMING at its sole
                      discretion, may engage the services of a Veterinarian in
                      town and any expense shall be paid by you (the owner).
                      AMAZING PET GROOMING will not be liable for any accident
                      or injury to your pet caused while using the proper
                      grooming procedures.
                      <br />
                      AMAZING PET GROOMING has the right to refuse any services
                      at any time. In the event that your pet is too stressed or
                      becomes dangerous to groom, AMAZING PET GROOMING has the
                      right to refuse grooming services, stop grooming services,
                      or cancel grooming services at any time before, during, or
                      after grooming and client will be charged a grooming fee
                      (for what was done up until that point). For the safety of
                      the pet being groomed, as well as the professional pet
                      groomer, it is asked that you{" "}
                      <span className="terms-and-conditions-important">
                        Do not interrupt the groomer during grooming.
                      </span>{" "}
                      If you arrive to pick up your pet and it is still being
                      groomed, please{" "}
                      <span className="terms-and-conditions-important">
                        DO NOT talk to your pet or allow him/her to see you.{" "}
                      </span>{" "}
                      Please step outside for a few moments until the groom is
                      completed. Every effort will be made to insure your pet is
                      groomed as safely as possible, but an excited pet can be
                      dangerous to continue to work on. If you insist on talking
                      to your pet or the groomer, we reserve the right to end
                      the grooming session, even if the groom is not completed
                      and the full grooming price will be charged.
                      <br />
                      AMAZING PET GROOMING will not be held responsible for
                      allergic reactions resulting from manufacturer-recommended
                      usage of such products. Although a pet may experience an
                      allergic reaction to grooming procedures at any given
                      time, flea and tick products are often associated with a
                      higher incidence of reactions. Please consult a
                      veterinarian prior to having your pet treated if you have
                      any questions or concerns regarding your pet's sensitivity
                      to such treatments.
                      <br />
                      AMAZING PET GROOMING will not be held responsible for any
                      pre-existing medical condition or the aggravation of those
                      conditions, including: arthritis, heart-disease, diabetes,
                      obesity, infections, skin problems, or any other medical
                      problem that may be affected by the grooming process.
                      <br />
                      <span className="terms-and-conditions-important-vaccines">
                        Any new puppy / kitty clients being serviced in our
                        salon must be up to date on all required vaccinations.
                        Adult / senior, dogs / cats must be current on Rabies
                        and Distemper. Although we don't require proof, you
                        certify that this is true and can be verified at any
                        time.
                      </span>
                    </p>

                    <p className="agree-with-terms">
                      <input
                        className="checkbox-registration"
                        onChange={this.toggleChangeTermsAndConditions}
                        type="checkbox"
                        name="checkbox"
                        value={this.state.notChecked}
                      ></input>{" "}
                      <b>I agree with the above terms and conditions</b>
                      <span className="box-right-registration-container text-align-center">
                        <span className="left-arrow-registration">
                          <i className="fas fa-long-arrow-alt-left "></i>
                        </span>
                        <span className="box-registration-text">
                          Check box and fill out form to continue
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={this.state.modalToLogout}
            toggle={this.toggleModalToLogout}
          >
            <ModalHeader toggle={this.toggleModalToLogout}></ModalHeader>
            <ModalBody>
              <Form className="" onSubmit={this.handleSubmitLogout}>
                <h2 className="signin-title">
                  <i className="fas fa-lock"></i> - Staff Sign Out
                </h2>
                <hr style={{ background: "white" }}></hr>
                <FormGroup className="input-field">
                  <Label>* Email</Label>
                  <Input
                    type="email"
                    name="emailLogout"
                    value={this.state.emailLogout}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup className="input-field">
                  <Label htmlFor="password">* Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="btn-primary btn-block">Logout</Button>
                )}
                <h4 className="signout-form-err-msg text-align-center">
                  {this.state.errorMessage}
                </h4>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return (
        <div
          style={{
            marginTop: "100px",
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
          }}
        >
          You don't have permission to access this page
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </div>
      );
    }
  }
}

export default Profile;
