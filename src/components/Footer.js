import React from "react";
import SanctuLogoBlack from "assets/sanctu_logo_black.svg";
import SanctuLogoWhite from "assets/sanctu_logo_white.svg";

const Footer = ({ hidden }) => (  
  <footer 
    aria-hidden={ hidden }
    className="Footer col-8 p1">
    <img
      className="Footer__icon"
      src={ hidden ? SanctuLogoWhite : SanctuLogoBlack }
      alt="sanctuary computer logo"
    />
  </footer>
);

export default Footer;
