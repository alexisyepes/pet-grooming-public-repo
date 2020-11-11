import React, { useState } from "react";
import "./style.scss";
import Select from "react-select";
import ApolloClient from "apollo-boost";
import { getCalCambridgePaolaQuery } from "../../queries/queries";
import ModalPaola from "../../components/Modals/ModalPaola";
import { Link } from "react-scroll";
import API from "../../utils/API";
import moment from "moment";
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

let optionsDogSize = [
  {
    value: "appRequest",
    label: "Small (1-15 lbs) Only small-size dogs in the Cambridge location",
  },
  // {
  //   value: "mediumDogRequest",
  //   label: "Medium (11-25 lbs)",
  // },
];

let optionsGroomers = [
  {
    value: "Paula",
    label: "Paula",
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

const client = new ApolloClient({
  uri: "/graphql",
});

const convertDate = (date) => {
  return moment.utc(date).toDate();
};

const Index = () => {
  const [petType, setPetType] = useState("");
  const [showPetType, setShowPetType] = useState(true);
  const [groomer, setGroomer] = useState("");
  const [dogSize, setDogSize] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [service, setService] = useState("");
  const [isNewClient, setIsNewClient] = useState("");

  //Modals
  const [modalPaola, setModalPaola] = useState(false);
  const [modalToSchedule, setModalToSchedule] = useState(false);
  const [modalToEditEvent, setModalToEditEvent] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  //dates to populate calendar
  const [datesFiltered, setDatesFiltered] = useState([]);
  //edit event on modal
  const [eventToEdit, setEventToEdit] = useState("");

  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  //axios
  const [loadingAxiosReq, setLoadingAxiosReq] = useState(false);

  const selectPaola = () => {
    setGroomer("Paula");
    setModalPaola(false);
  };

  const resetPetType = () => {
    setPetType("");
    setShowPetType(true);
    setGroomer("");
    setDogSize("");
  };

  const closeWindow = () => {
    window.location.reload();
  };

  const toggleModalPaola = () => {
    setModalPaola(!modalPaola);
  };

  const toggleModal = () => {
    setModalToSchedule(!modalToSchedule);
  };

  //Toggle to edit appointments on calendar
  const toggleToEdit = () => {
    if (!modalToEditEvent) {
      setErrorMsg("");
      setPetName("");
      setBreed("");
      setPhoneNumber("");
      // setCheckedNewClient(true);
    }

    setModalToEditEvent(!modalToEditEvent);
  };

  const changePetTypeToDog = () => {
    setPetType("Dog");
    setShowPetType(false);
  };

  const changePetTypeToCat = () => {
    setPetType("Cat");
    setShowPetType(false);
  };

  const onSelectedGroomer = (value) => {
    setGroomer(value.value);
  };

  const onSelectedDogSize = (value) => {
    setDogSize(value.value);
  };

  const onSelectedDogServices = (value) => {
    setService(value.value);
  };

  const onSelectedIsNewClient = async (value) => {
    setIsNewClient(value.value);
  };

  const getPaolasCatHours = async () => {
    toggleModal();
    await client
      .query({
        query: getCalCambridgePaolaQuery,
      })
      .then((response) => {
        console.log(response);
        let appointments = response.data.getAllCalendarsCambridgePaola;
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = convertDate(appointments[i].start);
          appointments[i].end = convertDate(appointments[i].end);
        }

        setDatesFiltered(
          appointments.filter(
            (availTime) =>
              availTime.appointment === "onlineCat" &&
              availTime.start > new Date()
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPaolasDogHours = async () => {
    toggleModal();
    await client
      .query({
        query: getCalCambridgePaolaQuery,
      })
      .then((response) => {
        console.log(response);
        let appointments = response.data.getAllCalendarsCambridgePaola;
        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = convertDate(appointments[i].start);
          appointments[i].end = convertDate(appointments[i].end);
        }

        setDatesFiltered(
          appointments.filter(
            (availTime) =>
              availTime.appointment === "online" && availTime.start > new Date()
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
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

  const //Opens up modal with event info to update
    handleEventGetter = async (event) => {
      let id = event.id;
      toggleToEdit();
      if (groomer === "Paula") {
        await API.getAppointmentCambridgePaola(id)
          .then((res) => {
            setEventToEdit(res.data);
            setEditStart(res.data.start);
            setEditEnd(res.data.end);
            // setLastModifiedByEdit(res.data.lastModifiedBy);
          })
          .catch((error) => console.log(error));
      }
    };

  const onSubmitModalToEdit = async (e) => {
    e.preventDefault();

    if (!petName || !breed || !phoneNumber || !service) {
      return setErrorMsg("All fields are required!");
    }

    if (isNewClient === "") {
      return setErrorMsg("Has your pet been here before?");
    }

    let appointmentType;

    if (dogSize === "appRequest" && service === "Bath") {
      appointmentType = "bathRequest";
    } else if (dogSize === "appRequest") {
      appointmentType = "appRequest";
    }
    if (dogSize === "mediumDogRequest" && service === "Bath") {
      appointmentType = "bathRequest";
    } else if (dogSize === "mediumDogRequest") {
      appointmentType = "mediumDogRequest";
    }
    if (dogSize === "bigDogRequest" && service === "Bath") {
      appointmentType = "bathRequest";
    } else if (dogSize === "bigDogRequest") {
      appointmentType = "bigDogRequest";
    }
    if (petType === "Cat") {
      appointmentType = "cat";
    }

    let isClientNew;
    if (isNewClient === "No") {
      isClientNew = "New Client";
    } else if (isNewClient === "Yes") {
      isClientNew = "Existing Client";
    }

    let obj = {
      id: eventToEdit.id,
      title:
        petName.toLowerCase() +
        " " +
        breed.toLowerCase() +
        " " +
        "Ph#: " +
        phoneNumber.replace(/[- )(]/g, "") +
        " " +
        isClientNew +
        "--" +
        service,
      start: editStart,
      end: editEnd,
      appointment: appointmentType,
      lastModifiedBy: "Client online booking",
    };

    let id = eventToEdit.id;
    setLoadingAxiosReq(true);

    if (groomer === "Paula") {
      await API.updateAppointmentCambridgePaola(id, obj)

        .then(() => {
          setModalSuccess(true);
          setModalToEditEvent(false);
          setModalToSchedule(false);
          setLoadingAxiosReq(false);
        })
        .catch((error) => {
          console.log(error);
          setLoadingAxiosReq(false);
          alert(
            "We are sorry, something went wrong! Please give us a call at 905 749 1238"
          );
        });
    }
  };

  return (
    <div className="cambridge-container">
      <h3 className="text-center cambridge-by-appointment">
        (By appointment only)
      </h3>

      <hr />

      {petType ? (
        <div>
          <button className="reset-btn-schedule" onClick={resetPetType}>
            Reset and Start over
          </button>
          <h2 className="text-center schedule-primary-heading__petType">
            Pet Type Selected:{" "}
            <b>
              {petType} <i className="fas fa-paw"></i>
            </b>
          </h2>
          <hr />
          {petType === "Dog" ? (
            <div className="container">
              {dogSize !== "" ? (
                <div>
                  {dogSize === "appRequest" ? (
                    <h3 className="schedule-primary-heading__petType">
                      Small Size Dog <i className="fas fa-paw"></i>{" "}
                    </h3>
                  ) : dogSize === "mediumDogRequest" ? (
                    <h3 className="schedule-primary-heading__petType">
                      Medium Size Dog <i className="fas fa-paw"></i>
                    </h3>
                  ) : dogSize === "bigDogRequest" ? (
                    <h3 className="schedule-primary-heading__petType">
                      Large/X-Large Size Dog <i className="fas fa-paw"></i>
                    </h3>
                  ) : (
                    <h3 className="schedule-primary-heading__petType">
                      Large/X-Large Size Dog <i className="fas fa-paw"></i>
                    </h3>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-center schedule-primary-heading__petType">
                    What Size?{" "}
                  </h3>
                  <p className="text-center">
                    <span className="important-size-cambridge">
                      Important &#8594;
                    </span>{" "}
                    only small size dogs accepted in the Cambridge location
                  </p>
                  <Select
                    defaultValue={dogSize}
                    options={optionsDogSize}
                    placeholder="Size"
                    isSearchable={false}
                    onChange={onSelectedDogSize}
                  />
                </div>
              )}
              {groomer !== "" ? (
                <div>
                  <h2 className="text-center schedule-primary-heading__petType">
                    Selected Groomer: {groomer} <i className="fas fa-cut"></i>
                  </h2>
                  <Select
                    options={optionsGroomers}
                    placeholder="Select Groomer"
                    isSearchable={false}
                    onChange={onSelectedGroomer}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-center schedule-primary-heading__petType">
                    Select a Groomer <i className="fas fa-cut"></i>
                  </h3>
                  <Select
                    value={groomer}
                    options={optionsGroomers}
                    placeholder="Select Groomer"
                    isSearchable={false}
                    onChange={onSelectedGroomer}
                  />
                  <div className="groomers-profile-pics__wrapper text-center">
                    <div
                      onClick={toggleModalPaola}
                      className="groomers-profile-pics__parent"
                    >
                      <img
                        className="groomers-profile-pics__cat"
                        src="/images/paolaFace.png"
                        alt="pet groomer"
                      />
                      <p>
                        <b>PAULA</b>{" "}
                      </p>{" "}
                    </div>
                  </div>
                </div>
              )}
              {petType && groomer === "Paula" && dogSize !== "" ? (
                <button
                  onClick={getPaolasDogHours}
                  className="continue-schedule-btn"
                >
                  Continue
                </button>
              ) : null}
            </div>
          ) : (
            <div className="container">
              {petType === "Cat" && groomer === "" ? (
                <div>
                  <h3 className="text-center">Select a Groomer</h3>
                  <Select
                    options={optionsCatGroomers}
                    placeholder="Select Groomer"
                    isSearchable={false}
                    onChange={onSelectedGroomer}
                  />
                  <div onClick={toggleModalPaola} className="text-center">
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
                      Selected Groomer: <b>{groomer}</b>{" "}
                      <i className="fas fa-cut"></i>
                    </h2>

                    <button
                      onClick={getPaolasCatHours}
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

      {showPetType ? (
        <div value={petType} className="petType-wrapper">
          <h3 className="text-center choose-title">
            Choose your pet-type (each pet separately)
          </h3>
          <div
            onClick={changePetTypeToDog}
            className="text-center petTypeImg-wrapper"
          >
            <img
              className="pet-type-img pet-type-img__dog"
              src="/images/dog-petType.png"
              alt="dog-pet-type"
            />
            <h2 className="figCaption-pets">DOG</h2>
          </div>
          <div
            onClick={changePetTypeToCat}
            className="text-center petTypeImg-wrapper"
          >
            <img
              className="pet-type-img pet-type-img__cat"
              src="/images/cat-petType.png"
              alt="dog-pet-type"
            />
            <h2 className="figCaption-pets">CAT</h2>
          </div>
        </div>
      ) : null}

      {/* MODAL */}
      <Modal
        size="xl"
        isOpen={modalToSchedule}
        toggle={toggleModal}
        modalClassName="modal-open-client-calendar"
      >
        <ModalHeader toggle={toggleModal}>
          Select day and time below to book your appointment with{" "}
          <b>
            {" "}
            {groomer.toLocaleUpperCase()} <i className="fas fa-cut"></i>
          </b>
          <img
            className="groomers-profile-pics__calendar"
            src={groomer === "Paula" ? "./images/paolaFace.png" : null}
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
            events={datesFiltered}
            selectable
            eventPropGetter={eventStyleGetter}
            timeslots={4}
            defaultView="month"
            views={["month", "day"]}
            defaultDate={new Date()}
            localizer={localizer}
            min={new Date(2019, 10, 0, 7, 0, 0)}
            max={new Date(2019, 10, 0, 15, 0, 0)}
            onSelectEvent={handleEventGetter}
          />
        </ModalBody>
      </Modal>

      {/* Modal success */}
      <Modal size="lg" isOpen={modalSuccess} modalClassName="modal-success-app">
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
                CAMBRIDGE &#8594; 205 Cowan Blvd
              </span>{" "}
            </p>
            <p> {moment(editStart).format("dddd, MMMM Do YYYY, h:mm a")}</p>
            <p>Groomer: {groomer}</p>
            <p>
              Should you need to cancel or modify your appointment, please give
              us a call at <br /> 905 749 1238
            </p>
            <Link
              activeClass="active"
              to="schedule-containerId"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button className="modal-success-close-btn" onClick={closeWindow}>
                Close window
              </button>
            </Link>
          </div>
        </ModalBody>
      </Modal>

      {/* Modal Paola */}
      <ModalPaola
        modalPaolaState={modalPaola}
        toggleModalPaola={toggleModalPaola}
        selectPaola={selectPaola}
      />

      {/* Modal To Edit Events */}
      <div>
        <Modal
          modalClassName="modal-add-events"
          isOpen={modalToEditEvent}
          toggle={toggleToEdit}
        >
          <ModalHeader toggle={handleEventGetter}>
            Enter your details
          </ModalHeader>
          <ModalBody>
            <h5>
              {" "}
              Appointment for <br />
              <b>
                {" "}
                {moment(editStart).format("dddd, MMMM Do YYYY, h:mm a")}
              </b>{" "}
              <br />
              Location:{" "}
              <span className="important-size-cambridge">
                Cambridge &#8594; 205 Cowan Blvd
              </span>{" "}
            </h5>
            <Form onSubmit={onSubmitModalToEdit}>
              <FormGroup row>
                <Label for="petName" sm={4}>
                  Pet Name
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="petName"
                    id="petName"
                    value={petName}
                    placeholder="Pet Name"
                    onChange={(e) => setPetName(e.target.value)}
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
                    value={breed}
                    placeholder="Breed"
                    onChange={(e) => setBreed(e.target.value)}
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
                    value={phoneNumber}
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />{" "}
                </Col>
              </FormGroup>
              {petType === "Dog" ? (
                <Select
                  options={optionsDogServices}
                  placeholder="Service"
                  isSearchable={false}
                  onChange={onSelectedDogServices}
                />
              ) : (
                <Select
                  options={optionsCatServices}
                  placeholder="Service"
                  isSearchable={false}
                  onChange={onSelectedDogServices}
                />
              )}

              <div className="first-time-client-wrapper">
                <Select
                  options={optionsIsNewClient}
                  placeholder="Has your pet been here before?"
                  isSearchable={false}
                  onChange={onSelectedIsNewClient}
                />
              </div>

              {<p className="err-msg-schedule">{errorMsg}</p>}
              {loadingAxiosReq ? (
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
    </div>
  );
};

export default Index;
