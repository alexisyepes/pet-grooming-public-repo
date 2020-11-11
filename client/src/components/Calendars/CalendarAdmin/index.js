import React from "react";
import API from "../../../utils/API";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Select from "react-select";
import { getCalAdminQuery } from "../../../queries/queries";
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
import "./style.css";

const client = new ApolloClient({
  uri: "/graphql",
});

let optionsAdmin = [
  {
    value: "schedule",
    label: "Block this time slot (RED)",
  },
  {
    value: "online",
    label: "Open Time Slot for Appointments (WHITE)",
  },
  {
    value: "onlineCat",
    label: "Open Time Slot for Cat's Appointments (WHITE)",
  },
  {
    value: "nails",
    label: "NAIL TRIM",
  },
  {
    value: "cat",
    label: "Book an Appointment (CAT)",
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

let optionsAdminToAdd = [
  {
    value: "schedule",
    label: "Block this time slot (RED)",
  },
  {
    value: "online",
    label: "Open Time Slot for DOG's Appointments (WHITE)",
  },
  {
    value: "onlineCat",
    label: "Open Time Slot for CAT's Appointments (WHITE)",
  },
];

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

class CalendarAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.onSubmitModalToEdit = this.onSubmitModalToEdit.bind(this);

    this.state = {
      modal: false,
      modalToEditEvent: false,
      slotEvent: "",
      title: "",
      appointment: "",
      appointmentEdit: "",
      lastModifiedByEdit: "",
      lastModifiedBy: "",
      editTitle: "",
      editStart: "",
      editEnd: "",
      eventToEdit: "",
      errorOnModalCalendar: "",
      cal_eventsAdmin: [
        //State is updated via componentDidMount
      ],
      searchAdminEvents: null,
      toggleSearchAppointments: false,
      inputSearchAppointments: "",
      loadingAxiosReq: false,
    };
  }

  async componentDidMount() {
    // this.getAppointmentsFromGraphQl();
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
          cal_eventsAdmin: appointments,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Modal Functions ************************************

  handleToggleSearchAppointments = () => {
    this.setState({
      toggleSearchAppointments: !this.state.toggleSearchAppointments,
    });
  };

  //Toggle for modal form to add Appointments to calendar
  toggle = () => {
    if (!this.state.modal) {
      this.setState({
        errorOnModalCalendar: "",
        appointment: "",
      });
    }
    this.setState({
      modal: !this.state.modal,
    });
  };

  //Toggle to edit appointments on calendar
  toggleToEdit = () => {
    this.setState({
      modalToEditEvent: !this.state.modalToEditEvent,
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

  //onChange for <Select /> on modal form
  onSelectedChanged = (value) => {
    this.setState({
      appointment: value,
    });
  };

  //onChange for <Select /> on modal form
  onSelectedChangedEdit = async (value) => {
    await this.setState({
      appointmentEdit: value,
    });
    // console.log(this.state.appointmentEdit);
  };

  //Submit for adding appointments to calendar (Admin)
  onSubmitModal = async (e) => {
    e.preventDefault();
    let obj = {
      title: this.state.title.toLowerCase(),
      start: this.state.slotEvent.start,
      end: this.state.slotEvent.end,
      appointment: this.state.appointment.value,
      lastModifiedBy: localStorage.getItem("USERNAME"),
    };
    // console.log(obj.appointment);
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
      await API.addAppointmentAdmin(obj)
        .then(() => {
          this.getAppointmentsCalendarAdmin();
          this.setState({
            slotEvent: "",
            title: "",
            appointment: "",
            lastModifiedBy: "",
            modal: false,
            loadingAxiosReq: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loadingAxiosReq: false,
          });
        });

      this.state.cal_eventsAdmin.push(obj);
    } else {
      this.setState({
        loadingAxiosReq: true,
      });
      await API.addAppointmentAdmin(obj)
        .then(() => {
          this.getAppointmentsCalendarAdmin();
          this.setState({
            slotEvent: "",
            title: "",
            appointment: "",
            modal: false,
            loadingAxiosReq: false,
            lastModifiedBy: "",
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

  async onSubmitModalToEdit(e) {
    e.preventDefault();

    let obj = {
      id: this.state.eventToEdit.id,
      title: this.state.editTitle.toLowerCase(),
      start: this.state.editStart,
      end: this.state.editEnd,
      appointment: this.state.appointmentEdit.value,
      lastModifiedBy: localStorage.getItem("USERNAME"),
    };

    let id = this.state.eventToEdit.id;
    this.setState({
      loadingAxiosReq: true,
    });
    await API.updateAppointmentAdmin(id, obj)

      .then(() => {
        this.getAppointmentsCalendarAdmin();
        this.setState({
          modalToEditEvent: false,
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

  async handleDeleteEvent(id) {
    if (
      window.confirm(`Are you sure you wish to delete this Event permanently?`)
    ) {
      this.setState({
        loadingAxiosReq: true,
      });
      await API.deleteCalendarAdminEvent(id)
        .then(() => {
          this.getAppointmentsCalendarAdmin();
          this.setState({
            modalToEditEvent: false,
            loadingAxiosReq: false,
          });
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loadingAxiosReq: false,
          });
        }); // window.location.reload();
    }
  }

  //Slot event on Calendar opens modal
  handleSelect = (slot) => {
    let slotEvent = {
      start: this.convertDate(slot.start),
      end: this.convertDate(slot.end),
    };

    this.setState({
      slotEvent,
    });
    this.toggle();
  };

  // Modal Functions End **************************************

  convertDate = (date) => {
    return moment.utc(date).toDate();
  };

  convertResultsDate = (date) => {
    return moment(date).format("MMMM Do YYYY, h:mm a");
  };

  getAppointmentsCalendarAdmin = async () => {
    await API.getAppointmentsAdmin()
      .then((response) => {
        let appointments = response.data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].end);
        }
        this.setState({
          cal_eventsAdmin: appointments,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Opens up modal with event info to update
  handleEventGetter = (event) => {
    let id = event.id;
    this.toggleToEdit();
    API.getAppointmentAdmin(id)
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
      .then(
        this.setState({
          eventToEdit: "",
          appointmentEdit: "",
          editTitle: "",
          editStart: "",
          editEnd: "",
        })
      )
      .catch((error) => console.log(error));
  };

  //Function to define styling on Calendar's Admin's events
  eventStyleGetter = (event, start, end, isSelected) => {
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
    if (event.appointment === "onlineCat") {
      style.backgroundColor = "white";
      style.color = "white";
      style.border = "4px solid pink";
    }
    if (event.appointment === "nails") {
      style.backgroundColor = "#5df505";
    }
    if (event.appointment === "cat") {
      style.backgroundColor = "rgb(255, 187, 51)";
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

    let result = this.state.cal_eventsAdmin.filter((word) =>
      word.title.includes(this.state.inputSearchAppointments.toLowerCase())
    );

    await this.setState({
      searchAdminEvents: result,
    });
  };

  render() {
    const { cal_eventsAdmin } = this.state;
    const appointment = this.state.appointment;
    const appointmentEdit = this.state.appointmentEdit;

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
      <div className="container">
        <div className="row">
          {/* Modal To add Event to Admin Calendar */}
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.handleSelect}>
                Set The event type on the Calendar for Groomer 1
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitModal}>
                  <FormGroup>
                    <Select
                      name="form-field-name"
                      value={appointment}
                      options={optionsAdminToAdd}
                      placeholder="Select one of the following:"
                      isSearchable={false}
                      onChange={this.onSelectedChanged}
                    />
                    <p className="time-on-modal">
                      Starts:
                      {moment(this.state.slotEvent.start).format(
                        "dddd, MMMM Do YYYY, h:mm a"
                      )}
                    </p>
                    <p className="time-on-modal">
                      Ends:
                      {moment(this.state.slotEvent.end).format(
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

          {/* Modal To Edit Events */}
          <div>
            <Modal
              isOpen={this.state.modalToEditEvent}
              toggle={this.toggleToEdit}
            >
              <ModalHeader toggle={this.handleEventGetter}>
                Please confirm your event details for Groomer 1
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitModalToEdit}>
                  <FormGroup>
                    {/* <p className="appointment-type-select">
                      Appointment Code: {appointmentEdit}
                    </p> */}
                    <Select
                      name="form-field-name"
                      value={appointmentEdit}
                      options={optionsAdmin}
                      placeholder="Select one of the following:"
                      isSearchable={false}
                      onChange={this.onSelectedChangedEdit}
                    />

                    <Input
                      type="text"
                      name="editTitle"
                      id="editTitle"
                      defaultValue={this.state.eventToEdit.title}
                      placeholder="Please enter the event details"
                      onChange={this.onChangeModal}
                    />

                    <p className="time-on-modal">
                      Appointment:
                      <b>
                        {moment(this.state.editStart).format(
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
                <Button
                  onClick={() => {
                    this.handleDeleteEvent(this.state.eventToEdit.id);
                  }}
                  color="danger"
                  style={{ marginTop: "1rem" }}
                  block
                >
                  Delete Event
                </Button>
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
            <i className="fas fa-search"></i>
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

          {/* Admin's Calendar */}
          <div className="col-md-12 calendars-wrapper">
            <h2
              style={{
                textAlign: "center",
                paddingTop: "15px",
                color: " rgb(14, 77, 97)",
              }}
            >
              Groomer 1
            </h2>
            <hr style={{ background: "white" }}></hr>
            <Calendar
              components={components}
              style={{
                height: "700px",
                marginBottom: "200px",
                background: "white",
                paddingTop: "15px",
                border: "1px solid #D25299",
              }}
              events={cal_eventsAdmin}
              onSelectSlot={this.handleSelect}
              step={15}
              selectable
              eventPropGetter={this.eventStyleGetter}
              timeslots={4}
              defaultView="day"
              views={["month", "day"]}
              defaultDate={new Date()}
              localizer={localizer}
              min={new Date(2019, 10, 0, 8, 30, 0)}
              max={new Date(2019, 10, 0, 15, 0, 0)}
              onSelectEvent={this.handleEventGetter}
            />
          </div>
          {/* Admin's Calendar Ends*/}
        </div>
      </div>
    );
  }
}

export default CalendarAdmin;
