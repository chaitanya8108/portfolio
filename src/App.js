import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import bg from "./assets/appbg.jpeg"
import "./App.css";

const App = () => {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bg})`, // Correctly setting the image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        // height: "100vh",
        color: "#fff",
        // transition: 'background-image 0.3s ease-in-out'
      }}
    >
      <Navbar />
      <Home />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
