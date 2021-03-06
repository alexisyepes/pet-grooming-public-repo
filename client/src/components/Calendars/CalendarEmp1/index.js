import React from "react";
import API from "../../../utils/API";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import { getCalEmp1Query } from "../../../queries/queries";
import ApolloClient from "apollo-boost";
import LoadPage from "../../LoadingPage";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const client = new ApolloClient({
  uri: "/graphql",
});

let options = [
  {
    value: "schedule",
    label: "Block this time slot (RED)",
  },
  {
    value: "online",
    label: "Open Time Slot for Appointments (WHITE)",
  },
  {
    value: "nails",
    label: "NAIL TRIM",
  },
  {
    value: "bath",
    label: "Book an Appointment (BATH)",
  },
  {
    value: "app",
    label: "Book an Appointment (SMALL DOG)",
  },
  {
    value: "mediumDog",
    label: "Book an Appointment (MEDIUM DOG)",
  },
  {
    value: "bigDog",
    label: "Book an Appointment (LARGE DOG)",
  },
  {
    value: "bathRequest",
    label: "BATH (REQUEST)",
  },
  {
    value: "appRequest",
    label: "SMALL DOG (REQUEST)",
  },
  {
    value: "mediumDogRequest",
    label: "MEDIUM DOG (REQUEST)",
  },
  {
    value: "bigDogRequest",
    label: "LARGE DOG (REQUEST)",
  },
];

let optionsToAdd = [
  {
    value: "schedule",
    label: "Block this time slot (RED)",
  },
  {
    value: "online",
    label: "Open Time Slot for Appointments (WHITE)",
  },
];

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class CalendarEmp1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteEventEmp1 = this.handleDeleteEventEmp1.bind(this);
    this.onSubmitModalToEditEmp1 = this.onSubmitModalToEditEmp1.bind(this);

    this.state = {
      modalEmp1: false,
      modalToEditEventEmp1: false,
      slotEventEmp1: "",
      title: "",
      lastModifiedBy: "",
      lastModifiedByEdit: "",
      appointmentEmp1: "",
      appointmentEditEmp1: "",
      editTitleEmp1: "",
      editStartEmp1: "",
      editEndEmp1: "",
      eventToEditEmp1: "",
      errorOnModalCalendar: "",
      cal_eventsEmp1: [
        //State is updated via componentDidMount
      ],
      searchAdminEvents: null,
      toggleSearchAppointments: false,
      inputSearchAppointments: "",
      loadingAxiosReq: false,
    };
  }

  async componentDidMount() {
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
          cal_eventsEmp1: appointments,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Modal Functions ************************************

  //Toggle for modal form to add Appointments to calendar

  handleToggleSearchAppointments = () => {
    this.setState({
      toggleSearchAppointments: !this.state.toggleSearchAppointments,
    });
  };

  toggleEmp1 = () => {
    if (!this.state.modalEmp1) {
      this.setState({
        errorOnModalCalendar: "",
        appointmentEmp1: "",
      });
    }
    this.setState({
      modalEmp1: !this.state.modalEmp1,
    });
  };

  //Toggle to edit appointments on calendar Emp2
  toggleToEditEmp1 = () => {
    this.setState({
      modalToEditEventEmp1: !this.state.modalToEditEventEmp1,
    });
  };

  // 	//Toggle Modal to show events search results
  toggleToShowSearchResults = () => {
    this.setState({
      modalToShowEventsResults: !this.state.modalToShowEventsResults,
    });
  };

  //onChange for modal forms
  onChangeModal = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelectedChanged = (value) => {
    this.setState({
      appointmentEmp1: value,
    });
  };

  //onChange for <Select /> on modal form
  onSelectedChangedEdit = async (value) => {
    await this.setState({
      appointmentEditEmp1: value,
    });
    // console.log(this.state.appointmentEdit);
  };

  //Submit for adding appointments to calendar (Emp1)
  onSubmitModalEmp1 = async (e) => {
    e.preventDefault();
    let obj = {
      title: this.state.title.toLowerCase(),
      start: this.state.slotEventEmp1.start,
      end: this.state.slotEventEmp1.end,
      appointment: this.state.appointmentEmp1.value,
      lastModifiedBy: localStorage.getItem("USERNAME"),
    };
    if (!obj.appointment) {
      this.setState({
        errorOnModalCalendar: "Fill out all the required fields!",
      });
      return;
    }
    if (obj.title === "") {
      this.setState({
        loadingAxiosReq: true,
      });
      await API.addAppointmentEmp1(obj)
        .then(() => {
          this.getAppointmentsCalendarEmp1();
          this.setState({
            slotEventEmp1: "",
            title: "",
            appointmentEmp1: "",
            modalEmp1: false,
            loadingAxiosReq: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loadingAxiosReq: false,
          });
        });
      this.state.cal_eventsEmp1.push(obj);
    } else {
      this.setState({
        loadingAxiosReq: true,
      });
      await API.addAppointmentEmp1(obj)
        .then(() => {
          this.getAppointmentsCalendarEmp1();
          this.setState({
            slotEventEmp1: "",
            title: "",
            appointmentEmp1: "",
            modalEmp1: false,
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

  async onSubmitModalToEditEmp1(e) {
    e.preventDefault();
    let obj = {
      id: this.state.eventToEditEmp1.id,
      title: this.state.editTitleEmp1.toLowerCase(),
      start: this.state.editStartEmp1,
      end: this.state.editEndEmp1,
      appointment: this.state.appointmentEditEmp1.value,
      lastModifiedBy: localStorage.getItem("USERNAME"),
    };
    let id = this.state.eventToEditEmp1.id;

    this.setState({
      loadingAxiosReq: true,
    });
    await API.updateAppointmentEmp1(id, obj)

      .then(() => {
        this.getAppointmentsCalendarEmp1();
        this.setState({
          modalToEditEventEmp1: false,
          loadingAxiosReq: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loadingAxiosReq: false,
        });
      });
    // window.location.reload();
  }

  async handleDeleteEventEmp1(id) {
    if (
      window.confirm(`Are you sure you wish to delete this Event permanently?`)
    ) {
      this.setState({
        loadingAxiosReq: true,
      });
      await API.deleteCalendarEmp1Event(id)
        .then(() => {
          this.getAppointmentsCalendarEmp1();
          this.setState({
            modalToEditEventEmp1: false,
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
  }

  //Slot event on Calendar opens modal Emp1
  handleSelectEmp1 = (slot) => {
    let slotEventEmp1 = {
      start: this.convertDate(slot.start),
      end: this.convertDate(slot.end),
    };

    this.setState({
      slotEventEmp1,
    });
    this.toggleEmp1();
  };

  // Modal Functions End **************************************

  convertDate = (date) => {
    return moment.utc(date).toDate();
  };

  convertResultsDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm a");
  };

  getAppointmentsCalendarEmp1 = () => {
    API.getAppointmentsEmp1()
      .then((response) => {
        let appointments = response.data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].end);
        }
        this.setState({
          cal_eventsEmp1: appointments,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Opens up modal with event info to update Emp1
  handleEventGetterEmp1 = (event) => {
    let id = event.id;
    this.toggleToEditEmp1();
    API.getAppointmentEmp1(id)
      .then((res) => {
        this.setState({
          eventToEditEmp1: res.data,
          appointmentEditEmp1: res.data.appointment,
          editTitleEmp1: res.data.title,
          editStartEmp1: res.data.start,
          editEndEmp1: res.data.end,
          lastModifiedByEdit: res.data.lastModifiedBy,
        });
      })
      .then(
        this.setState({
          eventToEditEmp1: "",
          appointmentEditEmp1: "",
          editTitleEmp1: "",
          editStartEmp1: "",
          editEndEmp1: "",
          lastModifiedByEdit: "",
        })
      )
      .catch((error) => console.log(error));
  };

  //Function to define styling on Calendar's Emp1's events
  eventStyleGetterEmp1 = (event, start, end, isSelected) => {
    var style = {
      backgroundColor: "rgb(51, 156, 255)",
      borderRadius: "5px",
      opacity: 0.8,
      fontSize: "16px",
      color: "white",
      border: "1px solid blue",
      display: "block",
      paddingLeft: "12px",
      paddingRight: "12px",
      textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
    };
    if (event.appointment === "schedule") {
      style.backgroundColor = "red";
      style.color = "white";
    }
    if (event.appointment === "online") {
      style.backgroundColor = "white";
      style.color = "white";
    }
    if (event.appointment === "nails") {
      style.backgroundColor = "#5df505";
    }
    if (event.appointment === "bigDog") {
      style.backgroundColor = "rgb(0, 26, 51)";
    }
    if (event.appointment === "mediumDog") {
      style.backgroundColor = "#0056b3";
      style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
    }
    if (event.appointment === "bath") {
      style.backgroundColor = "rgb(0, 255, 255)";
    }
    //Request Conditionals
    if (event.appointment === "bigDogRequest") {
      style.backgroundColor = "rgb(0, 26, 51)";
      style.border = "4px dotted #e6b800";
    }
    if (event.appointment === "mediumDogRequest") {
      style.backgroundColor = "#0056b3";
      style.textShadow = "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black";
      style.border = "4px dotted #e6b800";
    }
    if (event.appointment === "bathRequest") {
      style.backgroundColor = "rgb(0, 255, 255)";
      style.border = "4px dotted #e6b800";
    }
    if (event.appointment === "appRequest") {
      style.backgroundColor = "rgb(51, 156, 255)";
      style.border = "4px dotted #e6b800";
    }
    return {
      style,
    };
  };

  handleSearchAppointmentsSubmit = async (e) => {
    e.preventDefault();
    this.toggleToShowSearchResults();

    let result = this.state.cal_eventsEmp1.filter((word) =>
      word.title.includes(this.state.inputSearchAppointments.toLowerCase())
    );
    await this.setState({
      searchAdminEvents: result,
    });
  };

  render() {
    const { cal_eventsEmp1 } = this.state;
    const appointment = this.state.appointmentEmp1;
    const appointmentEdit = this.state.appointmentEditEmp1;

    let components = {};

    const searchResults = this.state.searchAdminEvents;
    const searchResultsList =
      searchResults !== null && searchResults.length > 0 ? (
        searchResults.map((event) => {
          return (
            <div key={event.id}>
              <ul>
                <li>{event.title}</li>
                <li>{JSON.stringify(this.convertResultsDate(event.start))}</li>
              </ul>
              <hr />
            </div>
          );
        })
      ) : (
        <div>Nothing was found</div>
      );

    return (
      <div className="container emp1Calendar-container">
        <div className="row">
          {/* Modal To add Event to Emp1 Calendar */}
          <div>
            <Modal isOpen={this.state.modalEmp1} toggle={this.toggleEmp1}>
              <ModalHeader toggle={this.handleSelectEmp1}>
                Set The event type on the Calendar for Groomer 2
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitModalEmp1}>
                  <FormGroup>
                    <Select
                      name="form-field-name"
                      value={appointment}
                      options={optionsToAdd}
                      placeholder="Select one of the following:"
                      isSearchable={false}
                      onChange={this.onSelectedChanged}
                    />
                    <p className="time-on-modal">
                      Starts:
                      {moment(this.state.slotEventEmp1.start).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </p>
                    <p className="time-on-modal">
                      Ends:
                      {moment(this.state.slotEventEmp1.end).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </p>

                    <p
                      style={{
                        color: "red",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      {this.state.errorOnModalCalendar}
                    </p>

                    {this.state.loadingAxiosReq ? (
                      <LoadPage />
                    ) : (
                      <Button color="info" style={{ marginTop: "1rem" }} block>
                        Submit Event
                      </Button>
                    )}
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
          {/* Modal to add event to calendar ends here */}

          {/* Modal To Edit Events Emp1 */}
          <div>
            <Modal
              isOpen={this.state.modalToEditEventEmp1}
              toggle={this.toggleToEditEmp1}
            >
              <ModalHeader toggle={this.handleEventGetterEmp1}>
                Please confirm your event details for Groomer 2
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitModalToEditEmp1}>
                  <FormGroup>
                    {/* <p className="appointment-type-select">
                      Appointment Code: {appointmentEdit}
                    </p> */}
                    <Select
                      name="form-field-name"
                      value={appointmentEdit}
                      options={options}
                      placeholder="Select one of the following:"
                      isSearchable={false}
                      onChange={this.onSelectedChangedEdit}
                    />
                    <Input
                      type="text"
                      name="editTitleEmp1"
                      id="editTitleEmp1"
                      defaultValue={this.state.editTitleEmp1}
                      placeholder="Please enter the event details"
                      onChange={this.onChangeModal}
                    />

                    <p className="time-on-modal">
                      Appointment:
                      <b>
                        {moment(this.state.editStartEmp1).format(
                          "dddd, MMMM Do YYYY, h:mm a"
                        )}
                      </b>
                    </p>

                    <p className="text-center">
                      Last change made by:{" "}
                      <strong>{this.state.lastModifiedByEdit}</strong>
                    </p>

                    {this.state.loadingAxiosReq ? (
                      <LoadPage />
                    ) : (
                      <Button color="info" style={{ marginTop: "1rem" }} block>
                        Submit Event
                      </Button>
                    )}
                  </FormGroup>
                </Form>
                {this.state.loadingAxiosReq ? (
                  <LoadPage />
                ) : (
                  <Button
                    onClick={() => {
                      this.handleDeleteEventEmp1(this.state.eventToEditEmp1.id);
                    }}
                    color="danger"
                    style={{ marginTop: "1rem" }}
                    block
                  >
                    Delete Event
                  </Button>
                )}
              </ModalBody>
            </Modal>
          </div>
          {/* Modal to edit events ends here */}

          {/* Modal To See events search Results Admin Calendar */}
          <div>
            <Modal
              isOpen={this.state.modalToShowEventsResults}
              toggle={this.toggleToShowSearchResults}
            >
              <ModalHeader toggle={this.toggleToShowSearchResults}>
                Search Results
              </ModalHeader>
              <ModalBody>
                <ul>{searchResultsList}</ul>
              </ModalBody>
            </Modal>
          </div>
          {/* Modal To See events search Results Admin Calendar */}

          <button
            onClick={this.handleToggleSearchAppointments}
            className="searchAppointmentsButton"
          >
            <i className="fas fa-calendar-alt"></i> Search Appointments{" "}
            <i className="fas fa-search"></i>{" "}
          </button>
          <div className="searchContainer-appointments">
            {this.state.toggleSearchAppointments ? (
              <form onSubmit={this.handleSearchAppointmentsSubmit}>
                <input
                  defaultValue={this.state.inputSearchAppointments}
                  name="inputSearchAppointments"
                  placeholder="type a word"
                  onChange={this.onChangeModal}
                  required
                  className="input-search-appointments"
                  type="text"
                />
                <button
                  placeholder="search appointments"
                  className="input-search-appointments-btn"
                  type="submit"
                >
                  Search
                </button>
              </form>
            ) : null}
          </div>

          {/* Employee #1 calendar Starts*/}
          <div className="col-md-12 calendars-wrapper">
            <h2
              style={{
                textAlign: "center",
                paddingTop: "15px",
                color: " rgb(14, 77, 97)",
              }}
            >
              Groomer 2
            </h2>
            <hr style={{ background: "white" }}></hr>
            <Calendar
              components={components}
              style={{
                height: "700px",
                marginBottom: "200px",
                background: "#cce5ff",
                paddingTop: "15px",
                border: "1px solid #D25299",
              }}
              events={cal_eventsEmp1}
              onSelectSlot={this.handleSelectEmp1}
              step={30}
              selectable
              eventPropGetter={this.eventStyleGetterEmp1}
              timeslots={2}
              defaultView="day"
              views={["month", "day"]}
              defaultDate={new Date()}
              localizer={localizer}
              min={new Date(2019, 10, 0, 7, 0, 0)}
              max={new Date(2019, 10, 0, 15, 0, 0)}
              onSelectEvent={this.handleEventGetterEmp1}
            />
          </div>
          {/* Employee #1 calendar Ends*/}
        </div>
      </div>
    );
  }
}

export default CalendarEmp1;
