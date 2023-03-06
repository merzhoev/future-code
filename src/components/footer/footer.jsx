import React from "react";
import "./footer.scss";
import logo from "assets/images/logo.svg";
import phone from "assets/images/phone.svg";
import mail from "assets/images/mail.svg";
import location from "assets/images/location.svg";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__logo logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <p className="">
            В Республике <br /> Ингушетия
          </p>
        </div>
        <div className="footer__contacts">
          <div className="footer__contact">
            <img src={phone} alt="phone" />
            <p>+79289390606</p>
          </div>
          <div className="footer__contact">
            <img src={mail} alt="mail" />
            <p>pinfosys@mail.ru </p>
          </div>
          <div className="footer__contact">
            <img src={location} alt="location" />
            <p>
              Республика Ингушетия, <br /> г. Магас,ул.Борова 13
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
