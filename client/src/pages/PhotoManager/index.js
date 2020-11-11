import React, { Component } from "react";
import axios from "axios";
import "./style.scss";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
      jobType: "",
      pets: [],
      photo: false,
      imagesChosen: [],
      publicGallery: [],
      loadingPhotos: false,
    };
  }

  async componentDidMount() {
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

        window.scrollTo(0, 0);

        this.getAllPhotos();
        this.getAllPets();
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

  getAllPhotos = () => {
    axios
      .get("/auth/gallery")
      .then((res) => {
        console.log(res);
        this.setState({
          publicGallery: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  getAllPets = async () => {
    const accessString = localStorage.getItem("JWT");

    await axios
      .get("/api/pets", {
        headers: { jwt: `${accessString}` },
      })
      .then((res) => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({
          pets: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addPhoto = ({ target }) => {
    this.setState((prevState) => ({
      imagesChosen: [
        ...prevState.imagesChosen.filter((img) => {
          return img !== target.value;
        }),
        target.value,
      ],
    }));
  };

  removePhoto = ({ target }) => {
    this.setState((prevState) => ({
      imagesChosen: prevState.imagesChosen.filter((img) => {
        return img !== target.value;
      }),
    }));
  };

  deletePhotoFromPublicGallery = async ({ target }) => {
    const id = target.value;
    await axios
      .delete("/auth/gallery/" + id)
      .then(() => this.getAllPhotos())
      .catch((err) => console.log(err));

    // window.location.reload();
  };

  submitGallery = async () => {
    const urls = this.state.imagesChosen.map((img) => {
      return img;
    });

    urls.map(async (url) => {
      await axios
        .post("/auth/gallery", { url: url })
        .then(() => {
          this.setState({
            imagesChosen: [],
          });
          this.getAllPhotos();
        })
        .catch((err) => console.log(err));
    });
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

    const petsImages = this.state.pets;
    const petsList =
      petsImages.length > 0 ? (
        petsImages.map((pet) => {
          return (
            <div key={pet.id}>
              {pet.petImg ? (
                <div className="image-photo-caption-wrapper">
                  <img
                    className="pet-gallery-img"
                    src={pet.petImg}
                    alt="pet "
                    value={pet.id}
                  />
                  <hr className="hr-photo-manager" />
                  <p className="pet-name-photo-manager">{pet.name}</p>
                  <button
                    onClick={this.addPhoto}
                    className="photo-manager-add-btn"
                    value={pet.petImg}
                  >
                    Add
                  </button>
                </div>
              ) : null}
            </div>
          );
        })
      ) : (
        <div>
          <h4 style={{ color: "black" }}>Retrieving images...</h4>
        </div>
      );

    const petsImgChosen = this.state.imagesChosen;
    const chosenImgList =
      petsImgChosen.length > 0 ? (
        petsImgChosen.map((img, index) => {
          return (
            <div className="image-photo-caption-wrapper" key={index}>
              <img className="pet-gallery-img" src={img} alt="pet " />
              <button
                onClick={this.removePhoto}
                className="photo-manager-delete-btn"
                value={img}
              >
                Remove
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <h4>Nothing to upload</h4>
        </div>
      );

    const publicGallery = this.state.publicGallery;
    const publicGalleryList =
      publicGallery.length > 0 ? (
        publicGallery.map((img, index) => {
          return (
            <div className="image-photo-caption-wrapper" key={index}>
              <img className="pet-gallery-img" src={img.url} alt="pet " />
              <button
                onClick={this.deletePhotoFromPublicGallery}
                className="photo-manager-delete-btn"
                value={img.id}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <div>
          <h4>No images yet in Public Gallery</h4>
        </div>
      );

    if (jobType === "receptionist" || jobType === "admin") {
      return (
        <div className="photo-manager-container">
          <h1>Gallery Manager</h1>
          <hr />
          <div className="photo-manager-wrapper">
            <div className="row">
              <div className="col-lg-4 photos-available-wrapper">
                <h2>
                  <i className="fas fa-database"></i> Photos Available
                </h2>
                <hr />
                <div className="available-photos-wrapper hide-div-if-empty">
                  {petsList}
                </div>
              </div>
              <div className="col-lg-4 photos-available-wrapper">
                <h2 className="sub-heading-photo-manager">
                  Photos to Upload <i className="fas fa-upload"></i>
                </h2>
                <hr />
                <div className="chosen-images-wrapper">
                  <button
                    onClick={this.submitGallery}
                    className="btn-submit-gallery"
                  >
                    Add to Public Gallery <i className="fas fa-camera"></i>
                  </button>
                  {chosenImgList}
                </div>
              </div>
              <div className="col-lg-4 photos-available-wrapper">
                <h2 className="sub-heading-photo-manager">
                  Public Gallery <i className="fas fa-camera"></i>
                </h2>
                <hr />
                <div className="chosen-images-wrapper">{publicGalleryList}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default index;
