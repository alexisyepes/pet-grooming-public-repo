import axios from "axios";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import API from "../../utils/API";
import BootstrapTable from "react-bootstrap-table-next";
import { getClientsQuery, getPetsQuery } from "../../queries/queries";
import ApolloClient from "apollo-boost";
import CalendarAdmin from "../../components/Calendars/CalendarAdmin";
import CalendarEmp1 from "../../components/Calendars/CalendarEmp1";
import CalendarEmp2 from "../../components/Calendars/CalendarEmp2";
import CalendarCambridgePaola from "../../components/Calendars/CalendarCambrigdePaola";
import SearchClients from "../../components/SearchClients";
import { Table, Button, Form, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./style.scss";
import paginationFactory from "react-bootstrap-table2-paginator";

const client = new ApolloClient({
  uri: "/graphql",
});

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      pets: [],
      clientIdNumber: [],
      lastName: "",
      firstName: "",
      primaryPhoneNumber: "",
      cellphone: "",
      workPhone: "",
      email: "",
      employee: "",
      isLoading: true,
      error: false,
      toggleAddAppointmentForm: false,
      toggleSearchClientByPhoneForm: false,
      clientSearchInputByPhone: "",
      clientSearchValuePhone: [],
      modalToShowResultsByPhone: false,
      modalToShowResultsByLastName: false,
      modalToShowResultsByFirstName: false,
      modalToShowResultsByPetName: false,
      modalCambridgeCal: false,
      modalToAddClients: false,
      modal: false,
      petNameSearchInput: "",
      petNameSearchResults: [],
      lastNameSearchInput: "",
      lastNameSearchResults: [],
      firstNameSearchInput: "",
      firstNameSearchResults: [],

      errorMsgOnSearchFormPhone: "",
      errorMsgOnSearchFormPetName: "",
      errorMsgOnSearchFormFirstName: "",
      errorMsgOnSearchFormLastName: "",
      errorMsg: "",
      onlyNumbersOnSearchForm: "",
      jobType: "",
      toggleClientsTable: false,
      togglePetsTable: false,
      toggleCalendars: true,
      loadingClientsTable: false,
      loadingPetsTable: false,
      client_id_field: "",
      clientIdResult: "",
    };
  }

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
            // console.log(res);
            this.setState({
              jobType: res.data.jobType,
            });
          })
          .catch((err) => console.log(err));

        window.scrollTo(0, 1000);
        // this.getAllClients();
        // GraphQl Query Apollo

        this.setState({
          isLoading: false,
          error: false,
          loadingClientsTable: true,
        });
        localStorage.setItem("CITY", "milton");
        client
          .query({
            query: getClientsQuery,
          })
          .then((res) => {
            // console.log(res.data.getAllClients);
            this.setState({
              clients: res.data.getAllClients,
              loadingClientsTable: false,
            });
          });
        // this.getAllPets();
      } catch (error) {
        console.error(error.response);
        this.setState({
          error: true,
        });
      }
    }
  }

  onChangeSearchForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleToggleClientsTable = () => {
    this.setState({
      toggleClientsTable: !this.state.toggleClientsTable,
      togglePetsTable: false,
      toggleCalendars: false,
    });
  };

  handleTogglePetsTable = () => {
    this.getAllPets();
    this.setState({
      togglePetsTable: !this.state.togglePetsTable,
      toggleClientsTable: false,
      toggleCalendars: false,
    });
  };

  handleToggleCalendars = () => {
    this.setState({
      toggleCalendars: !this.state.toggleCalendars,
      toggleClientsTable: false,
      togglePetsTable: false,
    });
  };

  toggleFormToSearchByPhone = () => {
    if (this.state.toggleSearchClientByPhoneForm === false) {
      this.setState({
        firstNameSearchResults: [],
        lastNameSearchResults: [],
        petNameSearchResults: [],
        clientSearchValuePhone: [],
        clientIdNumber: [],
        firstNameSearchInput: "",
        lastNameSearchInput: "",
        petNameSearchInput: "",
        clientSearchInputByPhone: "",
        errorMsgOnSearchFormPhone: "",
        errorMsgOnSearchFormPetName: "",
        errorMsgOnSearchFormFirstName: "",
        errorMsgOnSearchFormLastName: "",
        petsForThisOwner: "",
        petInfoThisOwner: [],
      });
    }
    this.setState({
      toggleSearchClientByPhoneForm: !this.state.toggleSearchClientByPhoneForm,
    });
  };

  toggleModalCambridgeCal = () => {
    this.setState({
      modalCambridgeCal: !this.state.modalCambridgeCal,
    });
  };
  toggleModalToAddClients = () => {
    if (this.state.modalToAddClients === false) {
      this.setState({
        lastName: "",
        firstName: "",
        phone: "",
        cellphone: "",
        workPhone: "",
        email: "",
      });
    }
    this.setState({
      modalToAddClients: !this.state.modalToAddClients,
    });
  };

  //Logout User
  handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("JWT");
    window.location.href = "/auth/login";
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  //Add client form submit
  handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !this.state.lastName ||
      !this.state.firstName ||
      !this.state.primaryPhoneNumber
    ) {
      return this.setState({
        errorMsg: "Please enter the required fields!",
      });
    }
    await API.addClient({
      lastName: this.capitalizeFirstLetter(this.state.lastName).replace(
        /[^A-Z0-9]/gi,
        ""
      ),
      firstName: this.capitalizeFirstLetter(this.state.firstName).replace(
        /[^A-Z0-9]/gi,
        ""
      ),
      primaryPhoneNumber: this.state.primaryPhoneNumber.replace(/[- )(]/g, ""),
      cellphone: this.state.cellphone.replace(/[- )(]/g, ""),
      workPhone: this.state.workPhone.replace(/[- )(]/g, ""),
      email: this.state.email,
    })
      .then((res) => {
        window.location.href = "/auth/api/clients/" + res.data.id;
      })
      .catch((err) => console.log(err));
  };

  handleDeleteClient = (id) => {
    if (
      window.confirm(`Are you sure you wish to delete this client permanently?`)
    ) {
      API.deleteClient(id)
        .then(
          alert(
            "Client with Id number: " + id + " has been successfully deleted!"
          )
        )
        .then((res) => this.getAllClients())
        .catch((err) => console.log(err));
      // window.location.href = "/auth/admin";
      this.props.history.push("/auth/reception");
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  getAllClients = async () => {
    const accessString = localStorage.getItem("JWT");

    await axios
      .get("/api/clients", {
        headers: { jwt: `${accessString}` },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ clients: res.data });
      })
      .catch((err) => console.log(err));
  };

  getAllPets = () => {
    this.setState({
      loadingPetsTable: true,
    });
    client
      .query({
        query: getPetsQuery,
      })
      .then((res) => {
        this.setState({
          pets: res.data.getAllPets,
          loadingPetsTable: false,
        });
      })
      .catch((err) => {
        this.setState({
          loadingPetsTable: false,
        });
        console.log(err);
      });
  };

  getFullClientInfoOnModal = async ({ currentTarget }) => {
    this.toggle();

    const clientId = currentTarget.value;
    let accessString = localStorage.getItem("JWT");

    await axios
      .get("/auth/api/clients/" + clientId, {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then((res) => {
        this.setState({
          fullClientInfoForModal: res.data,
          petsForThisOwner: res.data.Pets,
          idForThisClientOnModal: clientId,
        });
      })
      .catch((error) => console.log(error));
  };

  clearSearchResults = () => {
    this.setState({
      firstNameSearchResults: [],
      lastNameSearchResults: [],
      petNameSearchResults: [],
      clientSearchValuePhone: [],
      clientIdNumber: [],
      firstNameSearchInput: "",
      lastNameSearchInput: "",
      petNameSearchInput: "",
      clientSearchInputByPhone: "",
      errorMsgOnSearchFormPhone: "",
      errorMsgOnSearchFormPetName: "",
      errorMsgOnSearchFormFirstName: "",
      errorMsgOnSearchFormLastName: "",
      onlyNumbersOnSearchForm: "",
    });
  };

  searchById = async (e) => {
    e.preventDefault();

    if (isNaN(this.state.client_id_field)) {
      return alert("Only numbers here please!");
    }

    let result = this.state.clients.filter(
      (word) => word.id === parseInt(this.state.client_id_field)
      // word.id.includes(this.state.client_id_field)
    );
    e.target.reset();
    await this.setState({
      clientIdResult: result,
    });

    // console.log(this.state.clientIdResult[0].lastName);
  };

  render() {
    const { isLoading, error, jobType } = this.state;
    if (error) {
      return (
        <div
          style={{
            marginLeft: "10%",
            marginTop: "120px",
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
            marginTop: "120px",
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
          }}
        >
          Loading Amazing Pet Grooming Data...if it does not respond, try
          logging in again
        </div>
      );
    }

    if (jobType === "receptionist" || jobType === "admin") {
      const searchResultsById = this.state.clientIdResult.length ? (
        this.state.clientIdResult.map((result) => {
          return (
            <tr key={result.id} className="bg-light ">
              <td className=" bg-light text-dark">{result.id}</td>
              <td className=" bg-light text-dark">{result.firstName}</td>
              <td className=" bg-light text-dark">{result.lastName}</td>
              <td className=" bg-light text-dark">
                {result.primaryPhoneNumber}
              </td>
              <td className=" bg-light text-dark">
                {result.Pets.map((pet) => {
                  return (
                    <div key={pet.id}>
                      <p>
                        <span className="petNameResults text-dark">
                          {pet.name}
                        </span>{" "}
                        -- {pet.breed}
                      </p>
                      <hr />
                    </div>
                  );
                })}
              </td>
              <td>
                <Link
                  style={{
                    border: "1px solid white",
                    display: "block",
                  }}
                  className="btn btn-warning"
                  to={"api/clients/" + result.id}
                >
                  More Info...
                </Link>
              </td>
            </tr>
          );
        })
      ) : (
        <tr className="text-center">
          <td className="bg-light">That Id does not exist!</td>
        </tr>
      );

      //clients Rendering
      const clients = this.state.clients;

      const defaultSortedBy = [
        {
          dataField: "id",
          order: "desc", // or desc
        },
      ];

      const defaultSortedByPet = [
        {
          dataField: "ClientId",
          order: "desc", // or desc
        },
      ];

      const columns = [
        {
          dataField: "id",
          text: "ID",
          sort: true,
          order: "asc", // or desc
          headerStyle: (colum, colIndex) => {
            let widthColumn;
            if (window.innerWidth < 451) {
              widthColumn = "40px";
            } else {
              widthColumn = "80px";
            }
            return { width: widthColumn, textAlign: "center" };
          },
        },
        {
          dataField: "lastName",
          text: "Last Name",
          sort: true,
        },
        {
          dataField: "firstName",
          text: "First Name",
          sort: true,
        },
        {
          dataField: "primaryPhoneNumber",
          text: "Primary phone",
          sort: true,
        },
        {
          dataField: "cellphone",
          text: "Cell",
          sort: true,
        },

        {
          dataField: "Pets",
          text: "Pets",
          formatter: (cell) => {
            return cell.map((pet) => {
              return (
                <ul className="pets-in-table" key={pet.id}>
                  <li>{pet.name}</li>
                  <span>{pet.breed}</span>
                </ul>
              );
            });
          },
          sort: true,
        },
        {
          dataField: "actions",
          text: "Actions",
          isDummyField: true,
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <div>
                <Link
                  className="btn btn-info btn-table-clients"
                  to={"/auth/api/clients/" + row.id}
                >
                  More Info
                </Link>
                <button
                  className="btn btn-danger btn-table-clients"
                  onClick={() => {
                    // console.log("props", props)
                    this.handleDeleteClient(row.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          },
        },
      ];

      const pets = this.state.pets;
      const columnsPets = [
        {
          dataField: "ClientId",
          text: "Client ID",
          sort: true,
          order: "asc", // or desc
          style: { width: "50px" },
        },
        {
          dataField: "name",
          text: "Pet Name",
          sort: true,
        },
        {
          dataField: "breed",
          text: "Breed",
          sort: true,
        },
        {
          dataField: "type",
          text: "Type",
          sort: true,
        },

        {
          dataField: "actions",
          text: "Actions",
          isDummyField: true,
          csvExport: false,
          formatter: (cell, row) => {
            return (
              <div>
                <Link
                  className="btn btn-info btn-table-clients"
                  to={"/auth/api/clients/" + row.ClientId}
                >
                  More Info
                </Link>
              </div>
            );
          },
        },
      ];

      return (
        <div className="reception-main-container">
          <h1 className="controlPanelHeading">Main Desk Control Panel</h1>
          <div className="container">
            <div className="row justify-content-center control-panel-container">
              <div className="col-md-12 ">
                <h1 className="controlPanelHeadingMobile">Control Panel</h1>

                <div className="row justify-content-center">
                  {/* Add Clients Btn */}
                  <button
                    onClick={this.toggleModalToAddClients}
                    className="buttonsControlPanel addClientsBtnControlPanel"
                  >
                    {/* <a  href="#addClient"> */}
                    Add Clients <i className="fas fa-user-plus"></i>
                    {/* </a> */}
                  </button>

                  {/* See Pets List Btn */}
                  <button
                    color="info"
                    onClick={this.handleTogglePetsTable}
                    className="buttonsControlPanel seePetsListBtnControlPanel"
                  >
                    Pets Table <i className="fas fa-paw"></i>
                  </button>

                  {/* See Clients List Btn */}
                  <button
                    onClick={this.handleToggleClientsTable}
                    className="buttonsControlPanel seeClientsListBtnControlPanel"
                  >
                    Clients Table <i className="fas fa-users"></i>
                  </button>

                  {/* See calendars */}
                  {!this.state.toggleCalendars ? (
                    <button
                      className="buttonsControlPanel  searchClientsBtnControlPanel"
                      onClick={this.handleToggleCalendars}
                    >
                      Schedule <i className="fas fa-clipboard-list"></i>
                    </button>
                  ) : null}

                  {/* Search client by phone Btn */}
                  <button
                    className="buttonsControlPanel  searchClientsBtnControlPanel"
                    onClick={this.toggleFormToSearchByPhone}
                  >
                    Search Clients <i className="fas fa-search"></i>
                  </button>

                  {/* Photo Gallery */}
                  <Link
                    to="/auth/photo_manager"
                    className="photosBtnControlPanel"
                    onClick={this.toggleFormToSearchByPhone}
                  >
                    Photo Gallery <i className="fas fa-camera-retro"></i>
                  </Link>

                  {/* Cambridge Paola Calendar opens modal */}
                  <button
                    color="dark"
                    className="buttonsControlPanel  cambridge-calendar-paola"
                    onClick={this.toggleModalCambridgeCal}
                  >
                    CAMBRIDGE
                  </button>

                  {/* See Paola's Calendar Btn */}
                  <button
                    className="buttonsControlPanelCalendars paolaCalendarBtn"
                    onClick={this.toggleAddAppointmentFunction}
                  >
                    <a
                      style={{
                        color: "black",
                      }}
                      href="#AdminCalendar"
                    >
                      Paola
                    </a>
                    <i className="fas fa-chevron-circle-down"></i>
                  </button>

                  {/* See Claudia's Calendar Btn */}

                  <button
                    className="buttonsControlPanelCalendars claudiaCalendarBtn"
                    onClick={this.toggleAddAppointmentFunction}
                  >
                    <a
                      style={{
                        color: "black",
                      }}
                      href="#Emp1Calendar"
                    >
                      Claudia
                    </a>
                    <i className="fas fa-chevron-circle-down"></i>
                  </button>

                  {/* See Diana's Calendar Btn */}

                  <button
                    className="buttonsControlPanelCalendars dianaCalendarBtn"
                    onClick={this.toggleAddAppointmentFunction}
                  >
                    <a
                      style={{
                        color: "black",
                      }}
                      href="#Emp2Calendar"
                    >
                      Diana
                    </a>
                    <i className="fas fa-chevron-circle-down"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* MODAL TO ADD CLIENTS */}
            <Modal
              isOpen={this.state.modalToAddClients}
              toggle={this.toggleModalToAddClients}
              modalClassName="modal-add-clients"
            >
              <ModalHeader toggle={this.toggleModalToAddClients}>
                Add Clients <i className="fas fa-user-plus"></i>
              </ModalHeader>
              <ModalBody>
                <div className="container">
                  <div
                    // className="col-md-7"
                    style={{
                      border: "10px double #0A3055",
                      background: "#cce6ff",
                      color: "black",
                      padding: "10px",
                    }}
                  >
                    <form
                      className="form-group"
                      onSubmit={this.handleFormSubmit.bind(this)}
                    >
                      <h4
                        className="grey-text text-darken-3"
                        style={{
                          textAlign: "center",
                          marginTop: "15px",
                        }}
                      >
                        Add a New Client <i className="fas fa-user-plus"></i>
                      </h4>
                      <p>* Fields required</p>
                      <hr
                        style={{
                          background: "grey",
                          marginTop: "10px",
                        }}
                      ></hr>
                      <div className="input-field">
                        <label htmlFor="lastName">* Last Name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="firstName">* First Name</label>
                        <input
                          className="form-control"
                          type="text"
                          id="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="phone">
                          * Primary Phone <i className="fas fa-phone"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          id="primaryPhoneNumber"
                          value={this.state.primaryPhoneNumber}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="cellphone">Cell</label>
                        <input
                          className="form-control"
                          type="text"
                          id="cellphone"
                          value={this.state.cellphone}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="workPhone">Emergency</label>
                        <input
                          className="form-control"
                          type="text"
                          id="workPhone"
                          value={this.state.workPhone}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          id="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="input-field">
                        <Button
                          color="warning"
                          block
                          style={{
                            marginTop: "30px",
                          }}
                          className="btn-primary lighten-1 z-depth-0"
                          // onClick={this.handleFormSubmit}
                        >
                          Add Client
                        </Button>
                      </div>
                      <p
                        style={{
                          textAlign: "center",
                          color: "red",
                          marginTop: "15px",
                        }}
                      >
                        {this.state.errorMsg}
                      </p>
                    </form>
                  </div>
                </div>
              </ModalBody>
            </Modal>
            {/* <div id="addClient"></div> */}
          </div>

          {/* Forms to search clients by name, last name, first name, and pet name */}
          {this.state.toggleSearchClientByPhoneForm ? (
            <SearchClients clients={this.state.clients} />
          ) : null}
          {this.state.toggleClientsTable ? (
            <div className="clients-list-table">
              <h1 className="clientsList-mainTitle" id="clientsList">
                Clients List <i className="fas fa-user"></i>
              </h1>
              <Form onSubmit={this.searchById} className="text-center">
                <label
                  className="h4 text-light ml-2 mr-2 searchByClientLabel"
                  htmlFor=""
                >
                  Search by Client Id
                </label>
                <input
                  className="searchById-input"
                  onChange={this.onChangeSearchForm}
                  // value={this.state.client_id_field}
                  name="client_id_field"
                  type="text"
                />
                <Button color="info" className="ml-2 mb-2">
                  Search
                </Button>
              </Form>
              {this.state.clientIdResult === "" ? null : (
                <Table className="tableSearchResults">
                  <thead>
                    <tr>
                      <th className="theadingsById">Client #</th>
                      <th className="theadingsById">First Name</th>
                      <th className="theadingsById">Last Name</th>
                      <th className="theadingsById">Primary Phone</th>
                      <th className="theadingsById">Pets</th>
                      <th className="theadingsById">Action</th>
                    </tr>
                  </thead>
                  <tbody>{searchResultsById}</tbody>
                </Table>
              )}
              <div className="react-table-component">
                {this.state.loadingClientsTable ? (
                  <div>
                    <h3>
                      Loading Clients...{" "}
                      <i className="fa fa-refresh fa-spin "></i>
                    </h3>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <BootstrapTable
                      className="react-table-component"
                      keyField="id"
                      data={clients}
                      columns={columns}
                      pagination={paginationFactory()}
                      defaultSorted={defaultSortedBy}
                      striped
                      wrapperClasses="table-responsive"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {this.state.togglePetsTable ? (
            <div className="clients-list-table">
              <h1 id="petsList">
                Pets List <i className="fas fa-paw"></i>
              </h1>
              <div className="react-table-component">
                {this.state.loadingPetsTable ? (
                  <div>
                    <h3>
                      Loading Clients...{" "}
                      <i className="fa fa-refresh fa-spin "></i>
                    </h3>
                  </div>
                ) : (
                  <BootstrapTable
                    className="react-table-component"
                    keyField="id"
                    data={pets}
                    columns={columnsPets}
                    pagination={paginationFactory()}
                    defaultSorted={defaultSortedByPet}
                    striped
                    wrapperClasses="table-responsive"
                  />
                )}
              </div>
            </div>
          ) : null}

          {this.state.toggleCalendars ? (
            <div className="row calendars-group">
              <div
                id="AdminCalendar"
                className="col-xl-4 col-md-4 col-xs-12 cal-all"
              >
                <CalendarAdmin />
              </div>
              <div
                id="Emp1Calendar"
                className="col-xl-4 col-md-4 col-xs-12 cal-all"
              >
                <CalendarEmp1 />
              </div>
              <div
                id="Emp2Calendar"
                className="col-xl-4 col-md-4 col-xs-12 cal-all"
              >
                <CalendarEmp2 />
              </div>
            </div>
          ) : null}

          <Modal
            size="xl"
            isOpen={this.state.modalCambridgeCal}
            toggle={this.toggleModalCambridgeCal}
            modalClassName="modal-cambridge-calendar"
          >
            <ModalHeader toggle={this.toggleModalCambridgeCal}>
              Paula CAMBRIDGE
            </ModalHeader>
            <ModalBody>
              <div
                id="CambridgPaolaCalendar"
                className="col-xl-12 col-md-12 col-xs-12 cal-all"
              >
                <CalendarCambridgePaola
                  isModalOpen={this.state.modalCambridgeCal}
                />
              </div>
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
