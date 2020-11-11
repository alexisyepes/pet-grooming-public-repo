import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class index extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalPaolaState}
        toggle={this.props.toggleModalPaola}
      >
        <ModalHeader toggle={this.props.toggleModalPaola}>
          P A U L A <i className="fas fa-cut"></i>{" "}
          <button
            className="select-groomer-btn"
            onClick={this.props.selectPaola}
          >
            Select this Groomer <i className="fas fa-check-circle"></i>
          </button>
        </ModalHeader>
        <ModalBody>
          {" "}
          <div className="Card">
            <div className="Card__side Card__side--front Card__side--front--1">
              <h1
                className="about-sub-titles"
                id="paola-about"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                PAULA
              </h1>
              <img
                alt="Paola"
                src="./images/paola5.jpg"
                className="pic-paola-front"
              ></img>
              <p className="groomer-parag">
                Paula, (or "The Cat Whisperer", as some people call her) has
                been in the pet grooming industry for over 20 years. Graduated
                from the Nash Pet Grooming Academy in Kentucky, she has
                dedicated most of her life to work with dogs and cats. She's
                passionate about nature and animal care. Her vast experience
                with all kind of dogs and cats is something we have the
                privilege to share with our customers.
              </p>
            </div>
            <div className="Card__side Card__side--back Card__side--back--1 u-center-text">
              <h1
                className="about-sub-titles"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                PAULA
              </h1>
              <img
                alt="Paola"
                src="./images/paola5.jpg"
                className="pic-paola"
              ></img>
              <img
                alt="Paola"
                src="./images/paola1.jpg"
                className="pic-paola"
              ></img>
              <img
                alt="Paola"
                src="./images/paola.JPG"
                className="pic-paola"
              ></img>
              <img
                alt="Paola"
                src="./images/paola4.jpg"
                className="pic-paola"
              ></img>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default index;
