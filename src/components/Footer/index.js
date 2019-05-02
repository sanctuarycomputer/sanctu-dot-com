import React from "react";
import SanctuLogo from "assets/sanctu_logo.svg";
import "./Footer.scss";

const Footer = () => (
  <footer className="Footer col-8 p1">
    <img
      className="Footer__icon"
      src={SanctuLogo}
      alt="sanctuary computer logo"
    />
  </footer>
);

export default Footer;
