import React, { Component } from "react";
import LoadPage from "../../components/LoadingPage";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import "./style.scss";
import Select from "react-select";
import API from "../../utils/APICAMBRIDGE";
import axios from "axios";

let petTypeOptions = [
  {
    value: "Dog",
    label: "Dog",
  },
  {
    value: "Cat",
    label: "Cat",
  },
  {
    value: "Other",
    label: "Other",
  },
];

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: false,
      pets: [],
      petName: undefined,
      breed: undefined,
      petImg: "",
      type: undefined,
      notes: "",
      firstName: "",
      lastName: "",
      primaryPhoneNumber: "",
      cellphone: "",
      workPhone: "",
      email: "",
      allowPhotoIsNotChecked: false,
      loadingAxiosReq: false,
      errorMsg: "",
      modalToAddPet: false,
      modalTofinishCustomer: false,
      isCustomerDone: false,
    };
  }

  async componentDidMount() {
    await axios
      .get("/auth/customer_cambridge/" + this.props.match.params.regid)
      .then(async (res) => {
        // console.log(res);
        await this.setState({
          ClientId: res.data.id,
          pets: res.data.PetCambridges,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          primaryPhoneNumber: res.data.primaryPhoneNumber,
          cellphone: res.data.cellphone,
          workPhone: res.data.workPhone,
          email: res.data.email,
        });
      })
      .catch((err) => console.log(err));
  }

  onSelectedChanged = (value) => {
    this.setState({
      type: value,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
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

  //Add a Pet to Client
  onSubmitPetForm = async (e) => {
    e.preventDefault();

    if (!this.state.type || !this.state.petName || !this.state.breed) {
      return this.setState({
        errorMsg: "Please enter the required fields above!",
      });
    }

    let obj = {
      name: this.state.petName.replace(/^./, (str) => str.toUpperCase()),
      breed: this.state.breed.replace(/^./, (str) => str.toUpperCase()),
      type: this.state.type.value,
      notes: this.state.notes,
      allowPhoto: this.state.allowPhotoIsNotChecked,
    };

    let ClientId = this.state.ClientId;
    this.setState({
      loadingAxiosReq: true,
    });
    await API.addPet(ClientId, obj)

      .then((res) => {
        this.setState({
          pets: res.data,
          loadingAxiosReq: false,
        });
        window.location.reload();
      })
      .catch((error) => {
        this.setState({
          loadingAxiosReq: false,
        });
        console.log(error);
      });
  };

  toggleModalForAddingPets = () => {
    if (this.state.modalToAddPet === false) {
      this.setState({
        petName: "",
        breed: "",
        type: "",
        notes: "",
        errorMsg: "",
      });
    }
    this.setState({
      modalToAddPet: !this.state.modalToAddPet,
    });
  };

  handleCustomerDone = () => {
    this.setState({
      modalTofinishCustomer: true,
    });
    function sayUserSessionIsOver() {
      window.location.href = "/auth/customer_cambridge";
    }
    setTimeout(sayUserSessionIsOver, 9000);
  };

  render() {
    const pets = this.state.pets;
    const petsList =
      pets.length > 0 ? (
        pets.map((pet) => {
          return (
            <div key={pet.id}>
              <div className="card-body pet-card-customer">
                <div className="card ">
                  <h2 className="text-align-center pet-info-customer-heading">
                    <i className="fas fa-paw"></i> Pet Info - Cambridge
                  </h2>
                  <div className="row petInfo-container">
                    <div className="col-lg-12 text-align-center">
                      <p className="label-customer-addPet-page">
                        Pet Name:{" "}
                        <span className="text-content-addPet-page-pet">
                          {" "}
                          {pet.name}
                        </span>
                      </p>
                      <p className="label-customer-addPet-page">
                        Breed:{" "}
                        <span className="text-content-addPet--pet">
                          {pet.breed}
                        </span>
                      </p>
                      <p className="label-customer-addPet-page">
                        Type:{" "}
                        <span className="text-content-addPet-page-pet">
                          {pet.type}
                        </span>
                      </p>
                      <p className="label-customer-addPet-page">
                        Notes:{" "}
                        <span className="text-content-addPet-page-pet">
                          {" "}
                          {pet.notes}
                        </span>
                      </p>
                    </div>
                    <div className="col-lg-12">
                      <img
                        className="pet-pic-img-customer"
                        src="https://res.cloudinary.com/amazing-pet-grooming/image/upload/v1584052358/amazing/pet-pic_kzksib.png"
                        alt="pet-pic"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h4 className="text-align-center">
            <i className="fas fa-paw"></i> PETS
          </h4>
          No pets added yet, please add them by clicking the yellow Button
        </div>
      );

    return (
      <div className="container customer-add-pet-page-container__cambridge">
        <h1 className="text-align-center">
          <i className="fas fa-dog"></i> One last step{" "}
          <i className="fas fa-cat"></i>
        </h1>
        <hr className="hr-white" />
        <div className="row">
          <div className="customer-info-container card col-lg-7">
            <h2 className="text-align-center">
              <i className="fas fa-user-circle"></i> Owner Information
            </h2>
            <hr className="hr-black" />
            <p className="label-customer-addPet-page">
              First Name:{" "}
              <span className="text-content-addPet-page">
                {this.state.firstName}
              </span>{" "}
            </p>

            <p className="label-customer-addPet-page">
              Last Name:{" "}
              <span className="text-content-addPet-page">
                {" "}
                {this.state.lastName}
              </span>{" "}
            </p>
            <p className="label-customer-addPet-page">
              Primary Phone:{" "}
              <span className="text-content-addPet-page">
                {" "}
                {this.state.primaryPhoneNumber}
              </span>{" "}
            </p>
            <p className="label-customer-addPet-page">
              Cell:{" "}
              <span className="text-content-addPet-page">
                {this.state.cellphone}
              </span>{" "}
            </p>
            <p className="label-customer-addPet-page">
              Emergency Phone:{" "}
              <span className="text-content-addPet-page">
                {" "}
                {this.state.workPhone}
              </span>{" "}
            </p>
            <p className="label-customer-addPet-page">
              Email:{" "}
              <span className="text-content-addPet-page">
                {this.state.email}
              </span>{" "}
            </p>
            <Button
              className="add-pet-button-customer"
              onClick={this.toggleModalForAddingPets}
              color="warning"
            >
              <i className="fas fa-plus"></i> Click here to Add Pets{" "}
              <i className="fas fa-paw"></i>
            </Button>
            <hr className="hr-black" />
            <hr className="hr-black" />

            {this.state.pets.length > 0 ? (
              <Button
                block
                className="done-btn button-flashing-submit"
                onClick={this.handleCustomerDone}
                color="dark"
              >
                <i className="fas fa-check"></i> Click here if you are done
                adding pets {""}
                <i className="fas fa-paw"></i>
              </Button>
            ) : null}
          </div>
          <div className="col-lg-5">
            {petsList}
            <Modal
              modalClassName="modal-cambridge-calendar"
              isOpen={this.state.modalToAddPet}
              toggle={this.toggleModalForAddingPets}
            >
              <ModalHeader toggle={this.toggleModalForAddingPets}></ModalHeader>
              <ModalBody>
                <div className="form-registration-container">
                  <form className="form-group" onSubmit={this.onSubmitPetForm}>
                    <h4
                      className="grey-text text-darken-3"
                      style={{
                        textAlign: "center",
                        marginTop: "15px",
                      }}
                    >
                      <i className="fas fa-paw"></i> Add your pet below <br />{" "}
                      (One pet per form)
                    </h4>

                    <p>* Fields required</p>
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
                        placeholder="* Pet Name"
                        value={this.state.petName}
                        name="petName"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="input-field-registration">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="* Breed"
                        value={this.state.breed}
                        name="breed"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="input-field-registration">
                      <Select
                        value={this.state.type}
                        options={petTypeOptions}
                        placeholder={"* Select Pet Type"}
                        isSearchable={false}
                        onChange={this.onSelectedChanged}
                        // styles={colourStyles}
                      />
                    </div>
                    <div className="input-field-registration">
                      <textarea
                        className="form-control"
                        type="text"
                        placeholder="Warnings / notes (Optional)"
                        name="notes"
                        value={this.state.notes}
                        onChange={this.handleChange}
                      />
                    </div>
                    <p className="agree-with-photo">
                      <input
                        className="checkbox-registration"
                        onChange={this.toggleChangeAllowPhoto}
                        type="checkbox"
                        name="checkbox"
                        value={this.state.toggleChangeAllowPhoto}
                      ></input>{" "}
                      <span className="photo-release ">
                        (OPTIONAL) <i className="fas fa-camera-retro"></i> I
                        authorize Amazing Pet grooming, to publish photographs
                        taken of my pet(s), for use in the Company's print,
                        online and video-based marketing materials, as well as
                        other Company publications. I also understand that I
                        will not receive financial compensation of any type
                        associated with this material.
                      </span>
                    </p>

                    {this.state.loadingAxiosReq ? (
                      <LoadPage />
                    ) : (
                      <div className="input-field-registration">
                        <Button
                          color="info"
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
                      </div>
                    )}
                  </form>
                  <p className="error-message-registration text-align-center">
                    {this.state.errorMsg}
                  </p>
                </div>
              </ModalBody>
            </Modal>

            <Modal size="lg" isOpen={this.state.modalTofinishCustomer}>
              <ModalBody>
                <div className="count-down-bar">
                  <h4 className="text-align-center count-down-bar_heading">
                    Thanks for Registering! Please inform our staff now{" "}
                    <i className="fas fa-paw"></i>
                  </h4>
                  <video className="bg-video__content-pet" autoPlay muted loop>
                    <source src="/images/dog-customer.mp4" type="video/mp4" />
                    <source src="img/video.webm" type="video/webm" />
                    Your browser is not supported!
                  </video>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
