import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

class index extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modalDianaState}
        toggle={this.props.toggleModalDiana}
      >
        <ModalHeader toggle={this.props.toggleModalDiana}>
          D I A N A <i className="fas fa-cut"></i>{" "}
          <button
            className="select-groomer-btn"
            onClick={this.props.selectDiana}
          >
            Select this Groomer <i className="fas fa-check-circle"></i>
          </button>
        </ModalHeader>
        <ModalBody>
          {" "}
          <div className="Card">
            <div className="Card__side Card__side--front Card__side--front--3">
              <h1
                className="about-sub-titles"
                id="paola-about"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                DIANA
              </h1>
              <img
                alt="Paola"
                src="./images/diana.jpg"
                className="pic-diana-front"
              ></img>
              <p className="groomer-parag">
                Diana has been working around animals for over 20 years. She
                holds a Veterinarian diploma from a Colombian University.
                Clients have told her that she has a special ability for working
                with dogs that other groomers turn away. She takes great pride
                in her work and is very much a Quality over Quantity type of
                groomer. She keeps up to date on the latest grooming trends,
                equipment, and products by attending trade shows and seminars.
              </p>
            </div>
            <div className="Card__side Card__side--back Card__side--back--3 u-center-text">
              <h1
                className="about-sub-titles"
                style={{ textAlign: "center", paddingTop: "20px" }}
              >
                DIANA
              </h1>
              <img
                alt="Paola"
                src="./images/diana.jpg"
                className="pic-paola"
              ></img>
              <img
                alt="Paola"
                src="./images/diana1.jpg"
                className="pic-paola"
              ></img>
              <img
                alt="Paola"
                src="./images/diana2.jpg"
                className="pic-paola"
              ></img>
              <img
                alt="Paola"
                src="./images/diana3.jpg"
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
