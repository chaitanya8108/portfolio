import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import Modal from "react-bootstrap/Modal";
import { GoArrowUpRight } from "react-icons/go";
import bg from "../assets/proj.jpeg";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const projRef = useRef(null); // Reference to #home section

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

    if (projRef.current) {
      observer.observe(projRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (projRef.current) {
        observer.unobserve(projRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/projects");
        const data = await response.json();
        console.log(data); // Log the fetched data to check its structure
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Frontend Code (React)
  const handleShowModal = (image) => {
    setSelectedImage(image); // Set the image path from MongoDB
    setLgShow(true);
  };

  return (
    <>
      <section
        id="projects"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          color: "#fff",
        }}
        ref={projRef}
      >
        {" "}
        <h1 className="header align-self-center">Projects</h1>
        <div className="align-self-center px-3" id="projDiv">
          {projects.map((project, index) => (
            <div key={index} className="project">
              <h3>{project.title}</h3>
              <p className="text-start">{project.description}</p>
              <div id="redirectbtns">
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
                <a
                  href={project.gitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="github"
                >
                  GitHub
                  <GoArrowUpRight />
                </a>
              </div>
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
            <img
              src={`http://localhost:3000${selectedImage}`} // Use the correct path relative to the public folder
              alt="Project Screenshot"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Projects;
