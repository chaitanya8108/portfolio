// src/components/Contact.js

import React, { useEffect, useRef } from "react";
import "./Contact.css";
import { Button } from "react-bootstrap";
import bg from "../assets/contacts.jpeg"

const Contact = () => {
  const projectsRef = useRef(null); // Use ref to access #projects element
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
    <section id="contact"
    ref={projectsRef} // Attach the ref here
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
    }}>
      <h1 className="text-black">Contact Me</h1>
      <p className="text-black">
        If you have any questions or would like to collaborate, feel free to
        reach out!
      </p>
      <form action="submit_form.php" method="post" className="row-gap-0">
        <div className="name d-flex flex-column" id="nameDiv">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="xyz"
            className="bg-light px-2 py-1"
            required
          />
        </div>

        <div className="email d-flex flex-column" id="emailDiv">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="abc@pqr.com"
            className="bg-light px-2 py-1"
            required
          />
        </div>

        <div className="message d-flex flex-column pb-3" id="msgDiv">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" className="bg-light" required></textarea>
        </div>

        <Button variant="dark" id="sendMsg">
          Send
        </Button>
      </form>
    </section>
  );
};

export default Contact;
