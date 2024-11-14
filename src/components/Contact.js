import React, { useState } from "react";
import "./Contact.css";
import { Button, Alert } from "react-bootstrap";
import bg from "../assets/contacts.jpeg";

const Contact = () => {
  // State to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // To show success or error message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !message) {
      setStatus("All fields are required.");
      return;
    }

    // Prepare data to send in POST request
    const formData = { name, email, message };

    try {
      // Send POST request to Vercel serverless function
      const response = await fetch("myportfolio-flax-three.vercel.app/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle response
      if (response.ok) {
        setStatus("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorText = await response.text();
        setStatus(`Error: ${errorText}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <section
      id="contact"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "#fff",
      }}
    >
      <h1 className="text-black">Contact Me</h1>
      <p className="text-black">
        If you have any questions or would like to collaborate, feel free to
        reach out!
      </p>

      {/* Show status message */}
      {status && (
        <Alert variant={status.includes("Error") ? "danger" : "success"}>
          {status}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="row-gap-0">
        <div className="name d-flex flex-column" id="nameDiv">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@pqr.com"
            className="bg-light px-2 py-1"
            required
          />
        </div>

        <div className="message d-flex flex-column pb-3" id="msgDiv">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-light"
            required
          ></textarea>
        </div>

        <Button variant="dark" id="sendMsg" type="submit">
          Send
        </Button>
      </form>
    </section>
  );
};

export default Contact;
