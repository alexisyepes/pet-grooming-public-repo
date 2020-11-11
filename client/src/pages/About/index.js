import React, { Component } from "react";
import BookingBtn from "../../components/BookingBtn";
import "./style.scss";

export default class index extends Component {
  render() {
    return (
      <div>
        <main style={{ marginTop: "60px" }}></main>
        <h4 className="phoneEverywhere  u-center-text">
          <i className="fas fa-phone-square" style={{ marginRight: "5px" }}></i>{" "}
          905 878 9009 / 905 878 5557
        </h4>
        <div className=" aboutContainer">
          <div className="row">
            <div className="col-md-12">
              <img
                className="about-logo"
                src="./images/logo_300.png"
                alt="myLogo"
              />
              <div className="u-center-text followUs-container-top">
                <p className="followUs-about">Follow us</p>
                <a
                  href="https://www.facebook.com/amazingpetgroomingmilton/"
                  target="blank"
                >
                  <img
                    className="social-media-icons-about"
                    alt="Facebook Logo"
                    src="./images/facebook_circle.png"
                  ></img>
                </a>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ236qSQZvK4gRRRWenmxtYaE"
                  target="blank"
                >
                  <img
                    className="social-media-icons-about"
                    alt="google Logo"
                    src="./images/google-icon-circle.png"
                  ></img>
                </a>
                <a
                  href="https://www.instagram.com/p/B86xA1JpLfn/?igshid=1tol4vsxlahk2&fbclid=IwAR1eT6Wx9tXlGxE9ELB28IRnXuw3xRURAxpAmUBRCXeKGiBUTABPMstH0CY"
                  target="blank"
                >
                  <img
                    className="social-media-icons-about"
                    alt="instagram Logo"
                    src="./images/instagram-icon.png"
                  ></img>
                </a>
              </div>
              <div className="about-titles-parent">
                <h1 className="aboutTitles">
                  About Us <i className="fas fa-cut scissors-icon"></i>
                </h1>
              </div>
              <hr className="hr-about-top" />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-3 u-center-text">
              <img
                className="cat-pic-about"
                src="./images/cat-about.jpg"
                alt="about"
              />
              <img
                className="cat-pic-about-mobile"
                src="./images/paola5.jpg"
                alt="about"
              />
              <img
                className="pug-pic-about-mobile"
                src="./images/claudia4.jpg"
                alt="about"
              />
              <img
                className="pug-pic-about-mobile-2"
                src="./images/diana.jpg"
                alt="about"
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-9">
              <p className="paragAbout">
                With more than 20 years of experience, you can absolutely be
                sure that your dogs and cats are in the best hands. <br /> Our
                open concept allows you to watch your dog and/or cat being
                pampered.
                <br /> Our environment provides your pets with a unique
                experience, where all the stress from other pet groomers simply
                dissapear. Your pets are just as happy coming in as they are
                going home.
              </p>
              <div className="bookingBtnAbout text-center">
                <BookingBtn />
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-2 u-center-text">
              <img
                className="pug-pic-about"
                src="./images/pug-about.jpg"
                alt="about"
              />
            </div>
          </div>
          <div className="col-md-12">
            <hr className="hr-about-top" />
            <div className="about-titles-parent">
              <h1 id="team-about" className="aboutTitles">
                Meet the Team
              </h1>
            </div>
            <hr className="hr-about-top" />
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-xs-12">
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
                        Paula, (or "The Cat Whisperer", as some people call her)
                        has been in the pet grooming industry for over 20 years.
                        Graduated from the Nash Pet Grooming Academy in
                        Kentucky, she has dedicated most of her life to work
                        with dogs and cats. She's passionate about nature and
                        animal care. Her vast experience with all kind of dogs
                        and cats is something we have the privilege to share
                        with our customers.
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
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-xs-12">
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
                        With over 15 years in the animal care field, Claudia has
                        always been passionate about dogs. She strives to make
                        the grooming experience as stress-free as possible. She
                        believes it is a must to have a great deal of patience
                        and trust, as well as the ability to read the dogs' body
                        language. Claudia's motto is: "I treat our customers'
                        pets the same way I want my pets to be treated when I am
                        not by their side"
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
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12 col-xs-12">
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
                        Diana has been working around animals for over 20 years.
                        She holds a Veterinarian diploma from a Colombian
                        University. Clients have told her that she has a special
                        ability for working with dogs that other groomers turn
                        away. She takes great pride in her work and is very much
                        a Quality over Quantity type of groomer. She keeps up to
                        date on the latest grooming trends, equipment, and
                        products by attending trade shows and seminars.
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
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 u-center-text followUs-container">
            <p className="followUs-about">Follow us:</p>
            <a
              href="https://www.facebook.com/amazingpetgroomingmilton/"
              target="blank"
            >
              <img
                className="social-media-icons"
                style={{ width: "35px", marginLeft: "10px" }}
                alt="Facebook Logo"
                src="./images/facebook_circle.png"
              ></img>
            </a>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJ236qSQZvK4gRRRWenmxtYaE"
              target="blank"
            >
              <img
                className="social-media-icons"
                style={{ width: "35px", marginLeft: "10px" }}
                alt="google Logo"
                src="./images/google-icon-circle.png"
              ></img>
            </a>
            <a
              href="https://www.instagram.com/p/B86xA1JpLfn/?igshid=1tol4vsxlahk2&fbclid=IwAR1eT6Wx9tXlGxE9ELB28IRnXuw3xRURAxpAmUBRCXeKGiBUTABPMstH0CY"
              target="blank"
            >
              <img
                className="social-media-icons"
                style={{ width: "35px", marginLeft: "10px" }}
                alt="instagram Logo"
                src="./images/instagram-icon.png"
              ></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
