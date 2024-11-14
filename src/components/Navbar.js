import React, { useState } from "react";
import "./Navbar.css";
import { Button } from "react-bootstrap";
import { Link } from "react-scroll";
import needle from "../assets/needle.png";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [rotation, setRotation] = useState(0); // State to store rotation value

  // const toggleMenu = () => {
  //   setMenuActive(!menuActive);
  // };

  const needleRotation = () => {
    // Generate a random rotation angle between -360 and 360 degrees
    const randomRotation = Math.floor(Math.random() * 721) - 360;
    setRotation(randomRotation);
  };

  return (
    <nav className={menuActive ? "active" : ""} id="nav">
      <img
        src={needle}
        onClick={needleRotation}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 1s ease",
        }}
        alt="Needle"
      />
      <ul>
        <li>
          <Link to="home" smooth={true} duration={50}>
            <Button className="navbtn hovEffect">Home</Button>
          </Link>
        </li>
        <li>
          <Link to="projects" smooth={true} duration={50}>
            <Button className="navbtn hovEffect">Projects</Button>
          </Link>
        </li>
        <li>
          <Link to="contact" smooth={true} duration={50}>
            <Button className="navbtn hovEffect">Contacts</Button>
          </Link>
        </li>
      </ul>
      {/* <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
    </nav>
  );
};

export default Navbar;
