import React, { Component } from "react";
import axios from "axios";
import LoadPage from "../../components/LoadingPage";
import moment from "moment";
import {
  Button,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";
import "./style.scss";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobType: "",
      modalClaudia: false,
      modalDiana: false,
      modalPaola: false,
      modalGroomer1: false,
      loadingAxiosReq: false,
      errMsg: "",
      //claudia
      claudia: [],
      dateClaudia: moment(new Date()).format("YYYY-MM-DD"),
      clientNumberClaudia: "",
      nameBreedClaudia: "",
      arrivalTimeClaudia: "",
      pickupTimeClaudia: "",
      calledClaudia: false,
      costClaudia: "",
      tipClaudia: "",
      timeArrivalToUpdateClaudia: "",
      timePickupToUpdateClaudia: "",
      modalToUpdateAppointment: false,
      idForTimeClaudia: "",
      //Diana
      diana: [],
      dateDiana: moment(new Date()).format("YYYY-MM-DD"),
      clientNumberDiana: "",
      nameBreedDiana: "",
      arrivalTimeDiana: "",
      pickupTimeDiana: "",
      calledDiana: "",
      costDiana: "",
      tipDiana: "",
      timeArrivalToUpdateDiana: "",
      timePickupToUpdateDiana: "",
      modalToUpdateAppointmentDiana: false,
      idForTimeDiana: "",

      //Paola
      paola: [],
      datePaola: moment(new Date()).format("YYYY-MM-DD"),
      clientNumberPaola: "",
      nameBreedPaola: "",
      arrivalTimePaola: "",
      pickupTimePaola: "",
      calledPaola: "",
      costPaola: "",
      tipPaola: "",
      timeArrivalToUpdatePaola: "",
      timePickupToUpdatePaola: "",
      modalToUpdateAppointmentPaola: false,
      idForTimePaola: "",

      //Groomer1
      groomer1: [],
      dateGroomer1: moment(new Date()).format("YYYY-MM-DD"),
      clientNumberGroomer1: "",
      nameBreedGroomer1: "",
      arrivalTimeGroomer1: "",
      pickupTimeGroomer1: "",
      calledGroomer1: "",
      costGroomer1: "",
      tipGroomer1: "",
      timeArrivalToUpdateGroomer1: "",
      timePickupToUpdateGroomer1: "",
      modalToUpdateAppointmentGroomer1: false,
      idForTimeGroomer1: "",
    };
  }

  async componentDidMount() {
    alert(
      "This Page is used to control which pets have arrived for every groomer. It also helps to keep control on the time the pets are going home and if the owners have been called or not. \nThe cost and tip fields are saved in the database and this information is used to calculate the commission earned by the groomers. \nClick on one of the names to add a pet including cost and tips, and then go to Admin Panel, click on Commissions and select the date to see the calculated results."
    );
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
        this.getClaudiaApps();
        this.getDianaApps();
        this.getPaolaApps();
        this.getGroomer1Apps();
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeTime = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  toggleModalToUpdateClaudia = () => {
    if (this.state.modalToUpdateAppointment === false) {
      this.setState({
        clientNumberClaudia: "",
        nameBreedClaudia: "",
        arrivalTimeClaudia: "",
        pickupTimeClaudia: "",
        costClaudia: "",
        tipClaudia: "",
      });
    }
    this.setState({
      modalToUpdateAppointment: !this.state.modalToUpdateAppointment,
    });
  };

  toggleModalToUpdatePaola = () => {
    if (this.state.modalToUpdateAppointmentPaola === false) {
      this.setState({
        clientNumberPaola: "",
        nameBreedPaola: "",
        arrivalTimePaola: "",
        pickupTimePaola: "",
        costPaola: "",
        tipPaola: "",
      });
    }
    this.setState({
      modalToUpdateAppointmentPaola: !this.state.modalToUpdateAppointmentPaola,
    });
  };

  toggleModalToUpdateDiana = () => {
    if (this.state.modalToUpdateAppointmentDiana === false) {
      this.setState({
        clientNumberDiana: "",
        nameBreedDiana: "",
        arrivalTimeDiana: "",
        pickupTimeDiana: "",
        costDiana: "",
        tipDiana: "",
      });
    }
    this.setState({
      modalToUpdateAppointmentDiana: !this.state.modalToUpdateAppointmentDiana,
    });
  };

  toggleModalToUpdateGroomer1 = () => {
    if (this.state.modalToUpdateAppointmentGroomer1 === false) {
      this.setState({
        clientNumberGroomer1: "",
        nameBreedGroomer1: "",
        arrivalTimeGroomer1: "",
        pickupTimeGroomer1: "",
        costGroomer1: "",
        tipGroomer1: "",
      });
    }
    this.setState({
      modalToUpdateAppointmentGroomer1: !this.state
        .modalToUpdateAppointmentGroomer1,
    });
  };

  toggleModalDiana = () => {
    if (this.state.modalDiana === false) {
      this.setState({
        clientNumberDiana: "",
        nameBreedDiana: "",
        arrivalTimeDiana: "",
        pickupTimeDiana: "",
        costDiana: "",
        tipDiana: "",
        errMsg: "",
      });
    }
    this.setState({
      modalDiana: !this.state.modalDiana,
    });
  };

  toggleModalPaola = () => {
    if (this.state.modalPaola === false) {
      this.setState({
        clientNumberPaola: "",
        nameBreedPaola: "",
        arrivalTimePaola: "",
        pickupTimePaola: "",
        costPaola: "",
        tipPaola: "",
        errMsg: "",
      });
    }
    this.setState({
      modalPaola: !this.state.modalPaola,
    });
  };

  toggleModalGroomer1 = () => {
    if (this.state.modalGroomer1 === false) {
      this.setState({
        clientNumberGroomer1: "",
        nameBreedGroomer1: "",
        arrivalTimeGroomer1: "",
        pickupTimeGroomer1: "",
        costGroomer1: "",
        tipGroomer1: "",
        errMsg: "",
      });
    }
    this.setState({
      modalGroomer1: !this.state.modalGroomer1,
    });
  };

  toggleModalClaudia = () => {
    if (this.state.modalClaudia === false) {
      this.setState({
        clientNumberClaudia: "",
        nameBreedClaudia: "",
        arrivalTimeClaudia: "",
        pickupTimeClaudia: "",
        costClaudia: "",
        tipClaudia: "",
      });
    }
    this.setState({
      modalClaudia: !this.state.modalClaudia,
    });
  };

  // GROOMER 1 FUNCTIONS ***************************************************************
  getGroomer1Apps = async () => {
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/groomer1/" + todayDate)
      .then((res) => {
        this.setState({
          groomer1: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  submitFormGroomer1 = async (e) => {
    e.preventDefault();
    if (
      !this.state.clientNumberGroomer1 ||
      !this.state.nameBreedGroomer1 ||
      !this.state.arrivalTimeGroomer1 ||
      !this.state.pickupTimeGroomer1
    ) {
      return this.setState({
        errMsg: "Missing some of the required fields!",
      });
    }

    const commission = {
      date: this.state.dateGroomer1,
      clientNumber: this.state.clientNumberGroomer1,
      nameBreed: this.state.nameBreedGroomer1,
      arrivalTime: this.state.arrivalTimeGroomer1,
      pickupTime: this.state.pickupTimeGroomer1,
      called: false,
      cost: 0,
      tip: 0,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .post("/auth/commission/groomer1", commission)
      .then(() => {
        this.getGroomer1Apps();
        this.setState({
          modalGroomer1: false,
          clientNumberGroomer1: "",
          nameBreedGroomer1: "",
          costGroomer1: 0,
          tipGroomer1: 0,
          calledGroomer1: false,
          arrivalTimeGroomer1: "",
          pickupTimeGroomer1: "",
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  editInfoGroomer1 = async (e) => {
    e.preventDefault();
    const id = this.state.idForTimeGroomer1;
    let infoUpdated = {
      clientNumber: this.state.clientNumberGroomer1,
      nameBreed: this.state.nameBreedGroomer1,
      arrivalTime: this.state.arrivalTimeGroomer1,
      pickupTime: this.state.pickupTimeGroomer1,
      cost: this.state.costGroomer1,
      tip: this.state.tipGroomer1,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .put("/auth/commission/groomer1/" + id, infoUpdated)
      .then(() => {
        this.getGroomer1Apps();
        this.setState({
          modalToUpdateAppointmentGroomer1: false,
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  callToggleGroomer1 = async ({ currentTarget }) => {
    const id = currentTarget.value;
    let callBoolean = {
      called: !this.state.calledGroomer1,
    };
    this.setState((prevState) => ({
      calledGroomer1: !prevState.calledGroomer1,
      loadingAxiosReq: true,
    }));
    await axios
      .put("/auth/commission/groomer1/" + id, callBoolean)
      .then(() => {
        this.setState({
          loadingAxiosReq: false,
        });
        this.getGroomer1Apps();
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  setIdValueForTimeGroomer1 = async ({ currentTarget }) => {
    const id = currentTarget.value;
    this.toggleModalToUpdateGroomer1();

    await axios
      .get("/auth/commission/groomer1s/" + id)
      .then((res) => {
        this.setState({
          idForTimeGroomer1: res.data.id,
          clientNumberGroomer1: res.data.clientNumber,
          nameBreedGroomer1: res.data.nameBreed,
          arrivalTimeGroomer1: res.data.arrivalTime,
          pickupTimeGroomer1: res.data.pickupTime,
          costGroomer1: res.data.cost,
          tipGroomer1: res.data.tip,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // GROOMER 1 FUNCTIONS ***************************************************************

  // PAOLA FUNCTIONS ***************************************************************
  getPaolaApps = async () => {
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/paola/" + todayDate)
      .then((res) => {
        this.setState({
          paola: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  submitFormPaola = async (e) => {
    e.preventDefault();
    if (
      !this.state.clientNumberPaola ||
      !this.state.nameBreedPaola ||
      !this.state.arrivalTimePaola ||
      !this.state.pickupTimePaola
    ) {
      return this.setState({
        errMsg: "Missing some of the required fields!",
      });
    }

    const commission = {
      date: this.state.datePaola,
      clientNumber: this.state.clientNumberPaola,
      nameBreed: this.state.nameBreedPaola,
      arrivalTime: this.state.arrivalTimePaola,
      pickupTime: this.state.pickupTimePaola,
      called: false,
      cost: 0,
      tip: 0,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .post("/auth/commission/paola", commission)
      .then(() => {
        this.getPaolaApps();
        this.setState({
          modalPaola: false,
          clientNumberPaola: "",
          nameBreedPaola: "",
          costPaola: 0,
          tipPaola: 0,
          calledPaola: false,
          arrivalTimePaola: "",
          pickupTimePaola: "",
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  editInfoPaola = async (e) => {
    e.preventDefault();
    const id = this.state.idForTimePaola;
    let infoUpdated = {
      clientNumber: this.state.clientNumberPaola,
      nameBreed: this.state.nameBreedPaola,
      arrivalTime: this.state.arrivalTimePaola,
      pickupTime: this.state.pickupTimePaola,
      cost: this.state.costPaola,
      tip: this.state.tipPaola,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .put("/auth/commission/paola/" + id, infoUpdated)
      .then(() => {
        this.getPaolaApps();
        this.setState({
          modalToUpdateAppointmentPaola: false,
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  callTogglePaola = async ({ currentTarget }) => {
    const id = currentTarget.value;
    let callBoolean = {
      called: !this.state.calledPaola,
    };
    this.setState((prevState) => ({
      calledPaola: !prevState.calledPaola,
      loadingAxiosReq: true,
    }));
    await axios
      .put("/auth/commission/paola/" + id, callBoolean)
      .then(() => {
        this.setState({
          loadingAxiosReq: false,
        });
        this.getPaolaApps();
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  setIdValueForTimePaola = async ({ currentTarget }) => {
    const id = currentTarget.value;
    this.toggleModalToUpdatePaola();

    await axios
      .get("/auth/commission/paolas/" + id)
      .then((res) => {
        this.setState({
          idForTimePaola: res.data.id,
          clientNumberPaola: res.data.clientNumber,
          nameBreedPaola: res.data.nameBreed,
          arrivalTimePaola: res.data.arrivalTime,
          pickupTimePaola: res.data.pickupTime,
          costPaola: res.data.cost,
          tipPaola: res.data.tip,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // PAOLA FUNCTIONS ***************************************************************

  // DIANA FUNCTIONS ***************************************************************
  getDianaApps = async () => {
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/diana/" + todayDate)
      .then((res) => {
        this.setState({
          diana: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  submitFormDiana = async (e) => {
    e.preventDefault();
    if (
      !this.state.clientNumberDiana ||
      !this.state.nameBreedDiana ||
      !this.state.arrivalTimeDiana ||
      !this.state.pickupTimeDiana
    ) {
      return this.setState({
        errMsg: "Missing some of the required fields!",
      });
    }

    const commission = {
      date: this.state.dateDiana,
      clientNumber: this.state.clientNumberDiana,
      nameBreed: this.state.nameBreedDiana,
      arrivalTime: this.state.arrivalTimeDiana,
      pickupTime: this.state.pickupTimeDiana,
      called: false,
      cost: 0,
      tip: 0,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .post("/auth/commission/diana", commission)
      .then(() => {
        this.getDianaApps();
        this.setState({
          modalDiana: false,
          clientNumberDiana: "",
          nameBreedDiana: "",
          costDiana: 0,
          tipDiana: 0,
          calledDiana: false,
          arrivalTimeDiana: "",
          pickupTimeDiana: "",
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  editInfoDiana = async (e) => {
    e.preventDefault();
    const id = this.state.idForTimeDiana;
    let infoUpdated = {
      clientNumber: this.state.clientNumberDiana,
      nameBreed: this.state.nameBreedDiana,
      arrivalTime: this.state.arrivalTimeDiana,
      pickupTime: this.state.pickupTimeDiana,
      cost: this.state.costDiana,
      tip: this.state.tipDiana,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .put("/auth/commission/diana/" + id, infoUpdated)
      .then(() => {
        this.getDianaApps();
        this.setState({
          modalToUpdateAppointmentDiana: false,
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  callToggleDiana = async ({ currentTarget }) => {
    const id = currentTarget.value;
    let callBoolean = {
      called: !this.state.calledDiana,
    };
    this.setState((prevState) => ({
      calledDiana: !prevState.calledDiana,
      loadingAxiosReq: true,
    }));
    await axios
      .put("/auth/commission/diana/" + id, callBoolean)
      .then(() => {
        this.setState({
          loadingAxiosReq: false,
        });
        this.getDianaApps();
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  setIdValueForTimeDiana = async ({ currentTarget }) => {
    const id = currentTarget.value;
    this.toggleModalToUpdateDiana();

    await axios
      .get("/auth/commission/dianas/" + id)
      .then((res) => {
        this.setState({
          idForTimeDiana: res.data.id,
          clientNumberDiana: res.data.clientNumber,
          nameBreedDiana: res.data.nameBreed,
          arrivalTimeDiana: res.data.arrivalTime,
          pickupTimeDiana: res.data.pickupTime,
          costDiana: res.data.cost,
          tipDiana: res.data.tip,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // DIANA FUNCTIONS END ***************************************************************

  // CLAUDIA FUNCTIONS START***************************************************************
  getClaudiaApps = async () => {
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/claudia/" + todayDate)
      .then((res) => {
        this.setState({
          claudia: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  submitFormClaudia = async (e) => {
    e.preventDefault();
    if (
      !this.state.clientNumberClaudia ||
      !this.state.nameBreedClaudia ||
      !this.state.arrivalTimeClaudia ||
      !this.state.pickupTimeClaudia
    ) {
      return this.setState({
        errMsg: "Missing some of the required fields!",
      });
    }

    const commission = {
      date: this.state.dateClaudia,
      clientNumber: this.state.clientNumberClaudia,
      nameBreed: this.state.nameBreedClaudia,
      arrivalTime: this.state.arrivalTimeClaudia,
      pickupTime: this.state.pickupTimeClaudia,
      called: false,
      cost: 0,
      tip: 0,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .post("/auth/commission/claudia", commission)
      .then(() => {
        this.getClaudiaApps();
        this.setState({
          modalClaudia: false,
          clientNumberClaudia: "",
          nameBreedClaudia: "",
          costClaudia: 0,
          tipClaudia: 0,
          calledClaudia: false,
          arrivalTimeClaudia: "",
          pickupTimeClaudia: "",
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  editInfoClaudia = async (e) => {
    e.preventDefault();

    const id = this.state.idForTimeClaudia;
    let infoUpdated = {
      clientNumber: this.state.clientNumberClaudia,
      nameBreed: this.state.nameBreedClaudia,
      arrivalTime: this.state.arrivalTimeClaudia,
      pickupTime: this.state.pickupTimeClaudia,
      cost: this.state.costClaudia,
      tip: this.state.tipClaudia,
    };
    this.setState({
      loadingAxiosReq: true,
    });
    await axios
      .put("/auth/commission/claudia/" + id, infoUpdated)
      .then((res) => {
        this.getClaudiaApps();
        this.setState({
          modalToUpdateAppointment: false,
          loadingAxiosReq: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  callToggleClaudia = async ({ currentTarget }) => {
    const id = currentTarget.value;
    let callBoolean = {
      called: !this.state.calledClaudia,
    };
    this.setState((prevState) => ({
      calledClaudia: !prevState.calledClaudia,
      loadingAxiosReq: true,
    }));
    await axios
      .put("/auth/commission/claudia/" + id, callBoolean)
      .then(() => {
        this.setState({
          loadingAxiosReq: false,
        });
        this.getClaudiaApps();
      })
      .catch((err) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(err);
      });
  };

  setIdValueForTimeClaudia = async ({ currentTarget }) => {
    const id = currentTarget.value;
    this.toggleModalToUpdateClaudia();

    await axios
      .get("/auth/commission/claudias/" + id)
      .then((res) => {
        this.setState({
          idForTimeClaudia: res.data.id,
          clientNumberClaudia: res.data.clientNumber,
          nameBreedClaudia: res.data.nameBreed,
          arrivalTimeClaudia: res.data.arrivalTime,
          pickupTimeClaudia: res.data.pickupTime,
          costClaudia: res.data.cost,
          tipClaudia: res.data.tip,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  // CLAUDIA FUNCTIONS ***************************************************************

  render() {
    const { isLoading, error, jobType } = this.state;
    if (error) {
      return (
        <div
          style={{
            marginTop: "80px",
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
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
          }}
        >
          Loading Amazing Pet Grooming Data...try logging in again
        </div>
      );
    }

    if (jobType === "receptionist" || jobType === "admin") {
      // Claudia Info Table
      const claudiaToday = this.state.claudia;
      const claudiaTodayList =
        claudiaToday.length > 0 ? (
          claudiaToday.map((claudiaApp) => {
            return (
              <tr key={claudiaApp.id}>
                <td className="tdata-commission text-align-center">
                  {claudiaApp.date}
                </td>
                <td className="tdata-commission text-align-center">
                  {claudiaApp.clientNumber}
                </td>
                <td className="tdata-commission text-align-center">
                  {claudiaApp.nameBreed}
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {claudiaApp.arrivalTime}
                  </span>
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {claudiaApp.pickupTime}
                  </span>
                </td>
                <td className="tdata-commission text-align-center">
                  {claudiaApp.called}
                  {this.state.loadingAxiosReq ? (
                    <p>Wait...</p>
                  ) : (
                    <button
                      style={
                        claudiaApp.called === false
                          ? {
                              backgroundColor: "rgb(117, 158, 199)",
                              color: "white",
                            }
                          : {
                              backgroundColor: "rgb(98, 248, 156)",
                              color: "white",
                            }
                      }
                      disabled={this.state.loadingAxiosReq}
                      className="btn-phone-icon-commission"
                      onClick={this.callToggleClaudia}
                      value={claudiaApp.id}
                    >
                      <i className="fas fa-phone-square phone-icon-commission"></i>
                    </button>
                  )}
                </td>
                <td
                  style={
                    claudiaApp.cost > 0
                      ? {
                          color: "black",
                          backgroundColor: "rgb(139, 218, 139)",
                        }
                      : { color: "red" }
                  }
                  className="tdata-commission text-align-center"
                >
                  ${claudiaApp.cost}
                </td>
                <td className="tdata-commission text-align-center">
                  ${claudiaApp.tip}
                </td>
                <td className="tdata-commission">
                  <button
                    className="update-info-commission"
                    value={claudiaApp.id}
                    onClick={this.setIdValueForTimeClaudia}
                  >
                    Update Info
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>nothing yet</td>
          </tr>
        );

      // Diana Info Table
      const dianaToday = this.state.diana;
      const dianaTodayList =
        dianaToday.length > 0 ? (
          dianaToday.map((dianaApp) => {
            return (
              <tr key={dianaApp.id}>
                <td className="tdata-commission text-align-center">
                  {dianaApp.date}
                </td>
                <td className="tdata-commission text-align-center">
                  {dianaApp.clientNumber}
                </td>
                <td className="tdata-commission text-align-center">
                  {dianaApp.nameBreed}
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {dianaApp.arrivalTime}
                  </span>
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {dianaApp.pickupTime}
                  </span>
                </td>
                <td className="tdata-commission text-align-center">
                  {dianaApp.called}
                  {this.state.loadingAxiosReq ? (
                    <p>Wait...</p>
                  ) : (
                    <button
                      style={
                        dianaApp.called === false
                          ? {
                              backgroundColor: "rgb(117, 158, 199)",
                              color: "white",
                            }
                          : {
                              backgroundColor: "rgb(98, 248, 156)",
                              color: "white",
                            }
                      }
                      disabled={this.state.loadingAxiosReq}
                      className="btn-phone-icon-commission"
                      onClick={this.callToggleDiana}
                      value={dianaApp.id}
                    >
                      <i className="fas fa-phone-square phone-icon-commission"></i>
                    </button>
                  )}
                </td>
                <td
                  style={
                    dianaApp.cost > 0
                      ? {
                          color: "black",
                          backgroundColor: "rgb(139, 218, 139)",
                        }
                      : { color: "red" }
                  }
                  className="tdata-commission text-align-center"
                >
                  ${dianaApp.cost}
                </td>
                <td className="tdata-commission text-align-center">
                  ${dianaApp.tip}
                </td>
                <td className="tdata-commission">
                  <button
                    className="update-info-commission"
                    value={dianaApp.id}
                    onClick={this.setIdValueForTimeDiana}
                  >
                    Update Info
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>nothing yet</td>
          </tr>
        );

      // Paola Info Table
      const paolaToday = this.state.paola;
      const paolaTodayList =
        paolaToday.length > 0 ? (
          paolaToday.map((paolaApp) => {
            return (
              <tr key={paolaApp.id}>
                <td className="tdata-commission text-align-center">
                  {paolaApp.date}
                </td>
                <td className="tdata-commission text-align-center">
                  {paolaApp.clientNumber}
                </td>
                <td className="tdata-commission text-align-center">
                  {paolaApp.nameBreed}
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {paolaApp.arrivalTime}
                  </span>
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {paolaApp.pickupTime}
                  </span>
                </td>
                <td className="tdata-commission text-align-center">
                  {paolaApp.called}
                  {this.state.loadingAxiosReq ? (
                    <p>Wait...</p>
                  ) : (
                    <button
                      style={
                        paolaApp.called === false
                          ? {
                              backgroundColor: "rgb(117, 158, 199)",
                              color: "white",
                            }
                          : {
                              backgroundColor: "rgb(98, 248, 156)",
                              color: "white",
                            }
                      }
                      disabled={this.state.loadingAxiosReq}
                      className="btn-phone-icon-commission"
                      onClick={this.callTogglePaola}
                      value={paolaApp.id}
                    >
                      <i className="fas fa-phone-square phone-icon-commission"></i>
                    </button>
                  )}
                </td>
                <td
                  style={
                    paolaApp.cost > 0
                      ? {
                          color: "black",
                          backgroundColor: "rgb(139, 218, 139)",
                        }
                      : { color: "red" }
                  }
                  className="tdata-commission text-align-center"
                >
                  ${paolaApp.cost}
                </td>
                <td className="tdata-commission text-align-center">
                  ${paolaApp.tip}
                </td>
                <td className="tdata-commission">
                  <button
                    className="update-info-commission"
                    value={paolaApp.id}
                    onClick={this.setIdValueForTimePaola}
                  >
                    Update Info
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>nothing yet</td>
          </tr>
        );

      // Groomer1 Info Table
      const groomer1Today = this.state.groomer1;
      const groomer1TodayList =
        groomer1Today.length > 0 ? (
          groomer1Today.map((groomer1App) => {
            return (
              <tr key={groomer1App.id}>
                <td className="tdata-commission text-align-center">
                  {groomer1App.date}
                </td>
                <td className="tdata-commission text-align-center">
                  {groomer1App.clientNumber}
                </td>
                <td className="tdata-commission text-align-center">
                  {groomer1App.nameBreed}
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {groomer1App.arrivalTime}
                  </span>
                </td>
                <td className="tdata-commission tdata-commission_time text-align-center">
                  <span className="time-content">
                    <i className="fas fa-clock"></i> {groomer1App.pickupTime}
                  </span>
                </td>
                <td className="tdata-commission text-align-center">
                  {groomer1App.called}
                  {this.state.loadingAxiosReq ? (
                    <p>Wait...</p>
                  ) : (
                    <button
                      style={
                        groomer1App.called === false
                          ? {
                              backgroundColor: "rgb(117, 158, 199)",
                              color: "white",
                            }
                          : {
                              backgroundColor: "rgb(98, 248, 156)",
                              color: "white",
                            }
                      }
                      disabled={this.state.loadingAxiosReq}
                      className="btn-phone-icon-commission"
                      onClick={this.callToggleGroomer1}
                      value={groomer1App.id}
                    >
                      <i className="fas fa-phone-square phone-icon-commission"></i>
                    </button>
                  )}
                </td>
                <td
                  style={
                    groomer1App.cost > 0
                      ? {
                          color: "black",
                          backgroundColor: "rgb(139, 218, 139)",
                        }
                      : { color: "red" }
                  }
                  className="tdata-commission text-align-center"
                >
                  ${groomer1App.cost}
                </td>
                <td className="tdata-commission text-align-center">
                  ${groomer1App.tip}
                </td>
                <td className="tdata-commission">
                  <button
                    className="update-info-commission"
                    value={groomer1App.id}
                    onClick={this.setIdValueForTimeGroomer1}
                  >
                    Update Info
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>nothing yet</td>
          </tr>
        );

      return (
        <div className="commission-parent-container">
          <h1 className="text-align-center controlPanelHeading margin-top-big">
            DAILY REPORT <i className="fas fa-dollar-sign"></i>
          </h1>

          {/* Buttons for Groomers */}
          <div className="text-align-center row">
            <div className="col-lg-3">
              <button
                onClick={this.toggleModalPaola}
                className="commission-btn commission-btn_paola"
              >
                Paula <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="col-lg-3">
              <button
                onClick={this.toggleModalClaudia}
                className="commission-btn commission-btn_claudia"
              >
                Claudia <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="col-lg-3">
              <button
                onClick={this.toggleModalDiana}
                className="commission-btn commission-btn_diana"
              >
                Diana <i className="fas fa-plus"></i>
              </button>
            </div>

            <div className="col-lg-3">
              <button
                onClick={this.toggleModalGroomer1}
                className="commission-btn commission-btn_groomer"
              >
                Groomer 1 <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          {/* Table for Paola */}
          <div className="row commission-groomers-info commission-groomers-info_paola">
            <h4 className="commission-subheading text-center">Paula</h4>
            <Table className="text-dark bg-light">
              <thead>
                <tr>
                  <th className="theading-commission">Date</th>
                  <th className="theading-commission">Client #</th>
                  <th className="theading-commission">Name - Breed</th>
                  <th className="theading-commission">Arrival Time</th>
                  <th className="theading-commission">Pickup Time</th>
                  <th className="theading-commission">Called</th>
                  <th className="theading-commission">Cost</th>
                  <th className="theading-commission">Tip</th>
                  <th className="theading-commission">Actions</th>
                </tr>
              </thead>
              <tbody>{paolaTodayList}</tbody>
            </Table>
          </div>

          {/* Table for Claudia */}
          <div className="row commission-groomers-info commission-groomers-info_claudia">
            <h4 className="commission-subheading text-align-center">Claudia</h4>

            <Table className="text-dark bg-light">
              <thead>
                <tr>
                  <th className="theading-commission">Date</th>
                  <th className="theading-commission">Client #</th>
                  <th className="theading-commission">Name - Breed</th>
                  <th className="theading-commission">Arrival Time</th>
                  <th className="theading-commission">Pickup Time</th>
                  <th className="theading-commission">Called</th>
                  <th className="theading-commission">Cost</th>
                  <th className="theading-commission">Tip</th>
                  <th className="theading-commission">Actions</th>
                </tr>
              </thead>
              <tbody>{claudiaTodayList}</tbody>
            </Table>
          </div>

          {/* Table for Diana */}
          <div className="row commission-groomers-info commission-groomers-info_diana">
            <h4 className="commission-subheading text-align-center">Diana</h4>
            <Table className="text-dark bg-light">
              <thead>
                <tr>
                  <th className="theading-commission">Date</th>
                  <th className="theading-commission">Client #</th>
                  <th className="theading-commission">Name - Breed</th>
                  <th className="theading-commission">Arrival Time</th>
                  <th className="theading-commission">Pickup Time</th>
                  <th className="theading-commission">Called</th>
                  <th className="theading-commission">Cost</th>
                  <th className="theading-commission">Tip</th>
                  <th className="theading-commission">Actions</th>
                </tr>
              </thead>
              <tbody>{dianaTodayList}</tbody>
            </Table>
          </div>

          {/* Table for Groomer1 */}
          <div className="row commission-groomers-info commission-groomers-info_groomer">
            <h4 className="commission-subheading text-align-center">
              Groomer 1
            </h4>
            <Table className="text-dark bg-light">
              <thead>
                <tr>
                  <th className="theading-commission">Date</th>
                  <th className="theading-commission">Client #</th>
                  <th className="theading-commission">Name - Breed</th>
                  <th className="theading-commission">Arrival Time</th>
                  <th className="theading-commission">Pickup Time</th>
                  <th className="theading-commission">Called</th>
                  <th className="theading-commission">Cost</th>
                  <th className="theading-commission">Tip</th>
                  <th className="theading-commission">Actions</th>
                </tr>
              </thead>
              <tbody>{groomer1TodayList}</tbody>
            </Table>
          </div>

          {/* MODALS */}
          {/* Modal Claudia to add */}
          <Modal
            isOpen={this.state.modalClaudia}
            toggle={this.toggleModalClaudia}
          >
            <ModalHeader toggle={this.toggleModalClaudia}>
              Add Pets to Claudia for Today
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.submitFormClaudia}>
                <Input
                  className="form-commission"
                  value={this.state.clientNumberClaudia}
                  name="clientNumberClaudia"
                  onChange={this.handleChange}
                  placeholder="Client #"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.nameBreedClaudia}
                  name="nameBreedClaudia"
                  onChange={this.handleChange}
                  placeholder="Name - Breed"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.arrivalTimeClaudia}
                  name="arrivalTimeClaudia"
                  onChange={this.handleChange}
                  placeholder="Arrival Time"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.pickupTimeClaudia}
                  name="pickupTimeClaudia"
                  onChange={this.handleChange}
                  placeholder="Pickup Time"
                  type="text"
                />

                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Add
                  </Button>
                )}
                <p className="error-message-registration text-align-center margin-top-small">
                  {this.state.errMsg}
                </p>
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal Diana to add*/}
          <Modal isOpen={this.state.modalDiana} toggle={this.toggleModalDiana}>
            <ModalHeader toggle={this.toggleModalDiana}>
              Add Pets to Diana for Today
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.submitFormDiana}>
                <Input
                  className="form-commission"
                  value={this.state.clientNumberDiana}
                  name="clientNumberDiana"
                  onChange={this.handleChange}
                  placeholder="Client #"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.nameBreedDiana}
                  name="nameBreedDiana"
                  onChange={this.handleChange}
                  placeholder="Name - Breed"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.arrivalTimeDiana}
                  name="arrivalTimeDiana"
                  onChange={this.handleChange}
                  placeholder="Arrival Time"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.pickupTimeDiana}
                  name="pickupTimeDiana"
                  onChange={this.handleChange}
                  placeholder="Pickup Time"
                  type="text"
                />

                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Add
                  </Button>
                )}
                <p className="error-message-registration text-align-center margin-top-small">
                  {this.state.errMsg}
                </p>
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal Paola to add*/}
          <Modal isOpen={this.state.modalPaola} toggle={this.toggleModalPaola}>
            <ModalHeader toggle={this.toggleModalPaola}>
              Add Pets to Paula for Today
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.submitFormPaola}>
                <Input
                  className="form-commission"
                  value={this.state.clientNumberPaola}
                  name="clientNumberPaola"
                  onChange={this.handleChange}
                  placeholder="Client #"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.nameBreedPaola}
                  name="nameBreedPaola"
                  onChange={this.handleChange}
                  placeholder="Name - Breed"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.arrivalTimePaola}
                  name="arrivalTimePaola"
                  onChange={this.handleChange}
                  placeholder="Arrival Time"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.pickupTimePaola}
                  name="pickupTimePaola"
                  onChange={this.handleChange}
                  placeholder="Pickup Time"
                  type="text"
                />

                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Add
                  </Button>
                )}
                <p className="error-message-registration text-align-center margin-top-small">
                  {this.state.errMsg}
                </p>
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal Groomer 1 to add */}
          <Modal
            isOpen={this.state.modalGroomer1}
            toggle={this.toggleModalGroomer1}
          >
            <ModalHeader toggle={this.toggleModalGroomer1}>
              Add Pets to Groomer 1 for Today
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.submitFormGroomer1}>
                <Input
                  className="form-commission"
                  value={this.state.clientNumberGroomer1}
                  name="clientNumberGroomer1"
                  onChange={this.handleChange}
                  placeholder="Client #"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.nameBreedGroomer1}
                  name="nameBreedGroomer1"
                  onChange={this.handleChange}
                  placeholder="Name - Breed"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.arrivalTimeGroomer1}
                  name="arrivalTimeGroomer1"
                  onChange={this.handleChange}
                  placeholder="Arrival Time"
                  type="text"
                />
                <Input
                  className="form-commission"
                  value={this.state.pickupTimeGroomer1}
                  name="pickupTimeGroomer1"
                  onChange={this.handleChange}
                  placeholder="Pickup Time"
                  type="text"
                />

                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Add
                  </Button>
                )}
                <p className="error-message-registration text-align-center margin-top-small">
                  {this.state.errMsg}
                </p>
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal to edit info Claudia*/}
          <Modal
            isOpen={this.state.modalToUpdateAppointment}
            toggle={this.toggleModalToUpdateClaudia}
          >
            <ModalHeader toggle={this.toggleModalToUpdateClaudia}>
              Update Info for{" "}
              <span className="time-content">
                <i className="fas fa-paw"></i> {this.state.nameBreedClaudia}
              </span>
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={this.editInfoClaudia}
                className="form-edit-commission"
              >
                <FormGroup row>
                  <Label className=" text-align-center" md={12}>
                    <i className="fas fa-calendar"></i> Date:{" "}
                    {this.state.dateClaudia}
                  </Label>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-user-circle"></i> Client #
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.clientNumberClaudia}
                      name="clientNumberClaudia"
                      onChange={this.handleChange}
                      placeholder="Client #"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-paw"></i> Name-breed
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.nameBreedClaudia}
                      name="nameBreedClaudia"
                      onChange={this.handleChange}
                      placeholder="Name - Breed"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="far fa-clock"></i> Arrival time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.arrivalTimeClaudia}
                      name="arrivalTimeClaudia"
                      onChange={this.handleChange}
                      placeholder="Arrival Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-home"></i> Pickup time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.pickupTimeClaudia}
                      name="pickupTimeClaudia"
                      onChange={this.handleChange}
                      placeholder="Pickup Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-dollar-sign"></i> Cost (No taxes)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission "
                      defaultValue={this.state.costClaudia}
                      name="costClaudia"
                      onChange={this.handleChange}
                      placeholder="Cost"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-coins"></i> Tip (Including Cents)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.tipClaudia}
                      name="tipClaudia"
                      onChange={this.handleChange}
                      placeholder="Tip"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Submit changes
                  </Button>
                )}
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal to edit info Diana*********************/}
          <Modal
            isOpen={this.state.modalToUpdateAppointmentDiana}
            toggle={this.toggleModalToUpdateDiana}
          >
            <ModalHeader toggle={this.toggleModalToUpdateDiana}>
              Update Info for{" "}
              <span className="time-content">
                <i className="fas fa-paw"></i> {this.state.nameBreedDiana}
              </span>{" "}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={this.editInfoDiana}
                className="form-edit-commission"
              >
                <FormGroup row>
                  <Label className=" text-align-center" md={12}>
                    <i className="fas fa-calendar"></i> Date:{" "}
                    {this.state.dateDiana}
                  </Label>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-user-circle"></i> Client #
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.clientNumberDiana}
                      name="clientNumberDiana"
                      onChange={this.handleChange}
                      placeholder="Client #"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-paw"></i> Name-breed
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.nameBreedDiana}
                      name="nameBreedDiana"
                      onChange={this.handleChange}
                      placeholder="Name - Breed"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="far fa-clock"></i> Arrival time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.arrivalTimeDiana}
                      name="arrivalTimeDiana"
                      onChange={this.handleChange}
                      placeholder="Arrival Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-home"></i> Pickup time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.pickupTimeDiana}
                      name="pickupTimeDiana"
                      onChange={this.handleChange}
                      placeholder="Pickup Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-dollar-sign"></i> Cost (No taxes)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission "
                      defaultValue={this.state.costDiana}
                      name="costDiana"
                      onChange={this.handleChange}
                      placeholder="Cost"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-coins"></i> Tip (Including Cents)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.tipDiana}
                      name="tipDiana"
                      onChange={this.handleChange}
                      placeholder="Tip"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Submit changes
                  </Button>
                )}
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal to edit info Paola*********************/}
          <Modal
            isOpen={this.state.modalToUpdateAppointmentPaola}
            toggle={this.toggleModalToUpdatePaola}
          >
            <ModalHeader toggle={this.toggleModalToUpdatePaola}>
              Update Info for{" "}
              <span className="time-content">
                <i className="fas fa-paw"></i> {this.state.nameBreedPaola}
              </span>{" "}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={this.editInfoPaola}
                className="form-edit-commission"
              >
                <FormGroup row>
                  <Label className=" text-align-center" md={12}>
                    <i className="fas fa-calendar"></i> Date:{" "}
                    {this.state.datePaola}
                  </Label>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-user-circle"></i> Client #
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.clientNumberPaola}
                      name="clientNumberPaola"
                      onChange={this.handleChange}
                      placeholder="Client #"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-paw"></i> Name-breed
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.nameBreedPaola}
                      name="nameBreedPaola"
                      onChange={this.handleChange}
                      placeholder="Name - Breed"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="far fa-clock"></i> Arrival time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.arrivalTimePaola}
                      name="arrivalTimePaola"
                      onChange={this.handleChange}
                      placeholder="Arrival Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-home"></i> Pickup time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.pickupTimePaola}
                      name="pickupTimePaola"
                      onChange={this.handleChange}
                      placeholder="Pickup Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-dollar-sign"></i> Cost (No taxes)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission "
                      defaultValue={this.state.costPaola}
                      name="costPaola"
                      onChange={this.handleChange}
                      placeholder="Cost"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-coins"></i> Tip (Including Cents)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.tipPaola}
                      name="tipPaola"
                      onChange={this.handleChange}
                      placeholder="Tip"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button className="addPet-btn" block color="warning">
                    Submit changes
                  </Button>
                )}
              </Form>
            </ModalBody>
          </Modal>

          {/* Modal to edit info Groomer1*********************/}
          <Modal
            isOpen={this.state.modalToUpdateAppointmentGroomer1}
            toggle={this.toggleModalToUpdateGroomer1}
          >
            <ModalHeader toggle={this.toggleModalToUpdateGroomer1}>
              Update Info for{" "}
              <span className="time-content">
                <i className="fas fa-paw"></i> {this.state.nameBreedGroomer1}
              </span>
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={this.editInfoGroomer1}
                className="form-edit-commission"
              >
                <FormGroup row>
                  <Label className=" text-align-center" md={12}>
                    <i className="fas fa-calendar"></i> Date:{" "}
                    {this.state.dateGroomer1}
                  </Label>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-user-circle"></i> Client #
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.clientNumberGroomer1}
                      name="clientNumberGroomer1"
                      onChange={this.handleChange}
                      placeholder="Client #"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-paw"></i> Name-breed
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.nameBreedGroomer1}
                      name="nameBreedGroomer1"
                      onChange={this.handleChange}
                      placeholder="Name - Breed"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="far fa-clock"></i> Arrival time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.arrivalTimeGroomer1}
                      name="arrivalTimeGroomer1"
                      onChange={this.handleChange}
                      placeholder="Arrival Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-home"></i> Pickup time
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.pickupTimeGroomer1}
                      name="pickupTimeGroomer1"
                      onChange={this.handleChange}
                      placeholder="Pickup Time"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-dollar-sign"></i> Cost (No taxes)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission "
                      defaultValue={this.state.costGroomer1}
                      name="costGroomer1"
                      onChange={this.handleChange}
                      placeholder="Cost"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className=" text-align-center" md={4}>
                    <i className="fas fa-coins"></i> Tip (Including Cents)
                  </Label>
                  <Col lg={8}>
                    <Input
                      className="form-commission"
                      defaultValue={this.state.tipGroomer1}
                      name="tipGroomer1"
                      onChange={this.handleChange}
                      placeholder="Tip"
                      type="text"
                    />
                  </Col>
                </FormGroup>
                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button
                    disabled={this.state.loadingAxiosReq}
                    className="addPet-btn"
                    block
                    color="warning"
                  >
                    Submit changes
                  </Button>
                )}
              </Form>
            </ModalBody>
          </Modal>
          {/* MODALS */}
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

export default index;
