// src/components/Home.js

import "./Home.css";
import bg from "../assets/bg.jpeg";
import { Button, Modal } from "react-bootstrap";
import { GoArrowUpRight } from "react-icons/go";
import { useState, useEffect, useRef } from "react";
import {
  FaReact,
  FaBootstrap,
  FaCss3,
  FaNodeJs,
  FaJs,
  FaJava,
} from "react-icons/fa";
import { BiLogoMongodb, BiLogoSpringBoot } from "react-icons/bi";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const homeRef = useRef(null); // Reference to #home section

  // Function to handle opening the modal
  const handleShow = () => setShowModal(true);

  // Function to handle closing the modal
  const handleClose = () => setShowModal(false);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (homeRef.current) {
      observer.observe(homeRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (homeRef.current) {
        observer.unobserve(homeRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={homeRef} // Attach the ref to the #home section
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
      }}
    >
      <div id="head">
        <h1>Welcome to My Portfolio</h1>
        <p>Hi, I'm Chaitanya Sharma, a Front End Developer.</p>
        <p>Explore my work and feel free to get in touch!</p>
      </div>
      <div id="ref">
        <div id="resume">
          <Button id="resumebtn" onClick={handleShow}>
            Resume <GoArrowUpRight />
          </Button>
        </div><br></br>
        <div id="icons">
          <FaReact />
          <FaBootstrap />
          <FaCss3 />
          <FaNodeJs />
          <FaJs />
          <BiLogoMongodb />
          <BiLogoSpringBoot />
          <FaJava />
        </div>
      </div>

      {/* Modal for displaying the resume */}
      <Modal show={showModal} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>My Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-black">
          {/* Embed the resume PDF */}
          <iframe
            src={require("../assets/resume.pdf")}
            style={{
              width: "100%",
              height: "600px",
              border: "none",
            }}
            title="Resume"
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Home;
