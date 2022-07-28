/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Copyright from "./Copyright";
import img from "../assets/img/logo_haikuZ.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="invisible-footer">

    </div>
    // <footer className="footer-distributed">
    //   <div className="footer-left">
    //     <img src={img} className="logoImg"></img>
    //     <p className="footer-links">
    //       <a href="#" className="link-1">
    //         Home
    //       </a>
    //       <a href="#">Blog</a>
    //       <a href="#">Pricing</a>
    //       <a href="#">About</a>
    //       <a href="#">Faq</a>
    //       <a href="#">Contact</a>
    //     </p>
    //   </div>
    //   <div className="footer-center">
    //     <div>
    //       <i className="fa fa-map-marker"></i>
    //       <p>
    //         <span>55 Rue du Faubourg Saint-Honoré</span> 75008, Paris
    //       </p>
    //     </div>
    //     <div>
    //       <i className="fa fa-phone"></i>
    //       <p>+33 1 42 92 81 00</p>
    //     </div>
    //     <div>
    //       <i className="fa fa-envelope"></i>
    //       <p>
    //         <a href="mailto:support@company.com">contact@escape-game.com</a>
    //       </p>
    //     </div>
    //   </div>
    //   <div className="footer-right">
    //     <p className="footer-company-about">
    //       <span>A propos </span>
    //       Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
    //       euismod convallis velit, eu auctor lacus vehicula sit amet.
    //     </p>
    //     <div className="footer-icons">
    //       <a href="#">
    //         <FontAwesomeIcon icon={faFacebook} />
    //       </a>
    //       <a href="#">
    //         <FontAwesomeIcon icon={faTwitter} />
    //       </a>
    //       <a href="#">
    //         <FontAwesomeIcon icon={faLinkedin} />
    //       </a>
    //       <a href="#">
    //         <FontAwesomeIcon icon={faGithub} />
    //       </a>
    //     </div>
    //   </div>
    //   <Copyright />
    // </footer>
  );
}
export default Footer;
