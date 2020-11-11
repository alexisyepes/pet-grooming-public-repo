import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/APICAMBRIDGE";
import axios from "axios";
import moment from "moment";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";

import {
  Label,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import "./style.scss";

let optionsGroomers = [
  {
    value: "Paola",
    label: "Paola",
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

class index extends Component {
  constructor(props) {
    super(props);

    this.deletePet = this.deletePet.bind(this);
    this.onSubmitPetForm = this.onSubmitPetForm.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.updatePet = this.updatePet.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      client: null,
      pets: null,
      PetId: null,
      commentId: null,
      allPets: null,
      isLoading: true,
      error: false,
      modalComments: false,
      modalForAddingPets: false,
      modalForEdittingPets: false,
      commentToEditGroomer: false,
      comments: [],
      date: moment(new Date()).format("YYYY/MM/DD"),
      commentToAdd: "",
      groomer: "",
      petName: null,
      breed: null,
      petImg: "",
      type: null,
      notes: "",
      allowPhotoIsChecked: false,
      allowPhotoIsCheckedToEdit: null,
      petNameToEdit: null,
      petBreedToEdit: null,
      petTypeToEdit: null,
      petNotesToEdit: null,
      fullPetName: null,
      commentToEditComment: [],
      commentToEditDate: [],
      startDate: new Date(),
      clientSearchByPhone: null,
      clientSearchValuePhone: null,
      modalToSearchClientByPhone: false,
      modalToSeeFormAndEditComments: false,
      loadingAxiosRequest: false,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let accessString = localStorage.getItem("JWT");
    if (accessString === null) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
    let id = this.props.match.params.id;
    await axios
      .get("/auth/api/clients_cambridge/" + id, {
        headers: { Authorization: `JWT ${accessString}` },
      })
      .then((res) => {
        // console.log(res);
        this.setState({
          isLoading: false,
          error: false,
          client: res.data,
          pets: res.data.PetCambridges,
        });
      })
      .catch((error) => console.log(error));
  }

  toggleModal = () => {
    this.setState({
      modalComments: !this.state.modalComments,
    });
  };
  toggleModalToSearchClientByPhone = () => {
    this.setState({
      modalToSearchClientByPhone: !this.state.modalToSearchClientByPhone,
    });
  };

  toggleModalForAddingPets = () => {
    if (this.state.modalForAddingPets === false) {
      this.setState({
        petName: "",
        breed: "",
        type: "",
        notes: "",
      });
    }
    this.setState({
      modalForAddingPets: !this.state.modalForAddingPets,
    });
  };

  toggleModalForEdittingPets = () => {
    if (this.state.modalForEdittingPets) {
      this.setState({
        PetId: "",
        petNameToEdit: "",
        petBreedToEdit: "",
        petTypeToEdit: "",
        petNotesToEdit: "",
      });
    }
    this.setState({
      modalForEdittingPets: !this.state.modalForEdittingPets,
    });
  };

  toggleModalToSeeCommentsForm = () => {
    this.setState({
      modalToSeeFormAndEditComments: !this.state.modalToSeeFormAndEditComments,
    });
  };

  getPetIdForUpdateFunc = async ({ currentTarget }) => {
    this.toggleModalForEdittingPets();
    const id = currentTarget.value;
    await API.getPet(id)
      .then((res) => {
        this.setState({
          PetId: res.data.id,
          petNameToEdit: res.data.name,
          petBreedToEdit: res.data.breed,
          petTypeToEdit: res.data.type,
          petNotesToEdit: res.data.notes,
          allowPhotoIsCheckedToEdit: res.data.allowPhoto,
        });
      })
      .catch((error) => console.log(error));
  };

  getPetId = ({ currentTarget }) => {
    this.toggleModal();
    const id = currentTarget.value;
    API.getPet(id)
      .then((res) => {
        this.setState({
          comments: res.data.CommentCambridges,
          PetId: res.data.id,
          fullPetName: res.data.name,
        });
      })
      .catch((error) => console.log(error));
  };

  toggleChangeAllowPhoto = () => {
    this.setState({
      allowPhotoIsChecked: !this.state.allowPhotoIsChecked,
    });
  };

  toggleChangeAllowPhotoEdited = () => {
    this.setState({
      allowPhotoIsCheckedToEdit: !this.state.allowPhotoIsCheckedToEdit,
    });
  };

  handleChangeDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  onChangeModal = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeModalEdit = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeCommentToEdit = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChange(e) {
    this.setState({
      client: {
        ...this.state.client,
        [e.target.name]: e.target.value,
      },
    });
  }

  //onChange for <Select /> on modal form
  onSelectedChanged = (value) => {
    this.setState({
      groomer: value,
    });
    // console.log(`Option selected:`, value);
  };

  //onChange for <Select /> on modal form
  onSelectedChangedToEdit = (value) => {
    this.setState({
      commentToEditGroomer: value,
    });
    // console.log(`Option selected:`, value);
  };

  async onSubmit(e) {
    e.preventDefault();

    let obj = {
      id: this.state.client.id,
      lastName: this.state.client.lastName.replace(/^./, (str) =>
        str.toUpperCase()
      ),
      firstName: this.state.client.firstName.replace(/^./, (str) =>
        str.toUpperCase()
      ),
      primaryPhoneNumber: this.state.client.primaryPhoneNumber.replace(
        /[- )(]/g,
        ""
      ),
      cellphone: this.state.client.cellphone.replace(/[- )(]/g, ""),
      workPhone: this.state.client.workPhone.replace(/[- )(]/g, ""),
      email: this.state.client.email,
    };

    let id = this.state.client.id;

    await API.updateClient(id, obj)

      .then(() => console.log("..updating"))
      .catch((error) => console.log(error));

    // window.location.href = "/auth/admin";
    this.props.history.push("/auth/admin");
  }

  //Add a Pet to Client
  async onSubmitPetForm(e) {
    e.preventDefault();

    let obj = {
      name: this.state.petName.replace(/^./, (str) => str.toUpperCase()),
      breed: this.state.breed.replace(/^./, (str) => str.toUpperCase()),
      type: this.state.type.replace(/^./, (str) => str.toUpperCase()),
      notes: this.state.notes,
      allowPhoto: this.state.allowPhotoIsChecked,
    };

    let ClientId = this.state.client.id;

    await API.addPet(ClientId, obj)

      .then(() => console.log("...updating"))
      .catch((error) => console.log(error));

    // window.location.href = "/auth/admin";
    window.location.href = "/auth/api/clients_cambridge/" + ClientId;
  }

  handleAddCommentSubmit = async (e) => {
    e.preventDefault();
    let petId = this.state.PetId;
    console.log(petId);
    let clientId = this.state.client.id;

    let commentObj = {
      date: this.state.date,
      comment: this.state.commentToAdd,
      groomer: this.state.groomer.value,
    };

    if (!this.state.date || !this.state.commentToAdd) {
      return;
    }
    await API.addComment(petId, commentObj)

      .then(() => console.log("updating..."))
      .catch((error) => console.log(error));
    window.location.href = "/auth/api/clients_cambridge/" + clientId;
  };

  async updatePet(e) {
    e.preventDefault();

    let petObj = {
      name: this.state.petNameToEdit.replace(/^./, (str) => str.toUpperCase()),
      breed: this.state.petBreedToEdit.replace(/^./, (str) =>
        str.toUpperCase()
      ),
      type: this.state.petTypeToEdit.replace(/^./, (str) => str.toUpperCase()),
      notes: this.state.petNotesToEdit,
      allowPhoto: this.state.allowPhotoIsCheckedToEdit,
    };
    let ClientId = this.state.client.id;
    let id = this.state.PetId;
    await API.updatePet(id, petObj)
      .then(() => console.log("updating..."))
      .catch((error) => console.log(error));
    window.location.href = "/auth/api/clients_cambridge/" + ClientId;
  }

  async updateComment(e) {
    e.preventDefault();
    let commentObj = {
      date: this.state.commentToEditDate,
      comment: this.state.commentToEditComment,
      groomer: this.state.commentToEditGroomer.value,
    };
    let ClientId = this.state.client.id;
    let id = this.state.commentId;

    console.log(commentObj);

    await API.updateComment(id, commentObj)
      .then(
        this.setState({
          commentToEditGroomer: "",
          commentToEditComment: "",
        })
      )
      .catch((error) => console.log(error));
    window.location.href = "/auth/api/clients_cambridge/" + ClientId;
  }

  deleteComment = async ({ currentTarget }) => {
    let clientId = this.state.client.id;
    console.log("here");
    let id = currentTarget.value;
    if (
      window.confirm(
        `Are you sure you wish to delete this comment permanently?`
      )
    ) {
      await API.deleteComment(id)
        .then(() => console.log("success!"))
        .catch((err) => console.log(err));
      window.location.href = "/auth/api/clients_cambridge/" + clientId;
    }
  };

  async deletePet({ currentTarget }) {
    let clientId = this.state.client.id;
    let id = currentTarget.value;
    if (
      window.confirm(`Are you sure you wish to delete this Pet permanently?`)
    ) {
      await API.deletePet(id)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      window.location.href = "/auth/api/clients_cambridge/" + clientId;
    }
  }

  openModalToEdditComment = ({ currentTarget }) => {
    this.toggleModalToSeeCommentsForm();
    if (!this.state.modalToSeeFormAndEditComments) {
      this.setState({
        commentToEditDate: "",
        commentToEditComment: "",
        commentId: "",
        commentToEditGroomer: "",
      });
    }
    const id = currentTarget.value;
    API.getOneComment(id)
      .then((res) => {
        this.setState({
          commentToEditDate: res.data.date,
          commentToEditComment: res.data.comment,
          commentToEditGroomer: res.data.groomer,
          commentId: res.data.id,
        });
      })
      .catch((error) => console.log(error));
  };

  errorOnPhotoUpload = () => {
    toast.error(
      "Wrong file type, or file size! Make sure your image type is jpg, jpeg, or png, and less than 3 Megabytes",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  };

  fileUploadHandler = async () => {
    if (!this.state.petImg) {
      return;
    }
    const PetId = this.state.PetId;
    const fd = new FormData();
    fd.append("file", this.state.petImg);
    fd.append("upload_preset", "amazing");
    this.setState({
      loadingAxiosRequest: true,
    });

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/amazing-pet-grooming/image/upload",
        fd
      )
      .then(async (res) => {
        let newPetImg = {
          petImg: res.data.secure_url,
        };
        await axios
          .put("/pets_img_cambridge/" + PetId, newPetImg)
          .then((res) => {
            console.log(res);
            this.setState({
              loadingAxiosRequest: false,
            });
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status === 500 || error) {
              this.errorOnPhotoUpload();
              this.setState({
                loadingAxiosRequest: false,
              });
            }
          });
        this.setState({
          petImg: res.data.secure_url,
        });
      })
      .catch((err) => {
        this.errorOnPhotoUpload();
        this.setState({
          loadingAxiosRequest: false,
        });
        console.log(err);
      });
  };

  fileSelectedHandler = async (event) => {
    await this.setState({
      petImg: event.target.files[0],
    });
    this.fileUploadHandler();
  };

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return (
        <div
          style={{
            marginLeft: "10%",
            fontSize: "30px",
            height: "100vh",
            marginTop: "120px",
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
            marginTop: "120px",
          }}
        >
          Loading Amazing Pet Grooming Data...
        </div>
      );
    }

    if (this.state.client === null) return null;
    if (this.state.pets === null) return null;
    if (this.state.pets.Comments === null) return null;

    const comments = this.state.comments;
    const commentToEditGroomer = this.state.commentToEditGroomer;
    const commentsList = comments.length ? (
      comments.map((comment) => {
        return (
          <div key={comment.id} className="container">
            <div
              style={{
                backgroundColor:
                  comment.groomer === "Diana"
                    ? "rgb(238, 191, 205)"
                    : comment.groomer === "Claudia"
                    ? "rgb(135, 221, 247"
                    : "rgb(242, 250, 137)",
              }}
            >
              <Table>
                <tbody>
                  <tr>
                    <td className="tableCellsCommentsDate">{comment.date}</td>

                    <td className="tableCellsCommentsComment">
                      {comment.comment}
                    </td>

                    <td className="tableCellsCommentsGroomer">
                      {comment.groomer}
                    </td>

                    <td className="tableCellsCommentsButtons">
                      <Button
                        className="updateComment-btnSubmit"
                        value={comment.id}
                        onClick={this.openModalToEdditComment}
                      >
                        Update
                      </Button>
                      <Button
                        className="deleteComment-btnSubmit"
                        width="15%"
                        value={comment.id}
                        onClick={this.deleteComment}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div className="col-lg-10">
              <Modal
                className="modal-xl"
                isOpen={this.state.modalToSeeFormAndEditComments}
                toggle={this.toggleModalToSeeCommentsForm}
              >
                <ModalHeader toggle={this.toggleModalToSeeCommentsForm}>
                  <div>
                    <h4 className="petNameCommentsForm">
                      Pet Name: " {this.state.fullPetName} "
                    </h4>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <div>
                    <h3 className="notesHistoryTitle">Notes History</h3>
                  </div>
                  <Form
                    className="addCommentForm"
                    onSubmit={this.updateComment}
                  >
                    <FormGroup>
                      <div className="row">
                        <div className="col-xl-3 col-md-3">
                          <Label>Date Format: YYYY/MM/DD</Label>
                          <Input
                            onChange={this.onChangeCommentToEdit}
                            type="text"
                            id="commentToEditDate"
                            defaultValue={this.state.commentToEditDate}
                          ></Input>
                        </div>
                        <div className="col-xl-7 col-md-5 commentSectionEditComment">
                          <Label>Comments</Label>
                          <Input
                            placeholder="Enter Notes"
                            onChange={this.onChangeCommentToEdit}
                            type="text"
                            id="commentToEditComment"
                            defaultValue={this.state.commentToEditComment}
                          ></Input>
                        </div>
                        <div className="col-xl-2 col-md-3 col-xs-12 selectOptionGroomerEditComment">
                          <Select
                            name="form-field-name"
                            defaultValue={commentToEditGroomer}
                            options={optionsGroomers}
                            placeholder="Groomer:"
                            isSearchable={false}
                            onChange={this.onSelectedChangedToEdit}
                          />
                        </div>
                      </div>
                      <Button
                        block
                        value={comment.id}
                        className="addCommentBtn"
                        color="warning"
                      >
                        Update Comment
                      </Button>
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
            </div>

            <hr style={{ background: "black" }}></hr>
          </div>
        );
      })
    ) : (
      <div>No comments for this pet yet...</div>
    );

    const pets = this.state.pets;
    const groomer = this.state.groomer;
    const petsList =
      pets.length > 0 ? (
        pets.map((pet) => {
          return (
            <div key={pet.id}>
              <div className="card-body">
                <div className="card-body">
                  <div className="petInfo-container">
                    {/* <div className="col-xl-10 col-lg-8 col-sm-12 pet-info-left"> */}
                    <div className="pet-info-left">
                      {/* From here */}
                      <h2 className="pet-info-subTitle">Pet Info</h2>
                      {pet.CommentCambridges < 1 ? (
                        <h4 className="pet-info-parags">
                          Pet Name:
                          <span>
                            <b style={{ color: "black" }}> {pet.name}</b>
                          </span>
                        </h4>
                      ) : (
                        <h4 className="pet-info-parags">
                          Pet Name:{" "}
                          <span>
                            <b
                              style={{
                                color: "green",
                                textShadow:
                                  "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
                              }}
                            >
                              {pet.name}
                            </b>
                          </span>
                        </h4>
                      )}

                      <h4 className="pet-info-parags">
                        Breed:{" "}
                        <span>
                          <b>{pet.breed}</b>
                        </span>
                      </h4>
                      <h4 className="pet-info-parags">
                        Type:{" "}
                        <span>
                          <b>{pet.type}</b>
                        </span>
                      </h4>
                      <h4 className="pet-info-parags">
                        Warnings:{" "}
                        <span className="notesForPets">
                          <b>{pet.notes}</b>
                        </span>
                      </h4>
                    </div>
                    <div className=" pet-pic containerTest">
                      {pet.petImg === null ? (
                        <img
                          onClick={() => {
                            this.fileInput.click();
                            return this.setState({
                              PetId: pet.id,
                            });
                          }}
                          className="pet-pic-img"
                          src="https://res.cloudinary.com/amazing-pet-grooming/image/upload/v1584052358/amazing/pet-pic_kzksib.png"
                          alt="pet-pic"
                        />
                      ) : (
                        <img
                          onClick={() => {
                            this.fileInput.click();
                            return this.setState({
                              PetId: pet.id,
                            });
                          }}
                          className="pet-pic-photo"
                          src={pet.petImg}
                          alt="pet-pic"
                        />
                      )}
                      <div
                        value={pet.id}
                        onClick={() => {
                          this.fileInput.click();
                          return this.setState({
                            PetId: pet.id,
                          });
                        }}
                        className="middleTest"
                      >
                        <p>
                          <b>click here to upload image</b>
                        </p>
                      </div>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        capture="environment"
                        onChange={this.fileSelectedHandler}
                        ref={(fileInput) => (this.fileInput = fileInput)}
                      />

                      {this.state.loadingAxiosRequest ? <LoadingPage /> : null}
                      <i>
                        upload image <i className="fas fa-upload"></i>
                      </i>
                      {pet.allowPhoto ? (
                        <h1 style={{ color: "green" }}>
                          <i className="fas fa-camera-retro"></i>
                        </h1>
                      ) : (
                        <h1 style={{ color: "red" }}>
                          <i className="fas fa-camera-retro"></i>
                        </h1>
                      )}
                    </div>
                  </div>

                  <div className="container-btns-edit-client">
                    <button
                      value={pet.id}
                      onClick={this.getPetId}
                      className="petCommentBtn"
                    >
                      Comments
                    </button>
                    <button
                      className="petUpdateBtn"
                      value={pet.id}
                      onClick={this.getPetIdForUpdateFunc}
                    >
                      Update Pet
                    </button>
                    <button
                      className="petDeleteBtn"
                      value={pet.id}
                      onClick={this.deletePet}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="col-lg-10">
                  <Modal
                    value={pet.id}
                    className="modal-xl"
                    isOpen={this.state.modalComments}
                    toggle={this.toggleModal}
                  >
                    <ModalHeader toggle={this.toggleModal}>
                      <div>
                        <h4 className="petNameCommentsForm">
                          Pet Name: " {this.state.fullPetName} "
                        </h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <div>
                        <h3 className="notesHistoryTitle">Notes History</h3>
                      </div>
                      <div>{commentsList}</div>
                      <Form
                        className="addCommentForm"
                        onSubmit={this.handleAddCommentSubmit}
                      >
                        <FormGroup>
                          <h2 className="titleComments">Add a comment</h2>

                          <div className="row">
                            <div className="col-xl-3 col-md-3">
                              <Label>Date Format: YYYY/MM/DD</Label>
                              <Input
                                onChange={this.onChangeModal}
                                type="text"
                                name="date"
                                defaultValue={this.state.date}
                              ></Input>
                            </div>
                            <div className="col-xl-7 col-md-5 commentSectionAddComment">
                              <Label>Comments</Label>
                              <Input
                                placeholder="Enter Notes"
                                onChange={this.onChangeModal}
                                type="text"
                                name="commentToAdd"
                                value={this.state.commentToAdd}
                              ></Input>
                            </div>
                            <div className="col-xl-2 col-md-3 col-xs-12 selectOptionGroomerAddComment">
                              <Select
                                name="form-field-name"
                                value={groomer}
                                options={optionsGroomers}
                                placeholder="Groomer:"
                                isSearchable={false}
                                onChange={this.onSelectedChanged}
                              />
                            </div>
                          </div>

                          <Button
                            block
                            value={pet.id}
                            className="addCommentBtn"
                            color="warning"
                          >
                            Add Comment
                          </Button>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>

                {/* Modal for editing pets */}
                <div>
                  <Modal
                    className="col-sm-6"
                    isOpen={this.state.modalForEdittingPets}
                    toggle={this.toggleModalForEdittingPets}
                  >
                    <ModalHeader toggle={this.toggleModalForEdittingPets}>
                      <div>
                        <h4>Client Number: {this.state.client.id}</h4>
                      </div>
                    </ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.updatePet}>
                        <FormGroup>
                          <h2 className="titleComments">Edit Pet</h2>
                          <Label>Name</Label>
                          <Input
                            id="petNameToEdit"
                            onChange={this.onChangeModalEdit}
                            type="text"
                            name="petName"
                            defaultValue={this.state.petNameToEdit}
                          ></Input>
                          <Label>Breed</Label>
                          <Input
                            id="petBreedToEdit"
                            onChange={this.onChangeModalEdit}
                            type="text"
                            name="breed"
                            defaultValue={this.state.petBreedToEdit}
                          ></Input>
                          <Label>Type</Label>
                          <Input
                            id="petTypeToEdit"
                            onChange={this.onChangeModalEdit}
                            type="text"
                            name="type"
                            defaultValue={this.state.petTypeToEdit}
                          ></Input>
                          <Label>Warnings</Label>
                          <Input
                            id="petNotesToEdit"
                            onChange={this.onChangeModalEdit}
                            type="text"
                            name="petNotesToEdit"
                            defaultValue={this.state.petNotesToEdit}
                          ></Input>
                          {this.state.allowPhotoIsCheckedToEdit ? (
                            <p className="agree-with-photo-editPage">
                              <input
                                className="checkbox-registration"
                                onChange={this.toggleChangeAllowPhotoEdited}
                                type="checkbox"
                                name="allowPhotoIsCheckedToEdit"
                                defaultValue={
                                  this.state.allowPhotoIsCheckedToEdit
                                }
                              ></input>{" "}
                              <span
                                style={{ color: "green" }}
                                className="photo-release "
                              >
                                <i className="fas fa-camera-retro"></i>
                                PHOTOS ALLOWED
                              </span>
                            </p>
                          ) : (
                            <p className="do-not-agree-with-photo-editPage">
                              <input
                                className="checkbox-registration"
                                onChange={this.toggleChangeAllowPhotoEdited}
                                type="checkbox"
                                name="allowPhotoIsCheckedToEdit"
                                defaultValue={
                                  this.state.allowPhotoIsCheckedToEdit
                                }
                              ></input>{" "}
                              <span className="photo-release ">
                                <i className="fas fa-camera-retro"></i> NO
                                PHOTOS ALLOWED
                              </span>
                            </p>
                          )}
                          <Button
                            value={pet.id}
                            className="petEditBtn"
                            color="warning"
                          >
                            Submit Changes
                          </Button>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col">
          <h2 className="noPetsYetTitle">No Pets for this client yet</h2>
          <Button
            className="petAddBtn"
            onClick={this.toggleModalForAddingPets}
            color="warning"
          >
            ADD PETS
          </Button>{" "}
        </div>
      );

    const client = this.state.client ? (
      <div className="edit-client-container">
        <div className="row">
          <div className="col-md-6">
            <div className="client-form-to-edit-container">
              <Form onSubmit={this.onSubmit}>
                <Link className="goBackToControlPanelLink" to={"/auth/admin"}>
                  <button className="goBackToControlPanelBtn">
                    <i className="fas fa-arrow-alt-circle-left"></i> Back to
                    Control Panel
                  </button>
                </Link>
                <h3 className="updateClientTitleForm">
                  <b>Update Client Number: {this.state.client.id}</b>
                </h3>
                <p>* Fields required</p>
                <hr></hr>
                <FormGroup>
                  <div className="form-group">
                    <Label>* Last Name: </Label>
                    <Input
                      type="text"
                      name="lastName"
                      className="form-control"
                      defaultValue={this.state.client.lastName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label>* First Name: </Label>
                    <Input
                      type="text"
                      name="firstName"
                      className="form-control"
                      defaultValue={this.state.client.firstName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label>* Primary Phone: </Label>
                    <Input
                      type="text"
                      name="primaryPhoneNumber"
                      className="form-control"
                      defaultValue={this.state.client.primaryPhoneNumber}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label>Cell: </Label>
                    <Input
                      type="text"
                      name="cellphone"
                      className="form-control"
                      defaultValue={this.state.client.cellphone}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label>Work Phone: </Label>
                    <Input
                      type="text"
                      name="workPhone"
                      className="form-control"
                      defaultValue={this.state.client.workPhone}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <Label>Email: </Label>
                    <Input
                      type="email"
                      name="email"
                      className="emailInptClientForm"
                      defaultValue={this.state.client.email}
                      onChange={this.onChange}
                    />
                  </div>

                  <br />
                  <Button block color="info">
                    Submit Changes
                  </Button>
                  <div className="form-group">
                    {/* <input
                      style={{
                        fontSize: "25px",
                        background: "navy",
                        border: "2px solid white",
                      }}
                      type="submit"
                      value="Submit Changes"
                      className="btn btn-primary"
                    /> */}
                    <Button
                      className="petAddBtn"
                      onClick={this.toggleModalForAddingPets}
                      color="warning"
                    >
                      ADD PETS
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>

          <div className="col-md-6 pet-list-container-edit-client">
            <h1 className="petsListTitle">Pets List</h1>
            {petsList}
          </div>

          <div className="col-sm-6">
            <Modal
              isOpen={this.state.modalForAddingPets}
              toggle={this.toggleModalForAddingPets}
            >
              <ModalHeader toggle={this.toggleModalForAddingPets}>
                <div>
                  <h4>Add a Pet</h4>
                </div>
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.onSubmitPetForm}>
                  <FormGroup>
                    <h2 className="titlePets">Add Pet information</h2>

                    <Label>Name</Label>
                    <Input
                      onChange={this.onChangeModal}
                      type="text"
                      name="petName"
                      defaultValue={this.state.petName}
                    ></Input>
                    <Label defaultValue="">Breed</Label>
                    <Input
                      onChange={this.onChangeModal}
                      type="text"
                      name="breed"
                      defaultValue={this.state.breed}
                    ></Input>
                    <Label>Type</Label>
                    <Input
                      onChange={this.onChangeModal}
                      type="text"
                      name="type"
                      defaultValue={this.state.type}
                    ></Input>
                    <Label>Warnings</Label>
                    <Input
                      onChange={this.onChangeModal}
                      type="text"
                      name="notes"
                      defaultValue={this.state.notes}
                    ></Input>
                    <p className="agree-with-photo">
                      <input
                        className="checkbox-registration"
                        onChange={this.toggleChangeAllowPhoto}
                        type="checkbox"
                        name="checkbox"
                        value={this.state.toggleChangeAllowPhoto}
                      ></input>{" "}
                      <span className="photo-release ">
                        (OPTIONAL) <i className="fas fa-camera-retro"></i> The
                        owner authorizes Amazing Pet grooming Milton, to publish
                        photographs taken of his/her pet(s). The owner also
                        understands that he/she will not receive financial
                        compensation of any type associated with this material.
                      </span>
                    </p>
                    <Button
                      className="petUpdateBtn"
                      color="warning"
                      // onClick={this.handleEditCommentSubmit}
                    >
                      Add Pet
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    ) : (
      <div
        className="center"
        style={{
          marginLeft: "10%",
          fontSize: "30px",
          height: "100vh",
        }}
      >
        ...Loading Client
      </div>
    );

    return <div className="container">{client}</div>;
  }
}

export default index;
