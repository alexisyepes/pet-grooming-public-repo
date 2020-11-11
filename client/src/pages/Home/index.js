import React, { Component } from "react";
import { Link } from "react-router-dom";
import CarouselPage from "../../components/CarouselPage";
// import TemporarySign from "../../components/TemporarySign";
import Offers from "../../components/Offers";
import BookingBtn from "../../components/BookingBtn";
import "./style.scss";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  closeModal = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    return (
      <div className="home-page-container">
        <main style={{ marginTop: "60px" }}>
          <br></br>
        </main>
        <h4 className="phoneEverywhere  u-center-text">
          <i className="fas fa-phone-square" style={{ marginRight: "5px" }}></i>{" "}
          905 878 9009 / 905 878 5557
        </h4>
        <div className="logoAndPhoneHome">
          <img
            alt="logo"
            src="./images/logo_300.png"
            className="logoHome"
          ></img>
          <h4 className="phoneTabletSize">
            <i
              className="fas fa-phone-square"
              style={{ marginRight: "10px" }}
            ></i>{" "}
            905 878 9009
          </h4>
          {/* <button className="covid-19-btn" onClick={this.toggleModal}>
            covid-19 !
          </button> */}
          <a
            className="link-to-printing-memories"
            href="https://www.printingmemories.ca"
            target="blank"
          >
            <Offers />
          </a>
        </div>
        <div className="home-main-container">
          <div className="u-center-text"></div>
          <div className="container">
            <div className="row ">
              <div className="col-lg-6 u-center-text composition-parent">
                <div className="u-center-text">
                  {/* <TemporarySign
                    close={this.closeModal}
                    modal={this.state.modal}
                    toggleModal={this.toggleModal}
                  /> */}

                  <CarouselPage />
                </div>
                <div className="composition">
                  <a href="/about">
                    <img
                      src="./images/paola5.jpg"
                      alt="cgroomer 1"
                      className="composition__photo composition__photo--p1"
                    />
                    <figcaption className="story__caption_grooomers story__caption_grooomers--1">
                      PAULA
                    </figcaption>
                  </a>
                  <a href="/about">
                    <img
                      src="./images/diana-temporary.jpg"
                      alt="cgroomer 2"
                      className="composition__photo composition__photo--p2"
                    />
                    <figcaption className="story__caption_grooomers story__caption_grooomers--2">
                      DIANA
                    </figcaption>
                  </a>

                  <a href="/about">
                    <img
                      src="./images/claudia.jpg"
                      alt="cgroomer 3"
                      className="composition__photo composition__photo--p3"
                    />
                    <figcaption className="story__caption_grooomers story__caption_grooomers--3">
                      CLAUDIA
                    </figcaption>
                  </a>
                </div>
                <div className="u-center-text parent-text-left-home-page">
                  <h4 className="text-left-home-page">
                    More than 20 years of experience
                  </h4>
                  <h4 className="text-left-home-page">
                    <i className="fas fa-dog"></i>{" "}
                    <i className="fas fa-cat cat-icon"></i> Cat and Dog Grooming
                  </h4>
                  <h4 className="text-left-home-page">
                    Nothing to hide...Open concept area
                  </h4>
                  <h4 className="text-left-home-page bottom-text-home">
                    Super Friendly Staff
                  </h4>
                  <Link to="/schedule">
                    <h4 className="text-left-home-page bottom-text-home">
                      <span className="also-in-cambridge-home">
                        {" "}
                        Also in Cambridge Now!{" "}
                        <span className="learn-more-cambridge">
                          learn more...
                        </span>
                      </span>
                    </h4>
                  </Link>
                </div>

                <div className="bookingBtnHome">
                  <BookingBtn />
                </div>
              </div>
              <Link className="link-to-schedule" to="/schedule">
                <button className="schedule-container__smallScreens">
                  <i className="fas fa-calendar-week"></i> Book Online Now!
                </button>
              </Link>

              <a
                className="link-to-printing-memories"
                href="https://www.printingmemories.ca"
                target="blank"
                rel="noopener noreferrer"
              >
                <div className="offers-img-container__smallScreens">
                  <h3 className="text-center offer-title__smallScreens">
                    Personalized Pet Tags
                  </h3>
                  <img
                    className="offers-img__smallScreens"
                    src="./images/pet-tag-elsa.png"
                    alt="pet tag"
                  />
                  <h4 className="text-center percentage-off__home">20% OFF</h4>
                  <p className="text-center promo-code__home">
                    Use Code: 2020AMAZING
                  </p>
                  <p className="text-center sponsored__smallScreens">
                    Sponsored
                  </p>
                </div>
              </a>
              <div className="col-lg-6 home-right-main-col">
                <a
                  className="link-to-google"
                  href="https://www.google.com/maps/place/Amazing+Pet+Grooming/@43.5239754,-79.8731451,17z/data=!3m1!4b1!4m5!3m4!1s0x882b6f0649aa7edb:0xa1616d6c9e9e1545!8m2!3d43.5239754!4d-79.8709564?hl=en-CA"
                  target="blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="heading-secondary u-margin-bottom-big u-center-text rated-google-title">
                    Rated 4.5 <i className="fas fa-star stars star"></i> in
                    Google
                  </h2>
                  <div className="story u-margin-bottom-big">
                    <figure className="story__shape">
                      <i className="fas fa-user story__img  user-review-1"></i>

                      <figcaption className="story__caption">
                        Mimi Well
                      </figcaption>
                    </figure>
                    <div className="story__text ">
                      <h6 className="heading-tertiary u-margin-bottom-small stars u-center-text">
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                      </h6>
                      <p className="last-review ">
                        Paula is very good taking care of my MIMI. Me and my
                        husband are very satisfied what she did to our little
                        kitty. Very friendly and accommodating. Definitely will
                        come back. 5 stars
                      </p>
                    </div>
                  </div>
                  <div className="story">
                    <figure className="story__shape">
                      <i className="fas fa-user story__img user-review-2"></i>

                      <figcaption className="story__caption ">
                        Francis Shepherd{" "}
                      </figcaption>
                    </figure>
                    <div className="story__text">
                      <h6 className="heading-tertiary u-margin-bottom-small u-center-text stars">
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                      </h6>
                      <p className="last-review">
                        Claudia and the rest of the staff were amazing! You can
                        totally see how they genuinely love what they do and
                        they care about the pets so much. I’m so happy I have
                        found such a caring place for my baby. Thanks so much
                        Claudia.
                      </p>
                    </div>
                  </div>
                  <div className="story">
                    <figure className="story__shape">
                      <i className="fas fa-user story__img user-review-3"></i>

                      <figcaption className="story__caption ">
                        Osama Raza
                      </figcaption>
                    </figure>
                    <div className="story__text">
                      <h6 className="heading-tertiary u-margin-bottom-small u-center-text stars">
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                        <i className="fas fa-star u-center-text star"></i>
                      </h6>
                      <p className="last-review">
                        Great option for grooming. The place was clean and Diana
                        took such good care for my dog. She did a fantastic job
                        and I highly recommend this place.
                      </p>
                    </div>
                  </div>
                  <div className="u-center-text">
                    <span className="link-to-google-for-more">
                      Click for more reviews...
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="row "></div>

          <div className="bg-video">
            <video className="bg-video__content" autoPlay muted loop>
              <source src="./images/Puppiness.mp4" type="video/mp4" />
              <source src="img/video.webm" type="video/webm" />
              Your browser is not supported!
            </video>
          </div>
        </div>
      </div>
    );
  }
}
