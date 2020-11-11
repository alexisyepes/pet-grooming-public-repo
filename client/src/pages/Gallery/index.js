import React, { Component } from "react";
import axios from "axios";
import BookingBtn from "../../components/BookingBtn";
import "./style.scss";

export default class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folder1: false,
      folder2: false,
      publicGallery: [],
      hideFolders: false,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    axios
      .get("/auth/gallery")
      .then((res) => {
        // console.log(res);
        this.setState({
          publicGallery: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  toggleFolder1 = () => {
    this.setState((prevState) => ({
      folder1: !prevState.folder1,
      folder2: false,
      hideFolders: true,
    }));
  };

  toggleFolder2 = () => {
    this.setState((prevState) => ({
      folder2: !prevState.folder2,
      folder1: false,
      hideFolders: true,
    }));
  };

  render() {
    const publicGallery = this.state.publicGallery;
    const publicGalleryList =
      publicGallery.length > 0 ? (
        publicGallery.map((img, index) => {
          return (
            <div className="image-photo-caption-wrapper" key={index}>
              <img className="public-gallery-img" src={img.url} alt="pet " />
            </div>
          );
        })
      ) : (
        <div>
          <h4>No images yet in Public Gallery</h4>
        </div>
      );
    return (
      <div>
        <main style={{ marginTop: "60px" }}>
          <br></br>
        </main>
        <h4 className="phoneEverywhere">
          <i
            className="fas fa-phone-square"
            style={{ marginRight: "10px" }}
          ></i>{" "}
          905 878 9009
        </h4>
        <div className="galleryBox">
          <div className="bookingBtnGallery">
            <BookingBtn />
          </div>
          <h1 className="galleryTitle">Gallery</h1>
          <hr style={{ background: "white" }}></hr>
          <div className="row folders-containers">
            <div onClick={this.toggleFolder1} className=" folder1">
              <h1 className="secondary-header-gallery">
                Before and After <i className="fas fa-images"></i>
              </h1>
              {!this.state.hideFolders ? (
                <img
                  className="folder-img"
                  src="./images/gallery.png"
                  alt="folder"
                />
              ) : null}
            </div>
            <div onClick={this.toggleFolder2} className="folder2">
              <h1 className="secondary-header-gallery">
                Fashion <i className="fas fa-images"></i>
              </h1>
              {!this.state.hideFolders ? (
                <img
                  className="folder-img"
                  src="./images/gallery.png"
                  alt="folder"
                />
              ) : null}
            </div>
          </div>
          <div className="folders-wrapper">
            {this.state.folder1 ? (
              <div className="before-after-folder">
                <div className="wrapper">
                  <div className="card-body picGroup1">
                    <h1 className="galleryTitles">Before</h1>
                    <img
                      alt="dog before 1"
                      src="./images/dogBefore1.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">After</h1>
                    <img
                      alt="dog before 1"
                      src="./images/dogAfter1.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">Before</h1>
                    <img
                      alt="dog before 2"
                      src="./images/dogBefore2.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">After</h1>
                    <img
                      alt="dog before 2"
                      src="./images/dogAfter2.png"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">Before</h1>
                    <img
                      alt="dog before 3"
                      src="./images/dogBefore3.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">After</h1>
                    <img
                      alt="dog before 2"
                      src="./images/dogAfter3.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">Before</h1>
                    <img
                      alt="cat before 1"
                      src="./images/catBefore1.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                  <div className="card-body picGroup">
                    <h1 className="galleryTitles">After</h1>
                    <img
                      alt="cat before 1"
                      src="./images/catAfter1.jpg"
                      className="galleryImages"
                    ></img>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.folder2 ? (
              <div className="others-folder">
                <div className=" photos-available-wrapper">
                  <div className="public-images-wrapper">
                    {publicGalleryList}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
