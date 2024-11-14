import React, { useState, useEffect, useRef } from "react";
import "./Projects.css";
import Modal from "react-bootstrap/Modal";
import { GoArrowUpRight } from "react-icons/go";
import bg from "../assets/proj.jpeg";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const projRef = useRef(null);

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
      { threshold: 0.5 }
    );

    if (projRef.current) {
      observer.observe(projRef.current);
    }

    return () => {
      if (projRef.current) {
        observer.unobserve(projRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://myportfolio-flax-three.vercel.app/api/projects"
        );
        const data = await response.json();
        console.log(data);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleShowModal = (image) => {
    setSelectedImage(image);
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
                  className="hovEff"
                >
                  View Project
                </a>
                <a
                  onClick={() => handleShowModal(project.image)}
                  id="modal"
                  className="hovEff"
                >
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
              src={`https://<your-vercel-app-name>.vercel.app${selectedImage}`} // Updated to use the deployed URL
              alt="Project Screenshot"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Projects;
