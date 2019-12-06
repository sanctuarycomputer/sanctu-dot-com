import React from "react";
import SanctuLogo from "assets/sanctu_logo.svg";

const Footer = ({ hidden }) => (
  <footer 
    aria-hidden={ hidden }
    className="Footer col-8 p1">
    <img
      className="Footer__icon"
      src={SanctuLogo}
      alt="sanctuary computer logo"
    />
  </footer>
);

export default Footer;
