import React, { Component } from "react";
import "./style.scss";
import Select from "react-select";
import { getCalAdminQuery } from "../../queries/queries";
import { getCalEmp1Query } from "../../queries/queries";
import { getCalEmp2Query } from "../../queries/queries";
import ApolloClient from "apollo-boost";
import ModalPaola from "../../components/Modals/ModalPaola";
import ModalClaudia from "../../components/Modals/ModalCaudia";
import ModalDiana from "../../components/Modals/ModalDiana";
import Cambridge from "../Cambrige";
import moment from "moment";
import API from "../../utils/API";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Col,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from "react-big-calendar";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const client = new ApolloClient({
  uri: "/graphql",
});

let optionsDogSize = [
  {
    value: "appRequest",
    label: "Small",
  },
  {
    value: "mediumDogRequest",
    label: "Medium",
  },
  {
    value: "bigDogRequest",
    label: "Large",
  },
  {
    value: "bigDogRequest",
    label: "X-Large",
  },
];

let optionsGroomers = [
  {
    value: "Paula",
    label: "Paula",
  },
  {
    value: "Claudia",
    label: "Claudia",
  },
  {
    value: "Diana",
    label: "Diana",
  },
];

let optionsCatGroomers = [
  {
    value: "Paula",
    label: "Paula",
  },
];

let optionsIsNewClient = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

let optionsDogServices = [
  {
    value: "Premium Pkg",
    label: "Premium Pkg (bath, full-haircut, nails, ears)",
  },
  {
    value: "Tidy Up",
    label: "Tidy Up Pkg (bath, slight trim, nails, ears)",
  },
  {
    value: "Bath",
    label: "Bath pkg (bath, brush, nails, ears)",
  },
];

let optionsCatServices = [
  {
    value: "Cat Premium Pkg",
    label: "Cat Premium Pkg (bath, full-haircut, nails, ears)",
  },
  {
    value: "Cat Haircut Pkg",
    label: "Cat Haircut Pkg (Full-haircut, nails, ears)",
  },
  {
    value: "Cat Bath Pkg",
    label: "Cat Bath Pkg (Bath, nails, ears)",
  },
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPetType: true,
      petType: "",
      dogSize: "",
      groomer: "",
      petName: "",
      breed: "",
      phoneNumber: "",
      modalToSchedule: false,
      modalToEditEvent: false,
      chosenDate: "",
      datesFiltered: [],

      appointmentEdit: "",
      editTitle: "",
      editStart: "",
      editEnd: "",
      eventToEdit: "",

      service: "",
      // checkedNewClient: true,
      isNewClient: "",

      errorMsg: "",

      //modals
      modalPaola: false,
      modalClaudia: false,
      modalDiana: false,
      modalSuccess: false,

      city: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleModalPaola = () => {
    this.setState({
      modalPaola: !this.state.modalPaola,
    });
  };

  toggleModalClaudia = () => {
    this.setState({
      modalClaudia: !this.state.modalClaudia,
    });
  };

  toggleModalDiana = () => {
    this.setState({
      modalDiana: !this.state.modalDiana,
    });
  };

  //onChange for modal forms
  onChangeModal = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleChangeNewClient = () => {
    this.setState((prevState) => ({
      checkedNewClient: !prevState.checkedNewClient,
    }));
  };

  resetPetType = () => {
    this.setState({
      showPetType: true,
      petType: "",
      dogSize: "",
      groomer: "",
      petName: "",
      breed: "",
      phoneNumber: "",
      modalToSchedule: false,
      modalToEditEvent: false,
      modalSuccess: false,
      chosenDate: "",
      datesFiltered: [],

      appointmentEdit: "",
      editTitle: "",
      editStart: "",
      editEnd: "",
      eventToEdit: "",

      service: "",
      // checkedNewClient: true,
      isNewClient: "",
      errorMsg: "",
    });
  };

  toggleModal = () => {
    this.setState({
      modalToSchedule: !this.state.modalToSchedule,
    });
  };

  toggleModalSuccess = () => {
    this.setState({
      modalSuccess: !this.state.modalSuccess,
    });
  };

  //Toggle to edit appointments on calendar
  toggleToEdit = () => {
    if (!this.state.modalToEditEvent) {
      this.setState({
        errorMsg: "",
        petName: "",
        breed: "",
        phoneNumber: "",
        checkedNewClient: true,
      });
    }
    this.setState({
      modalToEditEvent: !this.state.modalToEditEvent,
    });
  };

  petTypeDog = () => {
    this.setState({
      petType: "Dog",
      showPetType: false,
    });
  };

  petTypeCat = () => {
    this.setState({
      petType: "Cat",
      showPetType: false,
    });
  };

  onSelectedDogSize = (value) => {
    this.setState({
      dogSize: value.value,
    });
  };

  onSelectedGroomer = (value) => {
    this.setState({
      groomer: value.value,
    });
  };

  selectPaola = () => {
    this.setState({
      groomer: "Paula",
      modalPaola: false,
    });
  };

  selectClaudia = () => {
    this.setState({
      groomer: "Claudia",
      modalClaudia: false,
    });
  };

  selectDiana = () => {
    this.setState({
      groomer: "Diana",
      modalDiana: false,
    });
  };

  onSelectedDogServices = (value) => {
    this.setState({
      service: value.value,
    });
  };

  onSelectedIsNewClient = async (value) => {
    await this.setState({
      isNewClient: value.value,
    });
  };

  convertDate = (date) => {
    return moment.utc(date).toDate();
  };

  getPaolasHours = async () => {
    this.toggleModal();
    await client
      .query({
        query: getCalAdminQuery,
      })
      .then((response) => {
        let appointments = response.data.getAllCalendarsAdmin;
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].end);
        }
        this.setState({
          datesFiltered: appointments.filter(
            (availTime) =>
              availTime.appointment === "online" && availTime.start > new Date()
          ),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getPaolasCatHours = async () => {
    this.toggleModal();
    await client
      .query({
        query: getCalAdminQuery,
      })
      .then((response) => {
        let appointments = response.data.getAllCalendarsAdmin;
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].end);
        }
        this.setState({
          datesFiltered: appointments.filter(
            (availTime) =>
              availTime.appointment === "onlineCat" &&
              availTime.start > new Date()
          ),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getClaudiasHours = async () => {
    this.toggleModal();
    await client
      .query({
        query: getCalEmp1Query,
      })
      .then((response) => {
        let appointments = response.data.getAllCalendarsEmp1;
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].end);
        }
        this.setState({
          datesFiltered: appointments.filter(
            (availTime) =>
              availTime.appointment === "online" && availTime.start > new Date()
          ),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getDianasHours = async () => {
    this.toggleModal();
    await client
      .query({
        query: getCalEmp2Query,
      })
      .then((response) => {
        let appointments = response.data.getAllCalendarsEmp2;
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].end);
        }
        this.setState({
          datesFiltered: appointments.filter(
            (availTime) =>
              availTime.appointment === "online" && availTime.start > new Date()
          ),
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Opens up modal with event info to update
  handleEventGetter = async (event) => {
    let id = event.id;
    this.toggleToEdit();
    if (this.state.groomer === "Paula") {
      await API.getAppointmentAdmin(id)
        .then((res) => {
          this.setState({
            eventToEdit: res.data,
            appointmentEdit: res.data.appointment,
            editTitle: res.data.title,
            editStart: res.data.start,
            editEnd: res.data.end,
            lastModifiedByEdit: res.data.lastModifiedBy,
          });
        })
        .catch((error) => console.log(error));
    }
    if (this.state.groomer === "Claudia") {
      await API.getAppointmentEmp1(id)
        .then((res) => {
          this.setState({
            eventToEdit: res.data,
            appointmentEdit: res.data.appointment,
            editTitle: res.data.title,
            editStart: res.data.start,
            editEnd: res.data.end,
            lastModifiedByEdit: res.data.lastModifiedBy,
          });
        })
        .catch((error) => console.log(error));
    }
    if (this.state.groomer === "Diana") {
      await API.getAppointmentEmp2(id)
        .then((res) => {
          this.setState({
            eventToEdit: res.data,
            appointmentEdit: res.data.appointment,
            editTitle: res.data.title,
            editStart: res.data.start,
            editEnd: res.data.end,
            lastModifiedByEdit: res.data.lastModifiedBy,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  onSubmitModalToEdit = async (e) => {
    e.preventDefault();

    if (
      !this.state.petName ||
      !this.state.breed ||
      !this.state.phoneNumber ||
      !this.state.service
    ) {
      return this.setState({
        errorMsg: "All fields are required!",
      });
    }

    if (this.state.isNewClient === "") {
      return this.setState({
        errorMsg: "Has your pet been here before?",
      });
    }

    let appointmentType;

    if (this.state.dogSize === "appRequest" && this.state.service === "Bath") {
      appointmentType = "bathRequest";
    } else if (this.state.dogSize === "appRequest") {
      appointmentType = "appRequest";
    }
    if (
      this.state.dogSize === "mediumDogRequest" &&
      this.state.service === "Bath"
    ) {
      appointmentType = "bathRequest";
    } else if (this.state.dogSize === "mediumDogRequest") {
      appointmentType = "mediumDogRequest";
    }
    if (
      this.state.dogSize === "bigDogRequest" &&
      this.state.service === "Bath"
    ) {
      appointmentType = "bathRequest";
    } else if (this.state.dogSize === "bigDogRequest") {
      appointmentType = "bigDogRequest";
    }
    if (this.state.petType === "Cat") {
      appointmentType = "cat";
    }

    let isClientNew;
    if (this.state.isNewClient === "No") {
      isClientNew = "New Client";
    } else if (this.state.isNewClient === "Yes") {
      isClientNew = "Existing Client";
    }

    let obj = {
      id: this.state.eventToEdit.id,
      title:
        this.state.petName.toLowerCase() +
        " " +
        this.state.breed.toLowerCase() +
        " " +
        "Ph#: " +
        this.state.phoneNumber.replace(/[- )(]/g, "") +
        " " +
        isClientNew +
        "--" +
        this.state.service,
      start: this.state.editStart,
      end: this.state.editEnd,
      appointment: appointmentType,
      lastModifiedBy: "Client online booking",
    };

    let id = this.state.eventToEdit.id;
    this.setState({
      loadingAxiosReq: true,
    });

    if (this.state.groomer === "Paula") {
      await API.updateAppointmentAdmin(id, obj)

        .then(() => {
          this.setState({
            modalSuccess: true,
            modalToEditEvent: false,
            modalToSchedule: false,
            loadingAxiosReq: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loadingAxiosReq: false,
          });
          alert(
            "We are sorry, something went wrong! Please give us a call at 905 878 9009 or 905 878 5557"
          );
        });
    }

    if (this.state.groomer === "Claudia") {
      await API.updateAppointmentEmp1(id, obj)

        .then(() => {
          this.setState({
            modalSuccess: true,
            modalToEditEvent: false,
            modalToSchedule: false,
            loadingAxiosReq: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loadingAxiosReq: false,
          });
        });
    }
    if (this.state.groomer === "Diana") {
      await API.updateAppointmentEmp2(id, obj)

        .then(() => {
          this.setState({
            modalSuccess: true,
            modalToEditEvent: false,
            modalToSchedule: false,
            loadingAxiosReq: false,
          });
        })

        .catch((error) => {
          console.log(error);
          this.setState({
            loadingAxiosReq: false,
          });
        });
    }
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    var style = {
      backgroundColor: "rgb(19, 235, 55)",
      borderRadius: "5px",
      opacity: 0.8,
      fontSize: "16px",
      color: "black",
      border: "1px solid blue",
      display: "block",
      paddingLeft: "12px",
    };

    return {
      style,
    };
  };

  closeWindow = () => {
    window.location.reload();
  };

  setCity = ({ currentTarget }) => {
    this.setState({
      city: currentTarget.value,
    });
  };

  resetCity = () => {
    this.setState({
      city: "",
      showPetType: true,
      petType: "",
      dogSize: "",
      groomer: "",
      petName: "",
      breed: "",
      phoneNumber: "",
    });
  };

  render() {
    return (
      <div id="schedule-containerId" className="schedule-container">
        <h1 className="text-center schedule-primary-heading">
          <i className="far fa-calendar-alt"></i>
          {""} Book your appointment online!
        </h1>

        {this.state.city !== "" ? (
          <h2 className="text-center cityChosen">
            Location: {this.state.city.toUpperCase()}{" "}
            {this.state.city === "cambridge" ? (
              <span className="new-cambridge">New!</span>
            ) : null}
          </h2>
        ) : null}

        {this.state.city !== "" ? (
          <button className="change-city-btn" onClick={this.resetCity}>
            <i className="fas fa-compass"></i> Choose a different city
          </button>
        ) : null}

        {this.state.city === "milton" ? (
          <div>
            <p className="text-center nail-trim-service">
              Note: Nail Trim Service Does NOT require an appointment...Walk-in
              Mon-Sat 9am-1pm
              <br />
              For Cat's Nail-Trim service, please call first to confirm our
              cat-groomer's availability
            </p>
            {this.state.petType ? (
              <div>
                <button
                  className="reset-btn-schedule"
                  onClick={this.resetPetType}
                >
                  Reset and Start over
                </button>
                <h2 className="text-center schedule-primary-heading__petType">
                  Pet Type Selected:{" "}
                  <b>
                    {this.state.petType} <i className="fas fa-paw"></i>
                  </b>
                </h2>
                <hr />
                {this.state.petType === "Dog" ? (
                  <div className="container">
                    {this.state.dogSize !== "" ? (
                      <div>
                        {this.state.dogSize === "appRequest" ? (
                          <h3 className="schedule-primary-heading__petType">
                            Small Size Dog <i className="fas fa-paw"></i>{" "}
                          </h3>
                        ) : this.state.dogSize === "mediumDogRequest" ? (
                          <h3 className="schedule-primary-heading__petType">
                            Medium Size Dog <i className="fas fa-paw"></i>
                          </h3>
                        ) : this.state.dogSize === "bigDogRequest" ? (
                          <h3 className="schedule-primary-heading__petType">
                            Large/X-Large Size Dog{" "}
                            <i className="fas fa-paw"></i>
                          </h3>
                        ) : (
                          <h3 className="schedule-primary-heading__petType">
                            Large/X-Large Size Dog{" "}
                            <i className="fas fa-paw"></i>
                          </h3>
                        )}
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-center schedule-primary-heading__petType">
                          What Size?{" "}
                        </h3>
                        <Select
                          defaultValue={this.state.dogSize}
                          options={optionsDogSize}
                          placeholder="Size"
                          isSearchable={false}
                          onChange={this.onSelectedDogSize}
                        />
                      </div>
                    )}
                    {this.state.groomer !== "" ? (
                      <div>
                        <h2 className="text-center schedule-primary-heading__petType">
                          Selected Groomer: {this.state.groomer}{" "}
                          <i className="fas fa-cut"></i>
                        </h2>
                        <Select
                          options={optionsGroomers}
                          placeholder="Select Groomer"
                          isSearchable={false}
                          onChange={this.onSelectedGroomer}
                        />
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-center schedule-primary-heading__petType">
                          Select a Groomer <i className="fas fa-cut"></i>
                        </h3>
                        <Select
                          value={this.state.groomer}
                          options={optionsGroomers}
                          placeholder="Select Groomer"
                          isSearchable={false}
                          onChange={this.onSelectedGroomer}
                        />
                        <div className="groomers-profile-pics__wrapper text-center">
                          <div
                            onClick={this.toggleModalPaola}
                            className="groomers-profile-pics__parent"
                          >
                            <img
                              className="groomers-profile-pics"
                              src="./images/paolaFace.png"
                              alt="pet groomer"
                            />
                            <p>
                              <b>PAULA</b>{" "}
                            </p>{" "}
                          </div>
                          <div
                            onClick={this.toggleModalClaudia}
                            className="groomers-profile-pics__parent"
                          >
                            <img
                              className="groomers-profile-pics"
                              src="./images/claudiaFace.png"
                              alt="pet groomer"
                            />
                            <p>
                              <b>CLAUDIA</b>{" "}
                            </p>{" "}
                          </div>
                          <div
                            onClick={this.toggleModalDiana}
                            className="groomers-profile-pics__parent"
                          >
                            <img
                              className="groomers-profile-pics"
                              src="./images/dianaFace.png"
                              alt="pet groomer"
                            />
                            <p>
                              <b>DIANA</b>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {this.state.petType &&
                    this.state.groomer === "Paula" &&
                    this.state.dogSize !== "" ? (
                      <button
                        onClick={this.getPaolasHours}
                        className="continue-schedule-btn"
                      >
                        Continue
                      </button>
                    ) : null}
                    {this.state.petType &&
                    this.state.groomer === "Claudia" &&
                    this.state.dogSize !== "" ? (
                      <button
                        onClick={this.getClaudiasHours}
                        className="continue-schedule-btn"
                      >
                        Continue
                      </button>
                    ) : null}
                    {this.state.petType &&
                    this.state.groomer === "Diana" &&
                    this.state.dogSize !== "" ? (
                      <button
                        onClick={this.getDianasHours}
                        className="continue-schedule-btn"
                      >
                        Continue
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div className="container">
                    {this.state.petType === "Cat" &&
                    this.state.groomer === "" ? (
                      <div>
                        <h3 className="text-center">Select a Groomer</h3>
                        <Select
                          options={optionsCatGroomers}
                          placeholder="Select Groomer"
                          isSearchable={false}
                          onChange={this.onSelectedGroomer}
                        />
                        <div
                          onClick={this.toggleModalPaola}
                          className="text-center"
                        >
                          <img
                            className="groomers-profile-pics__cat"
                            src="./images/paolaFace.png"
                            alt="pet groomer"
                          />
                          <p>
                            <b>PAULA</b>{" "}
                          </p>{" "}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div>
                          <h2 className="text-center schedule-primary-heading__petType">
                            Selected Groomer: <b>{this.state.groomer}</b>{" "}
                            <i className="fas fa-cut"></i>
                          </h2>

                          <button
                            onClick={this.getPaolasCatHours}
                            className="continue-schedule-btn"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}

            {this.state.showPetType ? (
              <div value={this.state.petType} className="petType-wrapper">
                <h2 className="text-center choose-title">
                  Choose your pet-type (each pet separately)
                </h2>
                <div
                  onClick={this.petTypeDog}
                  className="text-center petTypeImg-wrapper"
                >
                  <img
                    className="pet-type-img pet-type-img__dog"
                    src="./images/dog-petType.png"
                    alt="dog-pet-type"
                  />
                  <h2 className="figCaption-pets">DOG</h2>
                </div>
                <div
                  onClick={this.petTypeCat}
                  className="text-center petTypeImg-wrapper"
                >
                  <img
                    className="pet-type-img pet-type-img__cat"
                    src="./images/cat-petType.png"
                    alt="dog-pet-type"
                  />
                  <h2 className="figCaption-pets">CAT</h2>
                </div>
              </div>
            ) : null}

            {/* MODAL */}
            <Modal
              size="xl"
              isOpen={this.state.modalToSchedule}
              toggle={this.toggleModal}
              modalClassName="modal-open-client-calendar"
            >
              <ModalHeader toggle={this.toggleModal}>
                Select day and time below to book your appointment with{" "}
                <b>
                  {" "}
                  {this.state.groomer.toLocaleUpperCase()}{" "}
                  <i className="fas fa-cut"></i>
                </b>
                <img
                  className="groomers-profile-pics__calendar"
                  src={
                    this.state.groomer === "Paula"
                      ? "./images/paolaFace.png"
                      : this.state.groomer === "Claudia"
                      ? "./images/claudiaFace.png"
                      : "./images/dianaFace.png"
                  }
                  alt="pet groomers"
                />
              </ModalHeader>

              <ModalBody className="modal-schedule text-center">
                <h3 className="schedule-primary-heading__availableTimes">
                  Select Date (Available times:{" "}
                  <span>
                    <i className="fa fa-square" aria-hidden="true"></i>
                  </span>
                  )
                </h3>
                <h3 className="modal-instructions">
                  Click on the number to go to a specific day and see more times
                </h3>
                <p>
                  Click on the desired {""}
                  available time{" "}
                  <span>
                    <i className="fa fa-square" aria-hidden="true"></i>
                  </span>
                  {""} (Note: Do Not click and drag)
                </p>
                <Calendar
                  // components={components}
                  style={{
                    height: "700px",
                    marginBottom: "200px",
                    background: "white",
                    paddingTop: "15px",
                  }}
                  events={this.state.datesFiltered}
                  // onSelectSlot={this.handleSelect}
                  // step={15}
                  selectable
                  eventPropGetter={this.eventStyleGetter}
                  timeslots={4}
                  defaultView="month"
                  views={["month", "day"]}
                  defaultDate={new Date()}
                  localizer={localizer}
                  min={new Date(2019, 10, 0, 7, 0, 0)}
                  max={new Date(2019, 10, 0, 15, 0, 0)}
                  onSelectEvent={this.handleEventGetter}
                />
              </ModalBody>
            </Modal>

            {/* Modal To Edit Events */}
            <div>
              <Modal
                isOpen={this.state.modalToEditEvent}
                toggle={this.toggleToEdit}
                modalClassName="modal-open-client-calendar"
              >
                <ModalHeader toggle={this.handleEventGetter}>
                  Enter your details
                </ModalHeader>
                <ModalBody>
                  <h5>
                    {" "}
                    Appointment for: <br />
                    <b>
                      {" "}
                      {moment(this.state.editStart).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </b>
                    <br />
                    Location:{" "}
                    <span className="important-size-cambridge">
                      Milton &#8594; 724 Main St E
                    </span>{" "}
                  </h5>
                  <Form onSubmit={this.onSubmitModalToEdit}>
                    <FormGroup row>
                      <Label for="petName" sm={4}>
                        Pet Name
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="petName"
                          id="petName"
                          value={this.state.petName}
                          placeholder="Pet Name"
                          onChange={this.onChangeModal}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="breed" sm={4}>
                        Breed
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="breed"
                          id="breed"
                          value={this.state.breed}
                          placeholder="Breed"
                          onChange={this.onChangeModal}
                        />{" "}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="phoneNumber" sm={4}>
                        Phone Number
                      </Label>
                      <Col sm={8}>
                        <Input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          value={this.state.phoneNumber}
                          placeholder="Phone Number"
                          onChange={this.onChangeModal}
                        />{" "}
                      </Col>
                    </FormGroup>
                    {this.state.petType === "Dog" ? (
                      <Select
                        options={optionsDogServices}
                        placeholder="Service"
                        isSearchable={false}
                        onChange={this.onSelectedDogServices}
                      />
                    ) : (
                      <Select
                        options={optionsCatServices}
                        placeholder="Service"
                        isSearchable={false}
                        onChange={this.onSelectedDogServices}
                      />
                    )}

                    <div className="first-time-client-wrapper">
                      <Select
                        options={optionsIsNewClient}
                        placeholder="Has your pet been here before?"
                        isSearchable={false}
                        onChange={this.onSelectedIsNewClient}
                      />
                    </div>

                    {<p className="err-msg-schedule">{this.state.errorMsg}</p>}
                    {this.state.loadingAxiosReq ? (
                      <p>Please wait...</p>
                    ) : (
                      <Button color="info" style={{ marginTop: "1rem" }} block>
                        BOOK YOUR APPOINTMENT
                      </Button>
                    )}
                    {/* <FormGroup></FormGroup> */}
                  </Form>
                </ModalBody>
              </Modal>
            </div>
            {/* Modal to edit events ends here */}

            {/* Modal Success */}
            <Modal
              size="lg"
              isOpen={this.state.modalSuccess}
              modalClassName="modal-success-app"
            >
              <ModalBody>
                <div className="text-center modal-success-container">
                  <h1 className="success-heading-modal">
                    Appointment Successfully booked!
                  </h1>
                  <hr />
                  <h4>Appointment Details</h4>
                  <p>
                    Location:{" "}
                    <span className="important-size-cambridge">
                      MILTON &#8594; 724 Main St E
                    </span>{" "}
                  </p>
                  <p>
                    {" "}
                    {moment(this.state.editStart).format(
                      "dddd, MMMM Do YYYY, h:mm a"
                    )}
                  </p>
                  <p>Groomer: {this.state.groomer}</p>
                  <p>
                    Should you need to cancel or modify your appointment, please
                    give us a call at <br /> 905 878 9009 or 905 878 5557
                  </p>
                  <button
                    className="modal-success-close-btn"
                    onClick={this.closeWindow}
                  >
                    Close window
                  </button>
                </div>
              </ModalBody>
            </Modal>

            {/* Modal Paola */}
            <ModalPaola
              modalPaolaState={this.state.modalPaola}
              toggleModalPaola={this.toggleModalPaola}
              selectPaola={this.selectPaola}
            />

            {/* Modal Claudia */}
            <ModalClaudia
              modalClaudiaState={this.state.modalClaudia}
              toggleModalClaudia={this.toggleModalClaudia}
              selectClaudia={this.selectClaudia}
            />

            {/* Modal Diana */}
            <ModalDiana
              modalDianaState={this.state.modalDiana}
              toggleModalDiana={this.toggleModalDiana}
              selectDiana={this.selectDiana}
            />
          </div>
        ) : this.state.city === "cambridge" ? (
          <div>
            <Cambridge />
          </div>
        ) : (
          <div className="text-center">
            <hr />
            <h2 className="text-center">Please select your city</h2>

            <button
              className="milton-btn"
              onClick={this.setCity}
              value="milton"
            >
              Milton
            </button>
            <button
              onClick={this.setCity}
              value="cambridge"
              className="cambridge-btn"
            >
              Cambridge <div className="new-cambridge-btn">New</div>
            </button>

            <hr />
          </div>
        )}
      </div>
    );
  }
}

export default index;
