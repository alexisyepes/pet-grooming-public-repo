import React, { Component } from "react";
import "./style.scss";
import BookingBtn from "../../components/BookingBtn";

export default class Services extends Component {
  render() {
    return (
      <div>
        <main style={{ marginTop: "60px" }}>
          <br></br>
        </main>
        <h4 className="phoneEverywhere  u-center-text">
          <i className="fas fa-phone-square" style={{ marginRight: "5px" }}></i>{" "}
          905 878 9009 / 905 878 5557
        </h4>{" "}
        <div className="container">
          <a href="/">
            <img
              alt="logo"
              src="./images/logo_300.png"
              className="logo-Services"
              // style={{ width: "150px", marginTop: "7px" }}
            ></img>
          </a>
          <div className="bookingBtnServices">
            <BookingBtn />
          </div>
          <div className="row servicesBox text-align-center">
            <div className="">
              <br />
            </div>
            <div className="row services-parent-wrapper">
              <h1 className="servicesTitle text-center">
                Some of our Services <i className="fas fa-paw"></i>
              </h1>
              <div className="services-wrapper services-wrapper__haircut">
                <h2 className="servicesTitles">Haircut</h2>
                <p className="servicesParag">
                  Haircuts and Styling are frequently needed depending on the
                  breed. Our professional dog/cat groomers have extensive
                  experience in all styles and breeds. We will custom design
                  your dog’s/cat's haircut according to your taste.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/servs_haircut.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__brushing">
                <h2 className="servicesTitles">Drying and Brushing</h2>
                <p className="servicesParag">
                  Drying and brushing is one of the most important steps in
                  grooming your dog. By removing all matted and loose fur before
                  the haircut, your dog will come out looking fantastic.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/brushing.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__ear">
                <h2 className="servicesTitles">Ear cleaning</h2>
                <p className="servicesParag">
                  Dog’s ears are very sensitive and susceptible to infection,
                  excessive wax buildup and parasites. A gentle cleaning with
                  proper products will eliminate most problems. Removing the fur
                  by plucking will maintain the ears in a healthy condition.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/servs_plucking.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__bathing">
                <h2 className="servicesTitles">Bathing</h2>
                <p className="servicesParag">
                  We bathe your dog with mild shampoos that are safe to use with
                  Front-line and Advantage and other spot–on products. We
                  express the anal gland before bathing. Regular bathing keeps
                  your dog’s skin healthy, and his coat clean and shiny.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/servs_bathing.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__nails">
                <h2 className="servicesTitles">Nail Trimming</h2>
                <p className="servicesParag">
                  Nail trimming is an essential part of dog/cat grooming, and
                  trim nails are one clear sign of your dog’s good health and
                  hygiene. Dogs and Cats need to have their nails trimmed every
                  4-6 weeks in order to maintain their quick nice and short.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/nails.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__tooth">
                <h2 className="servicesTitles">Tooth Brushing</h2>
                <p className="servicesParag">
                  Tooth Brushing on a regular basis will reduce tartar and help
                  prevent periodontal disease. Brushing is important because it
                  cleans away the plaque that leads to bad breath or more
                  serious problems such as decayed teeth or gum disease.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/servs_tbrush.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__detangle">
                <h2 className="servicesTitles">Dematting</h2>
                <p className="servicesParag">
                  Dog dematting is a very important task in grooming. Hairs
                  stuck together and shaggy hairs do not only provide the dogs
                  an ill-kempt appearance, but they are also the hiding place
                  for different parasites, and it may be also the hotbed of
                  diseases. De-Tangling services can be provided when coat has
                  been maintained properly by brushing it out regularly.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/servs_detangle.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__spa">
                <h2 className="servicesTitles">Spa Service</h2>
                <p className="servicesParag">
                  Amazing Pet Grooming has packages to suit different needs and
                  budgets. From basic Bath and Brush to the ultimate Full
                  Service Groom, Amazing Pet Grooming provides options for your
                  pet. Take your pets to the professionals, after all… they
                  deserve it.
                </p>
                <img
                  className="servicesImg"
                  alt="bath"
                  src="./images/servs_spa.jpg"
                ></img>
              </div>
              <div className="services-wrapper services-wrapper__cat">
                <h2 className="servicesTitles">Cat Services</h2>
                <p className="servicesParag servicesParag__cat">
                  Only the most experienced groomers will be able to handle
                  these precious felines. From the basic nail trim to the
                  premium package that includes a bath and a haircut, cat
                  services are offered at our Milton Location
                </p>
                <img
                  alt="bath"
                  src="./images/cat1BeforeandAfter.jpg"
                  className="catPhotoServices servicesImg servicesImg__cat"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
