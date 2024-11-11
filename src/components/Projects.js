// src/components/Projects.js

import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import Modal from "react-bootstrap/Modal";
import rps from "../assets/rps.png";
import todo from "../assets/todo.png";
import prop from "../assets/prop.png";
import bg from "../assets/proj.jpeg";

const Projects = () => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const projectsRef = useRef(null); // Use ref to access #projects element

  // Define project data with respective screenshots
  const projects = [
    {
      title: "Rock Paper Scissors",
      description:
        "An Interactive Rock-Paper-Scissor Game Developed using HTML, CSS, JavaScript. A Browser Local Storage connection is there.",
      link: "https://rock-paper-scissor-ten-dusky.vercel.app/",
      image: rps,
    },
    {
      title: "Todo List",
      description:
        "A To Do List Site that notes down your provided Tasks. Having Functionality of Add, Delete, Edit, Reset Tasks. Local Storage set up for storing the Tasks on browser.",
      link: "https://to-do-list-sigma-seven-61.vercel.app/",
      image: todo,
    },
    {
      title: "React-props-use",
      description:
        "This project shows how you can send the data from one component to another using props.",
      link: "https://react-props-use.vercel.app/",
      image: prop,
    },
  ];

  // Handle showing modal
  const handleShowModal = (image) => {
    setSelectedImage(image);
    setLgShow(true);
  };

  // Intersection Observer to detect when #projects is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add 'in-view' class to animate when the section is in view
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  return (
    <>
      <section
        id="projects"
        ref={projectsRef} // Attach the ref here
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <h1 className="header align-self-center" id="proj">
          Projects
        </h1>
        <div
          style={{
            overflowY: "scroll",
            scrollbarWidth: "none",
            scrollBehavior: "smooth",
          }}
          className="align-self-center px-3 "
          id="projDiv"
        >
          {projects.map((project, index) => (
            <div key={index} className="project">
              <h3>{project.title}</h3>
              <p className="text-start">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                id="viewProject"
              >
                View Project
              </a>
              <a onClick={() => handleShowModal(project.image)} id="modal">
                Screenshot
              </a>
            </div>
          ))}
        </div>
      </section>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Screenshot
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center img-fluid bg-black" id="modalBody">
          {selectedImage && (
            <img src={selectedImage} alt="Project Screenshot" />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Projects;
