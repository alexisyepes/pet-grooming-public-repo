import React, { Component } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { getPetsQuery } from "../../queries/queries";
import ApolloClient from "apollo-boost";
import axios from "axios";

const client = new ApolloClient({
  uri: "/graphql",
});

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      clientSearchInputByPhone: "",
      clientSearchValuePhone: [],
      modal: false,
      modalToShowResultsByPhone: false,
      modalToShowResultsByLastName: false,
      modalToShowResultsByFirstName: false,
      modalToShowResultsByPetName: false,

      petsForThisOwner: [],
      idForThisClientOnModal: "",

      searchAnyWordInput: "",

      petNameSearchInput: "",
      petNameSearchResults: [],
      lastNameSearchInput: "",
      lastNameSearchResults: [],
      firstNameSearchInput: "",
      firstNameSearchResults: [],
      fullClientInfoForModal: [],
      errorMsgOnSearchFormPhone: "",
      errorMsgOnSearchFormPetName: "",
      errorMsgOnSearchFormFirstName: "",
      errorMsgOnSearchFormLastName: "",
      errorMsg: "",
      onlyNumbersOnSearchForm: "",

      city: "",

      searchResults: [],
      searchPetResults: [],
      petsMilton: [],
      petsCambridge: [],
      clientsCambridge: [],
    };
  }

  componentDidMount() {
    console.log(this.props.clients);
    const city = localStorage.getItem("CITY");
    this.setState({
      city,
    });
  }

  onChangeSearchForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  toggleModalResults = () => {
    this.setState({
      modalToShowResultsByPhone: !this.state.modalToShowResultsByPhone,
    });
  };
  toggleModalResultsByPetName = () => {
    this.setState({
      modalToShowResultsByPetName: !this.state.modalToShowResultsByPetName,
    });
  };
  toggleModalResultsByLastName = () => {
    this.setState({
      modalToShowResultsByLastName: !this.state.modalToShowResultsByLastName,
    });
  };
  toggleModalResultsByFirstName = () => {
    this.setState({
      modalToShowResultsByFirstName: !this.state.modalToShowResultsByFirstName,
    });
  };

  getAllPets = async () => {
    this.setState({
      loadingPetsTable: true,
    });
    await client
      .query({
        query: getPetsQuery,
      })
      .then((res) => {
        this.setState({
          petsMilton: res.data.getAllPets,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getAllPetsCambridge = async () => {
    const accessString = localStorage.getItem("JWT");

    await axios
      .get("/api/pets_cambridge", {
        headers: {
          JWT: `${accessString}`,
        },
      })
      .then((res) =>
        this.setState({
          petsCambridge: res.data,
        })
      )
      .catch((err) => console.log(err));
  };

  searchClient = async (e) => {
    e.preventDefault();
    const accessString = localStorage.getItem("JWT");

    let anyWord = this.state.searchAnyWordInput;

    if (!anyWord) {
      this.setState({
        searchAnyWordInput: "",
        modalToShowResultsByLastName: false,
      });
      return;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    if (this.state.city === "milton") {
      await this.getAllPets();
      let result = this.props.clients.filter(
        (word) =>
          word.id === parseInt(anyWord) ||
          word.primaryPhoneNumber.includes(anyWord) ||
          word.cellphone.includes(anyWord) ||
          word.workPhone.includes(anyWord) ||
          word.lastName.includes(capitalizeFirstLetter(anyWord)) ||
          word.firstName.includes(capitalizeFirstLetter(anyWord))
      );
      console.log(result);
      let resultPet = this.state.petsMilton.filter(
        (word) =>
          word.name.includes(capitalizeFirstLetter(anyWord)) ||
          word.breed.includes(capitalizeFirstLetter(anyWord))
      );
      if (anyWord === "" || (result.length === 0 && resultPet.length === 0)) {
        this.setState({
          errorMsgOnSearchFormLastName: "Nothing was found!",
          modalToShowSearchResults: false,
        });
        return;
      }
      if (result.length > 0 && resultPet.length === 0) {
        this.toggleModalResultsByLastName();
        await this.setState({
          searchResults: result,
          errorMessageClient: "",
        });
      } else if (resultPet.length > 0 && result.length === 0) {
        this.toggleModalResultsByPetName();
        await this.setState({
          searchPetResults: resultPet,
          errorMessageClient: "",
        });
      } else {
        alert("You have results showing in 2 windows!");
        this.toggleModalResultsByLastName();
        this.toggleModalResultsByPetName();
        await this.setState({
          searchResults: result,
          searchPetResults: resultPet,
          errorMessageClient: "",
        });
      }
    } else {
      await this.getAllPetsCambridge();
      await axios
        .get("/api/clients_cambridge", {
          headers: {
            JWT: `${accessString}`,
          },
        })
        .then((res) =>
          this.setState({
            clientsCambridge: res.data,
          })
        )
        .catch((err) => console.log(err));

      let result = this.state.clientsCambridge.filter(
        (word) =>
          word.id === parseInt(anyWord) ||
          word.primaryPhoneNumber.includes(anyWord) ||
          word.cellphone.includes(anyWord) ||
          word.workPhone === anyWord ||
          word.lastName.includes(capitalizeFirstLetter(anyWord)) ||
          word.firstName.includes(capitalizeFirstLetter(anyWord))
      );
      let resultPet = this.state.petsCambridge.filter(
        (word) =>
          word.name.includes(capitalizeFirstLetter(anyWord)) ||
          word.breed.includes(capitalizeFirstLetter(anyWord))
      );
      if (anyWord === "" || (result.length === 0 && resultPet.length === 0)) {
        this.setState({
          errorMsgOnSearchFormLastName: "Nothing was found!",
          modalToShowSearchResults: false,
        });
        return;
      }
      if (result.length > 0 && resultPet.length === 0) {
        this.toggleModalResultsByLastName();
        await this.setState({
          searchResults: result,
          errorMessageClient: "",
        });
      } else if (resultPet.length > 0 && result.length === 0) {
        this.toggleModalResultsByPetName();
        await this.setState({
          searchPetResults: resultPet,
          errorMessageClient: "",
        });
      } else {
        alert("You have results showing in 2 windows!");
        this.toggleModalResultsByLastName();
        this.toggleModalResultsByPetName();
        await this.setState({
          searchResults: result,
          searchPetResults: resultPet,
          errorMessageClient: "",
        });
      }
    }
  };

  toggle = () => {
    if (!this.state.modal) {
      this.setState({
        fullClientInfoForModal: "",
        idForThisClientOnModal: "",
      });
    }
    this.setState({
      modal: !this.state.modal,
    });
  };

  getFullClientInfoOnModal = async ({ currentTarget }) => {
    this.toggle();

    const clientId = currentTarget.value;
    let accessString = localStorage.getItem("JWT");
    if (this.state.city === "milton") {
      await axios
        .get("/auth/api/clients/" + clientId, {
          headers: { Authorization: `JWT ${accessString}` },
        })
        .then(async (res) => {
          await this.setState({
            fullClientInfoForModal: res.data,
            petsForThisOwner: res.data.Pets,
            idForThisClientOnModal: res.data.id,
          });
        })
        .catch((error) => console.log(error));
    } else {
      await axios
        .get("/auth/api/clients_cambridge/" + clientId, {
          headers: { Authorization: `JWT ${accessString}` },
        })
        .then(async (res) => {
          await this.setState({
            fullClientInfoForModal: res.data,
            petsForThisOwner: res.data.PetCambridges,
            idForThisClientOnModal: clientId,
          });
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    //Search Results by Client//////////////////////////////////////////////
    const searchResults = this.state.searchResults;
    const searchResultsLastNameList =
      searchResults.length > 0
        ? searchResults.map((result) => {
            return (
              <tr key={result.id} className="tableContentResultsModalPhone">
                <td className="text-dark">{result.id}</td>
                <td className="text-dark">{result.firstName}</td>
                <td className="text-dark">{result.lastName}</td>
                <td className="text-dark">{result.primaryPhoneNumber}</td>
                <td className="text-dark">{result.cellphone}</td>
                <td className="text-dark">
                  {this.state.city === "milton" ? (
                    <div>
                      {result.Pets.map((pet) => {
                        return (
                          <div key={pet.id}>
                            <p>
                              <span className="petNameResults">{pet.name}</span>{" "}
                              -- {pet.breed}
                            </p>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      {result.PetCambridges.map((pet) => {
                        return (
                          <div key={pet.id}>
                            <p>
                              <span className="petNameResults">{pet.name}</span>{" "}
                              -- {pet.breed}
                            </p>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </td>
                <td>
                  <Link
                    style={{
                      border: "1px solid white",
                      display: "block",
                    }}
                    className="btn btn-warning"
                    to={
                      this.state.city === "milton"
                        ? "api/clients/" + result.id
                        : "api/clients_cambridge/" + result.id
                    }
                  >
                    More Info...
                  </Link>
                </td>
              </tr>
            );
          })
        : null;

    const clientFullInformation = this.state.fullClientInfoForModal;
    const petsArray = this.state.petsForThisOwner;
    const petsListFormModal = petsArray.length
      ? petsArray.map((pet) => {
          return (
            <div className="card" key={pet.id}>
              <p className="petsCard">
                Name: {pet.name} <br></br> {""} Breed: {pet.breed}
              </p>
            </div>
          );
        })
      : null;

    // Search Results by Pet Name//////////////////////////////////////////////
    const searchResultsByPetName = this.state.searchPetResults;
    const searchResultsPetNameList = searchResultsByPetName.length
      ? searchResultsByPetName.map((petName) => {
          return (
            <tr key={petName.id} className="tableContentResultsModalPhone">
              <td>
                <Button
                  value={
                    this.state.city === "milton"
                      ? petName.ClientId
                      : petName.ClientCambridgeId
                  }
                  style={{
                    border: "4px solid white",
                    borderRadius: "5px",
                    display: "block",
                  }}
                  className="btn btn-warning"
                  onClick={this.getFullClientInfoOnModal}
                >
                  OWNER INFO
                </Button>
              </td>
              <td className="text-dark">
                {this.state.city === "milton"
                  ? petName.ClientId
                  : petName.ClientCambridgeId}
              </td>
              <td className="text-dark">{petName.name}</td>
              <td className="text-dark">{petName.breed}</td>
              <td className="text-dark">{petName.type}</td>
              <td>
                <Link
                  style={{
                    border: "4px solid white",
                    display: "block",
                    borderRadius: "5px",
                  }}
                  className="btn btn-success"
                  to={
                    this.state.city === "milton"
                      ? "api/clients/" + petName.ClientId
                      : "api/clients_cambridge/" + petName.ClientCambridgeId
                  }
                >
                  FULL INFO...
                </Link>
              </td>
            </tr>
          );
        })
      : null;

    return (
      <div className=" searchBoxContainerr">
        <div className="searchBox-wrapper ">
          <div className="searchBox__3 searchForm_receptionist">
            <form onSubmit={this.searchClient}>
              <h4 className="searchBoxTitles">
                Search Clients <i className="fas fa-user"></i>
              </h4>
              <input
                className="search-input-reception"
                onChange={this.onChangeSearchForm}
                name="searchAnyWordInput"
                placeholder="Search by first name, last name, pet name, breed, phone #, etc"
                value={this.state.searchAnyWordInput}
              />
              <button className="searchButtons">
                Search <i className="fas fa-search"></i>
              </button>
              <div
                style={{
                  padding: "5px",
                  textAlign: "center",
                  color: "yellow",
                }}
              >
                {this.state.errorMsgOnSearchFormLastName}
              </div>
            </form>
          </div>
        </div>

        {/* Modal to show client results  */}
        <div className="col-md-12">
          <Modal
            className="modal-xl"
            isOpen={this.state.modalToShowResultsByLastName}
            toggle={this.toggleModalResultsByLastName}
          >
            <ModalHeader toggle={this.toggleModalResultsByLastName}>
              <div>
                <h4>Search Results</h4>
              </div>
            </ModalHeader>
            <ModalBody>
              <Table className="tableSearchResults">
                <thead>
                  <tr>
                    <th className="theadingsModalPhoneResults">Client #</th>
                    <th className="theadingsModalPhoneResults">First Name</th>
                    <th className="theadingsModalPhoneResults">Last Name</th>
                    <th className="theadingsModalPhoneResults">
                      Primary Phone
                    </th>
                    <th className="theadingsModalPhoneResults">Cell</th>
                    <th className="theadingsModalPhoneResults">Pets</th>
                    <th className="theadingsModalPhoneResults">Action</th>
                  </tr>
                </thead>
                <tbody>{searchResultsLastNameList}</tbody>
              </Table>
            </ModalBody>
          </Modal>
        </div>

        {/* Modal to show Owner Information after pet Name results */}
        <div>
          <Modal
            // className="modal-xl"
            isOpen={this.state.modal}
            toggle={this.toggle}
          >
            <ModalHeader toggle={this.toggle}>
              Client Number: {clientFullInformation.id}
              <Link
                style={{
                  width: "150px",
                  borderRadius: "5px",
                  border: "1px solid black",
                  marginLeft: "100px",
                  marginTop: "15px",
                }}
                className="btn btn-success"
                to={
                  this.state.city === "milton"
                    ? "api/clients/" + clientFullInformation.id
                    : "api/clients_cambridge/" + clientFullInformation.id
                }
              >
                Client's Profile...
              </Link>
            </ModalHeader>
            <ModalBody>
              <div className="card ownerInfoModal">
                <p>First Name: {clientFullInformation.firstName}</p>
                <p>Last Name: {clientFullInformation.lastName}</p>
                <p>Phone Number: {clientFullInformation.primaryPhoneNumber}</p>
                <div>Pets: {petsListFormModal}</div>
              </div>
            </ModalBody>
          </Modal>
        </div>

        {/* Modal to show results By Pet Name */}
        <div className="col-md-12">
          <Modal
            className="modal-lg"
            isOpen={this.state.modalToShowResultsByPetName}
            toggle={this.toggleModalResultsByPetName}
          >
            <ModalHeader toggle={this.toggleModalResultsByPetName}>
              <div>
                <h4>Search Results</h4>
              </div>
            </ModalHeader>
            <ModalBody>
              <Table className="tableSearchResults">
                <thead>
                  <tr>
                    <th className="theadingsModalPhoneResults">Action</th>
                    <th className="theadingsModalPhoneResults">Client #</th>
                    <th className="theadingsModalPhoneResults">Pet Name</th>
                    <th className="theadingsModalPhoneResults">Breed</th>
                    <th className="theadingsModalPhoneResults">Type</th>
                    <th className="theadingsModalPhoneResults">Action</th>
                  </tr>
                </thead>
                <tbody>{searchResultsPetNameList}</tbody>
              </Table>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default index;
