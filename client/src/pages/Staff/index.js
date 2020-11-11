import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeSignupForm from "../../components/EmployeesForms/EmployeeSignup";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SearchClients from "../../components/SearchClients";
import API from "../../utils/APICAMBRIDGE";
import {
  Button,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Col,
} from "reactstrap";
import LoadPage from "../../components/LoadingPage";
import WelcomeMsg from "../../components/WelcomeMsg";
import "./style.scss";

let jobTypeOptions = [
  {
    value: "receptionist",
    label: "Receptionist",
  },
  {
    value: "customer",
    label: "Customer",
  },
  {
    value: "groomer1",
    label: "Claudia",
  },
  {
    value: "groomer2",
    label: "Diana",
  },
  {
    value: "groomer3",
    label: "Groomer 3",
  },
  {
    value: "groomer4",
    label: "Groomer 4",
  },
  {
    value: "groomer5",
    label: "Groomer 5",
  },
  {
    value: "groomer6",
    label: "Groomer 6",
  },
];

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles) => {
    return {
      ...styles,
      backgroundColor: "black",
    };
  },
};

class AdminComp extends Component {
  _isMounted = false;

  state = {
    employeeId: "",
    employees: [],
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    jobType: "",
    modalToEdit: false,
    toggleEmployeeForm: false,
    toggleCommissionAdmin: false,
    isLoading: true,
    error: false,
    rightRole: false,
    loadingAxiosRequest: false,
    commissionClaudiaInput: "",
    commissionDianaInput: "",
    commissionPaolaInput: "",
    commissionGroomer1Input: "",
    showWelcomeMsg: true,

    //clients
    clients: [],
    pets: [],

    // claudia
    dateResultClaudia: [],
    dateResultClaudiaCost: [],
    dateResultClaudiaTip: [],
    dateResultClaudiaDates: [],
    totalDailyClaudia: "",

    // diana
    dateResultDiana: [],
    dateResultDianaCost: [],
    dateResultDianaTip: [],
    dateResultDianaDates: [],
    totalDailyDiana: "",

    // Paola
    dateResultPaola: [],
    dateResultPaolaCost: [],
    dateResultPaolaTip: [],
    dateResultPaolaDates: [],
    totalDailyPaola: "",

    // Groomer 1
    dateResultGroomer1: [],
    dateResultGroomer1Cost: [],
    dateResultGroomer1Tip: [],
    dateResultGroomer1Dates: [],
    totalDailyGroomer1: "",
  };

  async componentDidMount() {
    localStorage.setItem("CITY", "cambridge");

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
        const response = await axios.get("/auth/admin", {
          headers: { Authorization: `JWT ${accessString}` },
        });
        if (response.data.jobType === "admin") {
          this.setState({
            isLoading: false,
            error: false,
            rightRole: true,
          });
          this.getAllEmployees();
        }
      } catch (error) {
        console.error(error.response);
        this.setState({
          error: true,
        });
      }
    }
  }

  onSelectedChanged = (value) => {
    this.setState({
      jobType: value,
    });
  };

  modalToggler = () => {
    this.setState({
      modalToEdit: !this.state.modalToEdit,
    });
  };

  //Logout User
  handleLogOut(e) {
    e.preventDefault();
    localStorage.removeItem("JWT");
    window.location.href = "/auth/login";
  }

  //Employee Functions /////////////////////////////

  toggleEmployeeFormFunction = () => {
    this.setState({
      toggleEmployeeForm: !this.state.toggleEmployeeForm,
      showWelcomeMsg: false,
      toggleCommissionAdmin: false,
      showClientsTable: false,
    });
  };

  toggleCommissionsHandler = () => {
    this.setState({
      toggleCommissionAdmin: !this.state.toggleCommissionAdmin,
      showWelcomeMsg: false,
      toggleEmployeeForm: false,
      showClientsTable: false,
    });
  };

  handleDeleteEmployee = async (id) => {
    const accessString = localStorage.getItem("JWT");
    this.setState({
      loadingAxiosRequest: true,
    });
    await axios
      .delete("/auth/employees/" + id, {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then(
        this.setState({
          loadingAxiosRequest: false,
        })
      )
      .then(() => this.getAllEmployees())
      .catch((err) => {
        this.setState({
          loadingAxiosRequest: false,
        });
        console.log(err);
      });
  };

  getAllEmployees = () => {
    const accessString = localStorage.getItem("JWT");

    axios
      .get("/auth/employees", {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then((res) => {
        let onlyEmployees = res.data.filter((user) => {
          return (
            user.jobType === "groomer1" ||
            user.jobType === "groomer2" ||
            user.jobType === "groomer3" ||
            user.jobType === "groomer4" ||
            user.jobType === "groomer5" ||
            user.jobType === "groomer6" ||
            user.jobType === "customer" ||
            user.jobType === "receptionist"
          );
        });
        this.setState({ employees: onlyEmployees });
      })
      .catch((err) => console.log(err));
  };

  //Employee Functions End /////////////////////////////

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleChangeCommission = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getEmployeeInfo = async ({ currentTarget }) => {
    const accessString = localStorage.getItem("JWT");
    const id = currentTarget.value;
    this.modalToggler();
    await axios
      .get("/auth/employees/" + id, {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then((res) => {
        this.setState({
          employeeId: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          username: res.data.username,
          email: res.data.email,
          jobType: res.data.jobType,
        });
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  updateUser = async (e) => {
    e.preventDefault();
    this.setState({
      loadingAxiosRequest: true,
    });

    let updatedEmployee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      jobType: this.state.jobType.value,
    };

    await axios
      .put("/auth/employees/" + this.state.employeeId, updatedEmployee)
      .then(() => {
        this.setState({
          modalToEdit: false,
          loadingAxiosRequest: false,
        });
        this.getAllEmployees();
      })
      .catch((err) => {
        this.setState({
          loadingAxiosRequest: false,
        });
        console.log(err);
      });
  };

  // CLAUDIA COMMISSIONS
  submitClaudiaCommission = async (e) => {
    e.preventDefault();
    const newDateValue = moment
      .utc(this.state.commissionClaudiaInput)
      .format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/claudia/" + newDateValue)
      .then((res) => {
        if (res.data.length === 0) {
          return alert("This date does not exist!");
        }
        let totalDailyResultCost = res.data.map((item) => {
          return item.cost;
        });
        let totalDailyResultTip = res.data.map((item) => {
          return item.tip;
        });
        let totalDailyResultDates = res.data.map((item) => {
          return item.date;
        });
        totalDailyResultDates = totalDailyResultDates[0];

        this.setState({
          dateResultClaudia: this.state.dateResultClaudia.concat(res.data),
          dateResultClaudiaDates: this.state.dateResultClaudiaDates.concat(
            totalDailyResultDates
          ),
          dateResultClaudiaCost: this.state.dateResultClaudiaCost.concat(
            totalDailyResultCost
          ),
          dateResultClaudiaTip: this.state.dateResultClaudiaTip.concat(
            totalDailyResultTip
          ),
          commissionClaudiaInput: "",
        });
      })
      .catch((err) => console.log(err));
  };

  onChangeDatePickerClaudia = (date) => {
    this.setState({
      commissionClaudiaInput: date,
    });
  };

  // DIANA COMMISSIONS
  submitDianaCommission = async (e) => {
    e.preventDefault();
    const newDateValue = moment
      .utc(this.state.commissionDianaInput)
      .format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/diana/" + newDateValue)
      .then((res) => {
        if (res.data.length === 0) {
          return alert("This date does not exist!");
        }
        let totalDailyResultCost = res.data.map((item) => {
          return item.cost;
        });
        let totalDailyResultTip = res.data.map((item) => {
          return item.tip;
        });
        let totalDailyResultDates = res.data.map((item) => {
          return item.date;
        });
        totalDailyResultDates = totalDailyResultDates[0];

        this.setState({
          dateResultDiana: this.state.dateResultDiana.concat(res.data),
          dateResultDianaDates: this.state.dateResultDianaDates.concat(
            totalDailyResultDates
          ),
          dateResultDianaCost: this.state.dateResultDianaCost.concat(
            totalDailyResultCost
          ),
          dateResultDianaTip: this.state.dateResultDianaTip.concat(
            totalDailyResultTip
          ),
          commissionDianaInput: "",
        });
      })
      .catch((err) => console.log(err));
  };

  onChangeDatePickerDiana = (date) => {
    this.setState({
      commissionDianaInput: date,
    });
  };

  // PAOLA COMMISSIONS
  submitPaolaCommission = async (e) => {
    e.preventDefault();
    const newDateValue = moment
      .utc(this.state.commissionPaolaInput)
      .format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/paola/" + newDateValue)
      .then((res) => {
        if (res.data.length === 0) {
          return alert("This date does not exist!");
        }
        let totalDailyResultCost = res.data.map((item) => {
          return item.cost;
        });
        let totalDailyResultTip = res.data.map((item) => {
          return item.tip;
        });
        let totalDailyResultDates = res.data.map((item) => {
          return item.date;
        });
        totalDailyResultDates = totalDailyResultDates[0];

        this.setState({
          dateResultPaola: this.state.dateResultPaola.concat(res.data),
          dateResultPaolaDates: this.state.dateResultPaolaDates.concat(
            totalDailyResultDates
          ),
          dateResultPaolaCost: this.state.dateResultPaolaCost.concat(
            totalDailyResultCost
          ),
          dateResultPaolaTip: this.state.dateResultPaolaTip.concat(
            totalDailyResultTip
          ),
          commissionPaolaInput: "",
        });
      })
      .catch((err) => console.log(err));
  };

  onChangeDatePickerPaola = (date) => {
    this.setState({
      commissionPaolaInput: date,
    });
  };

  // GROOMER 1 COMMISSIONS
  submitGroomer1Commission = async (e) => {
    e.preventDefault();
    const newDateValue = moment
      .utc(this.state.commissionGroomer1Input)
      .format("YYYY-MM-DD");
    await axios
      .get("/auth/commission/groomer1/" + newDateValue)
      .then((res) => {
        if (res.data.length === 0) {
          return alert("This date does not exist!");
        }
        let totalDailyResultCost = res.data.map((item) => {
          return item.cost;
        });
        let totalDailyResultTip = res.data.map((item) => {
          return item.tip;
        });
        let totalDailyResultDates = res.data.map((item) => {
          return item.date;
        });
        totalDailyResultDates = totalDailyResultDates[0];

        this.setState({
          dateResultGroomer1: this.state.dateResultGroomer1.concat(res.data),
          dateResultGroomer1Dates: this.state.dateResultGroomer1Dates.concat(
            totalDailyResultDates
          ),
          dateResultGroomer1Cost: this.state.dateResultGroomer1Cost.concat(
            totalDailyResultCost
          ),
          dateResultGroomer1Tip: this.state.dateResultGroomer1Tip.concat(
            totalDailyResultTip
          ),
          commissionGroomer1Input: "",
        });
      })
      .catch((err) => console.log(err));
  };

  onChangeDatePickerGroomer1 = (date) => {
    this.setState({
      commissionGroomer1Input: date,
    });
  };

  getAllClients = async () => {
    let accessString = localStorage.getItem("JWT");

    await axios
      .get("/api/clients_cambridge", {
        headers: { jwt: `${accessString}` },
      })
      .then((res) =>
        this.setState({
          clients: res.data,
        })
      )
      .catch((err) => console.log(err));
  };

  showClientsTableHandler = async () => {
    this.getAllClients();
    this.setState({
      showClientsTable: !this.state.showClientsTable,
      toggleEmployeeForm: false,
      toggleCommissionAdmin: false,
      showWelcomeMsg: false,
    });
  };

  handleDeleteClient = (id) => {
    if (
      window.confirm(`Are you sure you wish to delete this client permanently?`)
    ) {
      API.deleteClient(id)
        .then(() => this.getAllClients())
        .catch((err) => console.log(err));
      // window.location.href = "/auth/admin";
    }
  };

  render() {
    const { isLoading, error, rightRole } = this.state;
    if (error) {
      return (
        <div
          style={{
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
            marginTop: "100px",
          }}
        >
          ...Problem fetching user data. Please refresh page or login again...
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
            marginTop: "100px",
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
          }}
        >
          Loading User Data...
        </div>
      );
    }
    if (!rightRole) {
      return (
        <div
          style={{
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
            marginTop: "100px",
          }}
        >
          Access denied to this account
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </div>
      );
    }

    const defaultSortedBy = [
      {
        dataField: "id",
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
        dataField: "PetCambridges",
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
                to={"/auth/api/clients_cambridge/" + row.id}
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

    const employees = this.state.employees;
    const employeesList = employees.length ? (
      employees.map((employee) => {
        return (
          <tr key={employee.id}>
            <td>{employee.jobType}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.email}</td>
            <td>
              {this.state.loadingAxiosRequest ? (
                <LoadPage />
              ) : (
                <button
                  style={{
                    background: "red",
                    color: "white",
                    width: "70px",
                  }}
                  className="btn btn-warning"
                  onClick={(e) => {
                    if (
                      window.confirm(
                        `Are you sure you wish to delete ${employee.firstName} ${employee.lastName} permanently?`
                      )
                    )
                      this.handleDeleteEmployee(employee.id);
                  }}
                >
                  Delete
                </button>
              )}
              {this.state.loadingAxiosRequest ? (
                <LoadPage />
              ) : (
                <button
                  onClick={this.getEmployeeInfo}
                  value={employee.id}
                  style={{
                    background: "green",
                    color: "white",
                    width: "70px",
                  }}
                  className="btn btn-info"
                >
                  Edit
                </button>
              )}
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td>No Employees in database</td>
      </tr>
    );

    const dateResultClaudia = this.state.dateResultClaudia;
    const dateResultClaudiaList =
      dateResultClaudia.length > 0 ? (
        dateResultClaudia.map((result) => {
          return (
            <p
              className="result-claudia-container text-align-center"
              key={uuidv4()}
            >
              {result.nameBreed}
            </p>
          );
        })
      ) : (
        <div className="text-align-center">
          <h5>
            Nothing yet <i className="far fa-surprise"></i>
          </h5>
        </div>
      );

    const dateResultDiana = this.state.dateResultDiana;
    const dateResultDianaList =
      dateResultDiana.length > 0 ? (
        dateResultDiana.map((result) => {
          return (
            <p
              className="result-claudia-container text-align-center"
              key={uuidv4()}
            >
              {result.nameBreed}
            </p>
          );
        })
      ) : (
        <div className="text-align-center">
          <h5>
            Nothing yet <i className="far fa-surprise"></i>
          </h5>
        </div>
      );

    const dateResultPaola = this.state.dateResultPaola;
    const dateResultPaolaList =
      dateResultPaola.length > 0 ? (
        dateResultPaola.map((result) => {
          return (
            <p
              className="result-claudia-container text-align-center"
              key={uuidv4()}
            >
              {result.nameBreed}
            </p>
          );
        })
      ) : (
        <div className="text-align-center">
          <h5>
            Nothing yet <i className="far fa-surprise"></i>
          </h5>
        </div>
      );

    const dateResultGroomer1 = this.state.dateResultGroomer1;
    const dateResultGroomer1List =
      dateResultGroomer1.length > 0 ? (
        dateResultGroomer1.map((result) => {
          return (
            <p
              className="result-claudia-container text-align-center"
              key={uuidv4()}
            >
              {result.nameBreed}
            </p>
          );
        })
      ) : (
        <div className="text-align-center">
          <h5>
            Nothing yet <i className="far fa-surprise"></i>
          </h5>
        </div>
      );

    return (
      <div className=" adminPageContainer">
        <main style={{ marginTop: "40px" }}>{/* <br></br> */}</main>
        <div className="row">
          <div className="col-lg-12 text-align-center">
            <hr className="hr-white" />
            <h1 className="welcomeAdminMessage">
              <b>Welcome to the Admin Panel {this.state.username}</b>
            </h1>
            <div className="control-panel-admin-btn-wrapper">
              <button
                className=" buttons-control-panel-admin buttons-control-panel-admin__employees"
                onClick={this.toggleEmployeeFormFunction}
              >
                <i className="fas fa-chevron-circle-up"></i> Manage Employees{" "}
                <i className="fas fa-chevron-circle-down"></i>
              </button>
              <button
                onClick={this.toggleCommissionsHandler}
                className="buttons-control-panel-admin buttons-control-panel-admin__commissionAdmin"
              >
                Commission ADMIN <i className="fas fa-dollar-sign"></i>
              </button>
              <button
                onClick={this.showClientsTableHandler}
                className="buttons-control-panel-admin buttons-control-panel-admin__cambridgeClients"
              >
                Cambridge Clients <i className="fas fa-users"></i>
              </button>
            </div>
            <Link className="" to="/auth/customer">
              <button className=" buttons-control-panel-admin buttons-control-panel-admin__clientRegistration">
                Clients Registration <i className="fas fa-users"></i>
              </button>
            </Link>
            <Link className="" to="/auth/commission">
              <button className=" buttons-control-panel-admin buttons-control-panel-admin__commissionReceptionist">
                Commission Receptionist <i className="fas fa-dollar-sign"></i>
              </button>
            </Link>

            <Link className="" to="/auth/customer_cambridge">
              <button className="buttons-control-panel-admin text-light  btn-success">
                Clients Registration CAMBRIDGE<i className="fas fa-users"></i>
              </button>
            </Link>

            <Link to="/auth/reception" className="">
              <button className="buttons-control-panel-admin buttons-control-panel-admin__receptionist">
                Control Panel Receptionist <i className="fas fa-cog"></i>
              </button>
            </Link>

            {this.state.showWelcomeMsg ? <WelcomeMsg /> : null}

            {this.state.showClientsTable ? (
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
                    <SearchClients />
                    <BootstrapTable
                      className="react-table-component"
                      keyField="id"
                      data={this.state.clients}
                      columns={columns}
                      pagination={paginationFactory()}
                      defaultSorted={defaultSortedBy}
                      striped
                      wrapperClasses="table-responsive"
                    />
                  </div>
                )}
              </div>
            ) : null}

            {this.state.toggleEmployeeForm ? (
              <div className="admin-panel-sec-container">
                <div className="row">
                  <div className="col-md-3">
                    <EmployeeSignupForm />
                  </div>
                  <div className="col-md-9">
                    <h1 style={{ textAlign: "center", color: "navy" }}>
                      Staff List
                    </h1>
                    <Table responsive dark>
                      <thead>
                        <tr>
                          <th className="tableHeadingsPetsTable">POSITION</th>
                          <th className="tableHeadingsPetsTable">FIRST NAME</th>
                          <th className="tableHeadingsPetsTable">LAST NAME</th>
                          <th className="tableHeadingsPetsTable">EMAIL</th>
                          <th className="tableHeadingsPetsTable">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>{employeesList}</tbody>
                    </Table>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {this.state.toggleCommissionAdmin ? (
          <div className="commissions-container">
            <h1 className="text-align-center margin-top-small">Commissions</h1>
            <div className="row">
              <div className="col-lg-3 ">
                <div className="container left-commissions">
                  <Form onSubmit={this.submitClaudiaCommission}>
                    <Label className="text-align-center" lg={12}>
                      <b>CLAUDIA</b>
                    </Label>
                    <FormGroup row>
                      <Label lg={2}>Date</Label>
                      <Col lg={10}>
                        <DatePicker
                          selected={this.state.commissionClaudiaInput}
                          onChange={this.onChangeDatePickerClaudia}
                          dateFormat="yyyy-MM-dd"
                        />
                      </Col>
                    </FormGroup>
                    <Button block color="info">
                      Claudia Submit
                    </Button>
                  </Form>
                </div>
                <div className="container left-commissions">
                  <Form onSubmit={this.submitDianaCommission}>
                    <Label className="text-align-center" lg={12}>
                      <b>DIANA</b>
                    </Label>
                    <FormGroup row>
                      <Label lg={2}>Date</Label>
                      <Col lg={10}>
                        <DatePicker
                          selected={this.state.commissionDianaInput}
                          onChange={this.onChangeDatePickerDiana}
                          dateFormat="yyyy-MM-dd"
                        />
                      </Col>
                    </FormGroup>
                    <Button block color="success">
                      Diana Submit
                    </Button>
                  </Form>
                </div>
                <div className="container left-commissions">
                  <Form onSubmit={this.submitPaolaCommission}>
                    <Label className="text-align-center" lg={12}>
                      <b>PAOLA</b>
                    </Label>
                    <FormGroup row>
                      <Label lg={2}>Date</Label>
                      <Col lg={10}>
                        <DatePicker
                          selected={this.state.commissionPaolaInput}
                          onChange={this.onChangeDatePickerPaola}
                          dateFormat="yyyy-MM-dd"
                        />
                      </Col>
                    </FormGroup>
                    <Button block color="info">
                      Paola Submit
                    </Button>
                  </Form>
                </div>
                <div className="container left-commissions">
                  <Form onSubmit={this.submitGroomer1Commission}>
                    <Label className="text-align-center" lg={12}>
                      <b>GROOMER 1</b>
                    </Label>
                    <FormGroup row>
                      <Label lg={2}>Date</Label>
                      <Col lg={10}>
                        <DatePicker
                          selected={this.state.commissionGroomer1Input}
                          onChange={this.onChangeDatePickerGroomer1}
                          dateFormat="yyyy-MM-dd"
                        />
                      </Col>
                    </FormGroup>
                    <Button block color="success">
                      Groomer 1 Submit
                    </Button>
                  </Form>
                </div>
              </div>
              <div className="col-lg-9 right-calculations">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <h2 className="text-align-center">Calculation Results</h2>
                      <hr />
                    </div>
                    <div className="row"></div>
                    <div className="col-lg-4">
                      <div className="card">
                        <h5 className="text-align-center margin-top-small">
                          CLAUDIA's PETS
                        </h5>
                        <hr />
                        <div className="pets-list-claudia-container">
                          {dateResultClaudiaList}
                        </div>
                      </div>
                      <div className="card margin-top-small">
                        <h5 className="text-align-center margin-top-small">
                          DIANA's PETS
                        </h5>
                        <hr />
                        <div className="pets-list-claudia-container">
                          {dateResultDianaList}
                        </div>
                      </div>
                      <div className="card margin-top-small">
                        <h5 className="text-align-center margin-top-small">
                          PAOLA's PETS
                        </h5>
                        <hr />
                        <div className="pets-list-claudia-container">
                          {dateResultPaolaList}
                        </div>
                      </div>
                      <div className="card margin-top-small">
                        <h5 className="text-align-center margin-top-small">
                          GROOMER 1's PETS
                        </h5>
                        <hr />
                        <div className="pets-list-claudia-container">
                          {dateResultGroomer1List}
                        </div>
                      </div>
                    </div>
                    <hr />

                    {/* Commissions rendering Start */}
                    <div className="col-lg-8">
                      {this.state.dateResultClaudiaCost.length > 0 ? (
                        <div className="row">
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              CLAUDIA
                            </h5>
                            <hr />
                            <h6>
                              {this.state.dateResultClaudiaDates.map(
                                (date, index) => {
                                  return <div key={index}>{date}</div>;
                                }
                              )}
                            </h6>
                            <h6>
                              Total Sales: $
                              {this.state.dateResultClaudiaCost.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Total Tips: $
                              {this.state.dateResultClaudiaTip.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Number of pets groomed ={" "}
                              {this.state.dateResultClaudia.length}{" "}
                              <i className="fas fa-paw"></i>
                            </h6>
                          </div>
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              CLAUDIA
                            </h5>
                            <hr />
                            <h5>
                              Total Commissions = $
                              {this.state.dateResultClaudiaCost.reduce(
                                (a, b) => a + b
                              ) / 2}
                            </h5>
                            <h5>
                              Final Tips (-30%) = $
                              {0.7 *
                                this.state.dateResultClaudiaTip.reduce(
                                  (a, b) => a + b
                                )}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        <h4 className="text-align-center margin-top-small">
                          No calculations for Claudia yet{" "}
                          <i className="far fa-smile-beam"></i>
                          <hr />
                        </h4>
                      )}

                      {/* Diana Rendering commission */}
                      {this.state.dateResultDianaCost.length > 0 ? (
                        <div className="row">
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              DIANA
                            </h5>
                            <hr />
                            <h6>
                              {this.state.dateResultDianaDates.map(
                                (date, index) => {
                                  return <div key={index}>{date}</div>;
                                }
                              )}
                            </h6>
                            <h6>
                              Total Sales: $
                              {this.state.dateResultDianaCost.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Total Tips: $
                              {this.state.dateResultDianaTip.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Number of pets groomed ={" "}
                              {this.state.dateResultDiana.length}{" "}
                              <i className="fas fa-paw"></i>
                            </h6>
                          </div>
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              DIANA
                            </h5>
                            <hr />
                            <h5>
                              Total Commissions = $
                              {this.state.dateResultDianaCost.reduce(
                                (a, b) => a + b
                              ) / 2}
                            </h5>
                            <h5>
                              Final Tips (-30%) = $
                              {0.7 *
                                this.state.dateResultDianaTip.reduce(
                                  (a, b) => a + b
                                )}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        <h4 className="text-align-center margin-top-small">
                          No calculations for Diana yet{" "}
                          <i className="far fa-smile-beam"></i>
                          <hr />
                        </h4>
                      )}

                      {/* Paola Rendering commission */}
                      {this.state.dateResultPaolaCost.length > 0 ? (
                        <div className="row">
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              PAOLA
                            </h5>
                            <hr />
                            <h6>
                              {this.state.dateResultPaolaDates.map(
                                (date, index) => {
                                  return <div key={index}>{date}</div>;
                                }
                              )}
                            </h6>
                            <h6>
                              Total Sales: $
                              {this.state.dateResultPaolaCost.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Total Tips: $
                              {this.state.dateResultPaolaTip.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Number of pets groomed ={" "}
                              {this.state.dateResultPaola.length}{" "}
                              <i className="fas fa-paw"></i>
                            </h6>
                          </div>
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              PAOLA
                            </h5>
                            <hr />
                            <h5>
                              Total Commissions = $
                              {this.state.dateResultPaolaCost.reduce(
                                (a, b) => a + b
                              ) / 2}
                            </h5>
                            <h5>
                              Final Tips (-30%) = $
                              {0.7 *
                                this.state.dateResultPaolaTip.reduce(
                                  (a, b) => a + b
                                )}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        <h4 className="text-align-center margin-top-small">
                          No calculations for Paola yet{" "}
                          <i className="far fa-smile-beam"></i>
                          <hr />
                        </h4>
                      )}

                      {/* Groomer 1 Rendering commission */}
                      {this.state.dateResultGroomer1Cost.length > 0 ? (
                        <div className="row">
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              GROOMER 1
                            </h5>
                            <hr />
                            <h6>
                              {this.state.dateResultGroomer1Dates.map(
                                (date, index) => {
                                  return <div key={index}>{date}</div>;
                                }
                              )}
                            </h6>
                            <h6>
                              Total Sales: $
                              {this.state.dateResultGroomer1Cost.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Total Tips: $
                              {this.state.dateResultGroomer1Tip.reduce(
                                (a, b) => a + b
                              )}
                            </h6>
                            <h6>
                              Number of pets groomed ={" "}
                              {this.state.dateResultGroomer1.length}{" "}
                              <i className="fas fa-paw"></i>
                            </h6>
                          </div>
                          <div className="col-lg-6 card margin-top-small">
                            <h5 className="text-align-center margin-top-small">
                              Groomer 1
                            </h5>
                            <hr />
                            <h5>
                              Total Commissions = $
                              {this.state.dateResultGroomer1Cost.reduce(
                                (a, b) => a + b
                              ) / 2}
                            </h5>
                            <h5>
                              Final Tips (-30%) = $
                              {0.7 *
                                this.state.dateResultGroomer1Tip.reduce(
                                  (a, b) => a + b
                                )}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        <h4 className="text-align-center margin-top-small">
                          No calculations for Groomer 1 yet{" "}
                          <i className="far fa-smile-beam"></i>
                          <hr />
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <Modal isOpen={this.state.modalToEdit} toggle={this.modalToggler}>
          <ModalHeader toggle={this.modalToggler}>Edit Employee</ModalHeader>
          <ModalBody>
            <div
              className="col-md-12"
              style={{
                border: "1px solid white",
                background: "#161515",
                color: "white",
                marginBottom: "30px",
              }}
            >
              <form
                className="white"
                onSubmit={this.updateUser}
                style={{ marginBottom: "50px" }}
              >
                <hr style={{ background: "white" }}></hr>
                <div className="input-field">
                  <label htmlFor="jobType">* Job Type</label>
                  <Select
                    value={this.state.jobType}
                    options={jobTypeOptions}
                    placeholder={this.state.jobType}
                    isSearchable={false}
                    onChange={this.onSelectedChanged}
                    styles={colourStyles}
                  />
                </div>
                <div className="input-field">
                  <label>* Username</label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    value={this.state.username}
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
                  <label htmlFor="email">* Email</label>
                  <input
                    className="form-control"
                    style={{ float: "right" }}
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <button className="update-employee-btn">
                    Update employee
                  </button>
                </div>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default AdminComp;
