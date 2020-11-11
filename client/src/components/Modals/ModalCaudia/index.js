import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class index extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalClaudiaState}
        toggle={this.props.toggleModalClaudia}
      >
        <ModalHeader toggle={this.props.toggleModalClaudia}>
          C L A U D I A <i className="fas fa-cut"></i>{" "}
          <button
            className="select-groomer-btn"
            onClick={this.props.selectClaudia}
          >
            Select this Groomer <i className="fas fa-check-circle"></i>
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="Card">
            <div className="Card__side Card__side--front Card__side--front--2">
              <h1
                className="about-sub-titles"
                id="paola-about"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                CLAUDIA
              </h1>
              <img
                alt="Paola"
                src="./images/claudia2.jpg"
                className="pic-claudia-front"
              ></img>

              <p className="groomer-parag">
                With over 15 years in the animal care field, Claudia has always
                been passionate about dogs. She strives to make the grooming
                experience as stress-free as possible. She believes it is a must
                to have a great deal of patience and trust, as well as the
                ability to read the dogs' body language. Claudia's motto is: "I
                treat our customers' pets the same way I want my pets to be
                treated when I am not by their side"
              </p>
            </div>
            <div className="Card__side Card__side--back Card__side--back--2 u-center-text">
              <h1
                className="about-sub-titles"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                CLAUDIA
              </h1>
              <img
                alt="Paola"
                src="./images/claudia1.jpg"
                className="pic-claudia"
              ></img>
              <img
                alt="Paola"
                src="./images/claudia.jpg"
                className="pic-claudia"
              ></img>
              <img
                alt="Paola"
                src="./images/claudia3.jpg"
                className="pic-claudia"
              ></img>
              <img
                alt="Paola"
                src="./images/claudia4.jpg"
                className="pic-claudia"
              ></img>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default index;
