import React from "react";
import backgroundImage from "../../assets/footer-bg.jpg";
import logo from "../../assets/tmovie.png";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <>
      <div
        className="footer"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="footer_content">
          <div className="footer_content_logo">
            <div className="logo">
              <img src={logo} alt="Tmovies Logo" />
              <Link to="/">tMovies</Link>
            </div>
          </div>
          <div className="footer_content_menus">
            <div className="footer_content_menu">
              <Link to="/">Home</Link>
              <Link to="/">Contact us</Link>
              <Link to="/">Term of services</Link>
              <Link to="/">About us</Link>
            </div>
            <div className="footer_content_menu">
              <Link to="/">Live</Link>
              <Link to="/">FAQ</Link>
              <Link to="/">Premium</Link>
              <Link to="/">Privacy policy</Link>
            </div>
            <div className="footer_content_menu">
              <Link to="/">Must watch</Link>
              <Link to="/">Recent release</Link>
              <Link to="/">Top IMDB</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
