import React from "react";
import "./style.css";

function Footer() {
  const auth = localStorage.getItem("JWT");
  if (auth !== null) {
    return null;
  }
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
          <div id="footerText">
            © 2019 Powered by{" "}
            <b>
              <a
                className="footer-link"
                href="https://www.aypwebcreations.com"
                target="blank"
                rel="noopener noreferrer"
              >
                AYP Web Creations
              </a>{" "}
            </b>
            <i className="fas fa-paw"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
