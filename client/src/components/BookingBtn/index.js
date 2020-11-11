import React, { Component } from "react";
import "./style.scss";

class index extends Component {
  render() {
    return (
      <a href="/schedule">
        <button className="booking-btn">
          <i className="far fa-calendar-alt"></i> CLICK TO BOOK ONLINE NOW!
        </button>
      </a>
    );
  }
}

export default index;
